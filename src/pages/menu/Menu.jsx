import { useState, useEffect } from "react";
import { apiService } from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import useDebounce from "../../hooks/useDebounce";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
// import useAuth from "@/hooks/useAuth";

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFeatured, setIsFeatured] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    total: 0
  });
  // const { isAuthenticated } = useAuth();

  const fetchCategories = async () => {
    try {
      const response = await apiService.get('/category/getAllCategories');
      setCategories(response.data.data.categories);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch categories');
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiService.get("/product/getProductsForUser", {
        params: {
          page: pagination.page,
          limit: pagination.limit,
          search: debouncedSearchQuery,
          category: selectedCategory === "all" ? undefined : selectedCategory,
          isFeatured: isFeatured || undefined
        }
      });

      const { products: fetchedProducts, pagination: paginationData } = response.data.data;
      setProducts(fetchedProducts);
      setPagination(prev => ({
        ...prev,
        total: paginationData.total
      }));
    } catch {
      toast.error('Failed to fetch Products! Try refreshing your page');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [pagination.page, debouncedSearchQuery, selectedCategory, isFeatured]);

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  const handleAddToCart = (product) => {
    try {
      setIsAddingToCart(product._id);

      // Get current cart from localStorage
      const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");

      // Check if product already exists in cart
      const existingItemIndex = currentCart.findIndex(item => item._id === product._id);

      if (existingItemIndex !== -1) {
        // If product exists, increase quantity
        currentCart[existingItemIndex].quantity += 1;
      } else {
        // Otherwise add new item
        currentCart.push({
          _id: product._id,
          title: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        });
      }

      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(currentCart));
      window.dispatchEvent(new Event("cartUpdated"));
      toast.success('Product added to cart successfully');
    } catch {
      toast.error('Failed to add product to cart');
    } finally {
      setIsAddingToCart(null);
    }
  };

  return (
    <section className="bg-[#f8f8f8] min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center text-[#BA4374] mb-10">Our Menu</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category._id} value={category._id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="featured"
            checked={isFeatured}
            onCheckedChange={setIsFeatured}
          />
          <label
            htmlFor="featured"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Featured Only
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading ? (
          // Loading skeleton
          Array(8).fill(0).map((_, index) => (
            <Card key={`skeleton-${index}`} className="overflow-hidden">
              <CardHeader>
                <Skeleton className="h-40 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <Card key={product._id} className="overflow-hidden">
              <CardHeader className="p-4">
                <img
                  src={product.image || "https://placehold.co/600x400"}
                  alt={product.name}
                  className="h-40 w-full object-contain"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl text-[#BA4374] line-clamp-1">{product.name}</CardTitle>
                <p className="text-gray-600 my-2">Rs.{product.price}</p>
                <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-[#BA4374] hover:bg-[#a02f5b]"
                  onClick={() => handleAddToCart(product)}
                  disabled={isAddingToCart === product._id}
                >
                  {isAddingToCart === product._id ? "Adding..." : "Add to Cart"}
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 text-lg">No products found. Try changing your filters.</p>
          </div>
        )}
      </div>

      {!loading && totalPages > 0 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(pagination.page - 1)}
                  className={pagination.page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {Array.from(
                { length: totalPages },
                (_, i) => i + 1
              )
                .filter(page => {
                  if (totalPages <= 5) return true;
                  if (page === 1 || page === totalPages) return true;
                  if (Math.abs(page - pagination.page) <= 1) return true;
                  return false;
                })
                .map((page, index, array) => {
                  if (index > 0 && array[index - 1] !== page - 1) {
                    return (
                      <PaginationItem key={`ellipsis-${page}`}>
                        <span className="px-4">...</span>
                      </PaginationItem>
                    );
                  }

                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={page === pagination.page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(pagination.page + 1)}
                  className={pagination.page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
}










// import { useState, useEffect } from "react";
// import { apiService } from "@/lib/axios";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
// import { Checkbox } from "@/components/ui/checkbox";
// import useDebounce from "../../hooks/useDebounce";
// import { toast } from "sonner";
// import { Skeleton } from "@/components/ui/skeleton";
// import useAuth from "@/hooks/useAuth";

// export default function MenuPage() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const debouncedSearchQuery = useDebounce(searchQuery, 500);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [isFeatured, setIsFeatured] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isAddingToCart, setIsAddingToCart] = useState(null);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 8,
//     total: 0
//   });
//   const { isAuthenticated } = useAuth();

//   const fetchCategories = async () => {
//     try {
//       const response = await apiService.get('/category/getAllCategories');
//       setCategories(response.data.data.categories);
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to fetch categories');
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await apiService.get("/product/getProductsForUser", {
//         params: {
//           page: pagination.page,
//           limit: pagination.limit,
//           search: debouncedSearchQuery,
//           category: selectedCategory === "all" ? undefined : selectedCategory,
//           isFeatured: isFeatured || undefined
//         }
//       });

//       const { products: fetchedProducts, pagination: paginationData } = response.data.data;
//       setProducts(fetchedProducts);
//       setPagination(prev => ({
//         ...prev,
//         total: paginationData.total
//       }));
//     } catch {
//       toast.error('Failed to fetch Products! Try refreshing your page');
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchCategories();
//   }, []);
//   useEffect(() => {
//     fetchProducts();
//   }, [pagination.page, debouncedSearchQuery, selectedCategory, isFeatured]);

//   const handlePageChange = (newPage) => {
//     setPagination(prev => ({ ...prev, page: newPage }));
//   };

//   const totalPages = Math.ceil(pagination.total / pagination.limit);

//   const handleAddToCart = async (productId) => {
//     if (!isAuthenticated) {
//       toast.error('Please log in to add items to your cart');
//       return;
//     }
//     try {
//       setIsAddingToCart(productId);
//       await apiService.post(`/cart/addItem/${productId}`, {});
//       toast.success('Product added to cart successfully');
//     } catch {
//       toast.error('Failed to add product to cart');
//     } finally {
//       setIsAddingToCart(null);
//     }
//   };
//   return (
//     <section className="bg-[#f8f8f8] min-h-screen p-6">
//       <h1 className="text-4xl font-bold text-center text-[#BA4374] mb-10">Our Menu</h1>
//       <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
//         <Input
//           placeholder="Search products..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="max-w-sm"
//         />

//         <Select value={selectedCategory} onValueChange={setSelectedCategory}>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="All Categories" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Categories</SelectItem>
//             {categories.map((category) => (
//               <SelectItem key={category._id} value={category._id}>
//                 {category.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         <div className="flex items-center space-x-2">
//           <Checkbox
//             id="featured"
//             checked={isFeatured}
//             onCheckedChange={setIsFeatured}
//           />
//           <label
//             htmlFor="featured"
//             className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//           >
//             Featured Only
//           </label>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {loading ? (
//           // Loading skeleton
//           Array(8).fill(0).map((_, index) => (
//             <Card key={`skeleton-${index}`} className="overflow-hidden">
//               <CardHeader>
//                 <Skeleton className="h-40 w-full" />
//               </CardHeader>
//               <CardContent>
//                 <Skeleton className="h-6 w-3/4 mb-2" />
//                 <Skeleton className="h-4 w-1/4 mb-2" />
//                 <Skeleton className="h-4 w-1/2" />
//               </CardContent>
//               <CardFooter>
//                 <Skeleton className="h-10 w-full" />
//               </CardFooter>
//             </Card>
//           ))
//         ) : products.length > 0 ? (
//           products.map((product) => (
//             <Card key={product._id} className="overflow-hidden">
//               <CardHeader className="p-4">
//                 <img
//                   src={product.image || "https://placehold.co/600x400"}
//                   alt={product.name}
//                   className="h-40 w-full object-contain"
//                 />
//               </CardHeader>
//               <CardContent>
//                 <CardTitle className="text-xl text-[#BA4374] line-clamp-1">{product.name}</CardTitle>
//                 <p className="text-gray-600 my-2">Rs.{product.price}</p>
//                 <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
//               </CardContent>
//               <CardFooter>
//                 <Button
//                   className="w-full bg-[#BA4374] hover:bg-[#a02f5b]"
//                   onClick={() => handleAddToCart(product._id)}
//                   disabled={isAddingToCart === product._id}
//                 >
//                   {isAddingToCart === product._id ? "Adding..." : "Add to Cart"}
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))
//         ) : (
//           <div className="col-span-full text-center py-10">
//             <p className="text-gray-500 text-lg">No products found. Try changing your filters.</p>
//           </div>
//         )}
//       </div>

//       {!loading && totalPages > 0 && (
//         <div className="mt-8 flex justify-center">
//           <Pagination>
//             <PaginationContent>
//               <PaginationItem>
//                 <PaginationPrevious
//                   onClick={() => handlePageChange(pagination.page - 1)}
//                   className={pagination.page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
//                 />
//               </PaginationItem>

//               {Array.from(
//                 { length: totalPages },
//                 (_, i) => i + 1
//               )
//                 .filter(page => {
//                   if (totalPages <= 5) return true;
//                   if (page === 1 || page === totalPages) return true;
//                   if (Math.abs(page - pagination.page) <= 1) return true;
//                   return false;
//                 })
//                 .map((page, index, array) => {
//                   if (index > 0 && array[index - 1] !== page - 1) {
//                     return (
//                       <PaginationItem key={`ellipsis-${page}`}>
//                         <span className="px-4">...</span>
//                       </PaginationItem>
//                     );
//                   }

//                   return (
//                     <PaginationItem key={page}>
//                       <PaginationLink
//                         onClick={() => handlePageChange(page)}
//                         isActive={page === pagination.page}
//                       >
//                         {page}
//                       </PaginationLink>
//                     </PaginationItem>
//                   );
//                 })}

//               <PaginationItem>
//                 <PaginationNext
//                   onClick={() => handlePageChange(pagination.page + 1)}
//                   className={pagination.page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
//                 />
//               </PaginationItem>
//             </PaginationContent>
//           </Pagination>
//         </div>
//       )}
//     </section>
//   );
// }
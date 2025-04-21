import { useState, useRef, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Switch from '@radix-ui/react-switch';
import {
  PlusIcon,
  MoreVerticalIcon,
  PencilIcon,
  TrashIcon,
  XIcon,
  ImagePlusIcon,
  Loader2Icon,
} from 'lucide-react';
import { apiService } from '../../lib/axios';
import { toast } from 'sonner';
import { baseURL } from '../../lib/utils';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Products = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productStatus, setProductStatus] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [activeTab, setActiveTab] = useState('All');

  const imageInputRef = useRef(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/product/getAllProducts');
      setProducts(response.data.data.products);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await apiService.get('/category/getAllCategories');
      setCategories(response.data.data.categories);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setProductImage(product.image);
    setProductName(product.name);
    setProductPrice(product.price);
    setProductStock(product.quantity);
    setProductCategory(product.category?._id || '');
    setProductDescription(product.description || '');
    setProductStatus(product.isActive);
    setIsFeatured(product.isFeatured);
    setIsAddProductOpen(true);
    setOpenDropdownId(null); // Close any open dropdown
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!productName || !productPrice || !productStock || !productCategory) {
        toast.error('Please fill all required fields');
        return;
      }

      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('price', productPrice);
      formData.append('quantity', productStock);
      formData.append('category', productCategory);
      formData.append('isActive', productStatus);
      formData.append('isFeatured', isFeatured);
      if (productDescription) formData.append('description', productDescription);
      if (imageFile) formData.append('image', imageFile);

      if (selectedProduct) {
        await apiService.put(`/product/update/${selectedProduct._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Product updated successfully');
      } else {
        await apiService.post('/product/add', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Product added successfully');
      }

      await fetchProducts(); // Wait for products to be fetched
      setIsAddProductOpen(false);
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = (productId) => {
    setDeleteProductId(productId);
    setOpenDropdownId(null); // Close any open dropdown
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      await fetch(`${baseURL}/product/delete/${deleteProductId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      toast.success('Product deleted successfully');
      await fetchProducts(); // Wait for products to be fetched
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete product');
    } finally {
      setIsDeleting(false);
      setDeleteProductId(null);
    }
  };

  const resetForm = () => {
    setSelectedProduct(null);
    setProductImage(null);
    setProductName('');
    setProductPrice('');
    setProductStock('');
    setProductCategory('');
    setProductDescription('');
    setProductStatus(true);
    setIsFeatured(false);
    setImageFile(null);
  };

  return (
    <div className="p-6 mt-12 md:m-0">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Products Management</h1>
          <p className="text-slate-500">
            Manage your products inventory and categories
          </p>
        </div>

        <Dialog.Root open={isAddProductOpen} onOpenChange={(open) => {
          setIsAddProductOpen(open);
          if (!open) resetForm();
        }}>
          <Dialog.Trigger asChild>
            <Button variant="default" className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
              <PlusIcon size={16} />
              <span>Add Product</span>
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-start mb-4">
                <Dialog.Title className="text-xl font-bold">
                  {selectedProduct ? 'Edit Product' : 'Add New Product'}
                </Dialog.Title>
                <Dialog.Close asChild>
                  <Button variant="ghost" size="icon" onClick={resetForm}>
                    <XIcon size={18} />
                  </Button>
                </Dialog.Close>
              </div>

              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="relative w-32 h-32 bg-slate-100 rounded-md flex items-center justify-center">
                    <img
                      src={productImage || 'https://placehold.co/150x150'}
                      alt="Product"
                      className="object-cover w-full h-full rounded-md"
                    />
                    <input
                      type="file"
                      ref={imageInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md"
                      onClick={() => imageInputRef.current.click()}
                    >
                      <ImagePlusIcon size={14} />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                    placeholder="Enter product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Price (PKR)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md"
                      placeholder="0.00"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md"
                      placeholder="0"
                      value={productStock}
                      onChange={(e) => setProductStock(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Active Status</label>
                  <Switch.Root
                    className="w-10 h-5 bg-slate-300 rounded-full relative data-[state=checked]:bg-green-600"
                    checked={productStatus}
                    onCheckedChange={setProductStatus}
                  >
                    <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-5" />
                  </Switch.Root>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Featured Product</label>
                  <Switch.Root
                    className="w-10 h-5 bg-slate-300 rounded-full relative data-[state=checked]:bg-green-600"
                    checked={isFeatured}
                    onCheckedChange={setIsFeatured}
                  >
                    <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-5" />
                  </Switch.Root>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Dialog.Close asChild>
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </Dialog.Close>
                <Button
                  variant="default"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                      {selectedProduct ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    selectedProduct ? 'Update Product' : 'Add Product'
                  )}
                </Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Tabs with Product Cards */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-6 p-2">
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <Loader2Icon className="w-8 h-8 animate-spin text-green-600" />
          </div>
        ) : (
          <Tabs.Root defaultValue="All" value={activeTab} onValueChange={setActiveTab}>
            <Tabs.List className="flex border-b border-slate-200 px-4">
              <Tabs.Trigger
                value="All"
                className="px-4 py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:font-medium"
              >
                All
              </Tabs.Trigger>
              {categories.map((category) => (
                <Tabs.Trigger
                  key={category._id}
                  value={category._id}
                  className="px-4 py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:font-medium"
                >
                  {category.name}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <Tabs.Content value="All" className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="border border-slate-200 rounded-md overflow-hidden bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-40 bg-slate-100">
                      <img
                        src={product.image || 'https://placehold.co/150x150'}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {!product.isActive && (
                        <div className="absolute top-2 right-2 bg-red-100 text-red-800 px-2 py-1 text-xs rounded-full">
                          Inactive
                        </div>
                      )}
                      {product.isFeatured && (
                        <div className="absolute top-2 left-2 bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded-full">
                          Featured
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <DropdownMenu.Root
                          open={openDropdownId === product._id}
                          onOpenChange={(open) => setOpenDropdownId(open ? product._id : null)}
                        >
                          <DropdownMenu.Trigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVerticalIcon size={16} />
                            </Button>
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Content
                            align="end"
                            className="bg-white rounded-md shadow-md border border-slate-200 overflow-hidden min-w-40"
                          >
                            <DropdownMenu.Item
                              className="px-3 py-2 text-sm hover:bg-slate-100 cursor-pointer flex items-center gap-2"
                              onSelect={() => handleEditProduct(product)}
                            >
                              <PencilIcon size={16} />
                              <span>Edit Product</span>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                              className="px-3 py-2 text-sm hover:bg-slate-100 cursor-pointer flex items-center gap-2 text-red-600"
                              onSelect={() => handleDeleteProduct(product._id)}
                            >
                              <TrashIcon size={16} />
                              <span>Delete Product</span>
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Root>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm truncate">
                        {product.name}
                      </h3>
                      <p className="text-slate-500 text-sm">
                        ${product.price}
                      </p>
                      <p className="text-slate-500 text-xs mt-1">
                        Stock: {product.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Tabs.Content>

            {categories.map((category) => (
              <Tabs.Content key={category._id} value={category._id} className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products
                    .filter((product) => product.category?._id === category._id)
                    .map((product) => (
                      <div
                        key={product._id}
                        className="border border-slate-200 rounded-md overflow-hidden bg-white hover:shadow-md transition-shadow"
                      >
                        <div className="relative h-40 bg-slate-100">
                          <img
                            src={product.image || 'https://placehold.co/150x150'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          {!product.isActive && (
                            <div className="absolute top-2 right-2 bg-red-100 text-red-800 px-2 py-1 text-xs rounded-full">
                              Inactive
                            </div>
                          )}
                          {product.isFeatured && (
                            <div className="absolute top-2 left-2 bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded-full">
                              Featured
                            </div>
                          )}
                          <div className="absolute top-2 right-2">
                            <DropdownMenu.Root
                              open={openDropdownId === product._id}
                              onOpenChange={(open) => setOpenDropdownId(open ? product._id : null)}
                            >
                              <DropdownMenu.Trigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVerticalIcon size={16} />
                                </Button>
                              </DropdownMenu.Trigger>
                              <DropdownMenu.Content
                                align="end"
                                className="bg-white rounded-md shadow-md border border-slate-200 overflow-hidden min-w-40"
                              >
                                <DropdownMenu.Item
                                  className="px-3 py-2 text-sm hover:bg-slate-100 cursor-pointer flex items-center gap-2"
                                  onSelect={() => handleEditProduct(product)}
                                >
                                  <PencilIcon size={16} />
                                  <span>Edit Product</span>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item
                                  className="px-3 py-2 text-sm hover:bg-slate-100 cursor-pointer flex items-center gap-2 text-red-600"
                                  onSelect={() => handleDeleteProduct(product._id)}
                                >
                                  <TrashIcon size={16} />
                                  <span>Delete Product</span>
                                </DropdownMenu.Item>
                              </DropdownMenu.Content>
                            </DropdownMenu.Root>
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="font-semibold text-sm truncate">
                            {product.name}
                          </h3>
                          <p className="text-slate-500 text-sm">
                            ${product.price}
                          </p>
                          <p className="text-slate-500 text-xs mt-1">
                            Stock: {product.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        )}
      </div>

      {/* Alert Dialog for Delete Confirmation */}
      <AlertDialog open={!!deleteProductId} onOpenChange={(open) => !open && setDeleteProductId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Products;
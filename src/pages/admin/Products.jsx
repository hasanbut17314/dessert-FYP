import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Switch from '@radix-ui/react-switch';
import { PlusIcon, SearchIcon, FilterIcon, MoreVerticalIcon, PencilIcon, TrashIcon, XIcon } from 'lucide-react';

const Products = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const products = [
    {
      id: 1,
      name: "Vanilla Ice Cream",
      price: "$5.99",
      category: "Ice Cream",
      stock: 24,
      status: "Active",
      image: "https://via.placeholder.com/150",
      description: "Classic vanilla ice cream made with real vanilla beans."
    },
    {
      id: 2,
      name: "Chocolate Shake",
      price: "$4.50",
      category: "Drinks",
      stock: 15,
      status: "Active",
      image: "https://via.placeholder.com/150",
      description: "Rich chocolate shake topped with whipped cream."
    },
    {
      id: 3,
      name: "Strawberry Cake",
      price: "$24.99",
      category: "Cakes",
      stock: 8,
      status: "Active",
      image: "https://via.placeholder.com/150",
      description: "Strawberry cake with fresh strawberries and cream frosting."
    },
    {
      id: 4,
      name: "Mint Chocolate Chip",
      price: "$6.99",
      category: "Ice Cream",
      stock: 12,
      status: "Active",
      image: "https://via.placeholder.com/150",
      description: "Mint ice cream with chocolate chips throughout."
    },
    {
      id: 5,
      name: "Coffee Frappe",
      price: "$5.50",
      category: "Drinks",
      stock: 0,
      status: "Out of Stock",
      image: "https://via.placeholder.com/150",
      description: "Iced coffee frappe with a hint of caramel."
    },
    {
      id: 6,
      name: "Red Velvet Cupcake",
      price: "$3.99",
      category: "Cakes",
      stock: 18,
      status: "Active",
      image: "https://via.placeholder.com/150",
      description: "Classic red velvet cupcake with cream cheese frosting."
    },
  ];

  const categories = ["All", "Ice Cream", "Drinks", "Cakes"];

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsAddProductOpen(true);
  };

  return (
    <div className="p-6 mt-12 md:m-0">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Products Management</h1>
          <p className="text-slate-500">Manage your products inventory and categories</p>
        </div>

        <Dialog.Root open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <Dialog.Trigger asChild>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
              <PlusIcon size={16} />
              <span>Add Product</span>
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-start mb-4">
                <Dialog.Title className="text-xl font-bold">{selectedProduct ? 'Edit Product' : 'Add New Product'}</Dialog.Title>
                <Dialog.Close asChild>
                  <button className="rounded-full p-2 hover:bg-slate-100">
                    <XIcon size={18} />
                  </button>
                </Dialog.Close>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="relative w-32 h-32 bg-slate-100 rounded-md flex items-center justify-center">
                    <img 
                      src={selectedProduct?.image || "https://via.placeholder.com/150"} 
                      alt="Product" 
                      className="object-cover w-full h-full rounded-md"
                    />
                    <button className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md">
                      <PencilIcon size={14} />
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Product Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                    placeholder="Enter product name"
                    defaultValue={selectedProduct?.name}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Price ($)</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-slate-300 rounded-md"
                      placeholder="0.00"
                      defaultValue={selectedProduct?.price?.replace('$', '')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Stock</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-slate-300 rounded-md"
                      placeholder="0"
                      defaultValue={selectedProduct?.stock}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-md" defaultValue={selectedProduct?.category}>
                    <option value="">Select category</option>
                    {categories.slice(1).map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-slate-300 rounded-md min-h-24"
                    placeholder="Enter product description"
                    defaultValue={selectedProduct?.description}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Active Status</label>
                  <Switch.Root 
                    className="w-10 h-5 bg-slate-300 rounded-full relative data-[state=checked]:bg-green-600"
                    defaultChecked={selectedProduct?.status === 'Active'}
                  >
                    <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-5" />
                  </Switch.Root>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <Dialog.Close asChild>
                  <button className="px-4 py-2 border border-slate-300 rounded-md hover:bg-slate-50">
                    Cancel
                  </button>
                </Dialog.Close>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  {selectedProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-6 p-2">


        <Tabs.Root defaultValue="All">
          <Tabs.List className="flex border-b border-slate-200 px-4">
            {categories.map(category => (
              <Tabs.Trigger 
                key={category}
                value={category} 
                className="px-4 py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:font-medium"
              >
                {category}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {categories.map(category => (
            <Tabs.Content key={category} value={category} className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products
                  .filter(product => category === 'All' || product.category === category)
                  .map(product => (
                    <div 
                      key={product.id} 
                      className="border border-slate-200 rounded-md overflow-hidden bg-white hover:shadow-md transition-shadow"
                    >
                      <div className="relative h-40 bg-slate-100">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                        {product.status === 'Out of Stock' && (
                          <div className="absolute top-2 right-2 bg-red-100 text-red-800 px-2 py-1 text-xs rounded-full">
                            Out of Stock
                          </div>
                        )}
                        <div className="absolute top-2 right-2">
                          <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-sm">
                                <MoreVerticalIcon size={16} />
                              </button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content align="end" className="bg-white rounded-md shadow-md border border-slate-200 overflow-hidden min-w-40">
                              <DropdownMenu.Item 
                                className="px-3 py-2 text-sm hover:bg-slate-100 cursor-pointer flex items-center gap-2"
                                onSelect={() => handleEditProduct(product)}
                              >
                                <PencilIcon size={16} />
                                <span>Edit Product</span>
                              </DropdownMenu.Item>
                              <DropdownMenu.Item className="px-3 py-2 text-sm hover:bg-slate-100 cursor-pointer flex items-center gap-2 text-red-600">
                                <TrashIcon size={16} />
                                <span>Delete Product</span>
                              </DropdownMenu.Item>
                            </DropdownMenu.Content>
                          </DropdownMenu.Root>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium">{product.name}</h3>
                          <span className="font-bold text-green-600">{product.price}</span>
                        </div>
                        <div className="text-xs text-slate-500 mb-1">{product.category}</div>
                        <div className="text-sm text-slate-600 line-clamp-2">{product.description}</div>
                        <div className="mt-2 text-xs text-slate-500">Stock: {product.stock}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </div>
  );
};

export default Products;
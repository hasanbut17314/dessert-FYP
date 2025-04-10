import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { PlusIcon, EditIcon, TrashIcon, XIcon, MoreVerticalIcon, TagIcon, ShoppingCartIcon, CakeIcon, CoffeeIcon } from 'lucide-react';

const Categories = () => {
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const categories = [
    {
      id: 1,
      name: "Ice Cream",
      products: 8,
      description: "Various flavors of ice cream",
      icon: <TagIcon size={20} />,
      color: "#4f46e5"
    },
    {
      id: 2,
      name: "Drinks",
      products: 12,
      description: "Cold and hot beverages",
      icon: <CoffeeIcon size={20} />,
      color: "#059669"
    },
    {
      id: 3,
      name: "Cakes",
      products: 5,
      description: "Specialty cakes and pastries",
      icon: <CakeIcon size={20} />,
      color: "#db2777"
    },
    {
      id: 4,
      name: "Desserts",
      products: 10,
      description: "Various sweet treats and desserts",
      icon: <CakeIcon size={20} />,
      color: "#f59e0b"
    },
    {
      id: 5,
      name: "Special Offers",
      products: 3,
      description: "Limited time special offers and combos",
      icon: <ShoppingCartIcon size={20} />,
      color: "#ef4444"
    }
  ];

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsAddCategoryOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Categories Management</h1>
          <p className="text-slate-500">Manage your product categories</p>
        </div>
        <Dialog.Root open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>

          <Dialog.Trigger asChild>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
              <PlusIcon size={16} />
              <span>Add Category</span>
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-start mb-4">
                <Dialog.Title className="text-xl font-bold">{selectedCategory ? 'Edit Category' : 'Add New Category'}</Dialog.Title>
                <Dialog.Close asChild>
                  <button className="rounded-full p-2 hover:bg-slate-100">
                    <XIcon size={18} />
                  </button>
                </Dialog.Close>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                    placeholder="Enter category name"
                    defaultValue={selectedCategory?.name}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-slate-300 rounded-md min-h-24"
                    placeholder="Enter category description"
                    defaultValue={selectedCategory?.description}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <Dialog.Close asChild>
                  <button className="px-4 py-2 border border-slate-300 rounded-md hover:bg-slate-50">
                    Cancel
                  </button>
                </Dialog.Close>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  {selectedCategory ? 'Update Category' : 'Add Category'}
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
          >
            <div className="flex justify-between items-start mb-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: category.color }}
              >
                {category.icon}
              </div>
              <DropdownMenu.Root>

                <DropdownMenu.Trigger asChild>
                  <button className="p-1 rounded-full hover:bg-slate-100">
                    <MoreVerticalIcon size={16} />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align="end" className="bg-white rounded-md shadow-md border border-slate-200 overflow-hidden min-w-40">
                  <DropdownMenu.Item 
                    className="px-3 py-2 text-sm hover:bg-slate-100 cursor-pointer flex items-center gap-2"
                    onSelect={() => handleEditCategory(category)}
                  >
                    <EditIcon size={16} />
                    <span>Edit Category</span>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="px-3 py-2 text-sm hover:bg-slate-100 cursor-pointer flex items-center gap-2 text-red-600">
                    <TrashIcon size={16} />
                    <span>Delete Category</span>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
            
            <h3 className="text-lg font-medium mb-1">{category.name}</h3>
            <p className="text-sm text-slate-500 mb-3">{category.description}</p>
            
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-sm text-slate-500">{category.products} products</span>

              {/* <button className="text-sm text-green-600 hover:underline">View products</button> */}
            
            </div>
          </div>
        ))}
        
        {/* Add category card */}
        {/* <Dialog.Trigger asChild>
          <div className="border border-dashed border-slate-300 rounded-lg p-4 flex flex-col items-center justify-center h-full min-h-40 hover:bg-slate-50 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2">
              <PlusIcon size={20} />
            </div>
            <p className="font-medium text-green-600">Add New Category</p>
          </div>
        </Dialog.Trigger> */}

      </div>
    </div>
  );
};

export default Categories;
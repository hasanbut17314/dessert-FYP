import { useState, useRef, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { PlusIcon, EditIcon, TrashIcon, XIcon, MoreVerticalIcon, TagIcon, ImagePlusIcon, Loader2Icon } from 'lucide-react';
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

const Categories = () => {
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const imageInputRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/category/getAllCategories');
      setCategories(response.data.data.categories);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setCategoryName(category.name);
    setCategoryImage(category.image);
    setIsAddCategoryOpen(true);
    setOpenDropdownId(null); // Close any open dropdown
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategoryImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!categoryName) {
        toast.error('Category name is required');
        return;
      }

      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('name', categoryName);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (selectedCategory) {
        await apiService.put(`/category/update/${selectedCategory._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Category updated successfully');
      } else {
        await apiService.post('/category/add', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Category added successfully');
      }

      await fetchCategories();
      setIsAddCategoryOpen(false);
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = (categoryId) => {
    setDeleteCategoryId(categoryId);
    setOpenDropdownId(null);
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      await fetch(`${baseURL}/category/delete/${deleteCategoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      toast.success('Category deleted successfully');
      await fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete category');
    } finally {
      setIsDeleting(false);
      setDeleteCategoryId(null);
    }
  };

  const resetForm = () => {
    setSelectedCategory(null);
    setCategoryName('');
    setCategoryImage(null);
    setImageFile(null);
  };

  return (
    <div className="p-6 mt-12 md:m-0">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Categories Management</h1>
          <p className="text-slate-500">Manage your product categories</p>
        </div>
        <Dialog.Root open={isAddCategoryOpen} onOpenChange={(open) => {
          setIsAddCategoryOpen(open);
          if (!open) resetForm();
        }}>
          <Dialog.Trigger asChild>
            <Button variant="default" className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
              <PlusIcon size={16} />
              <span>Add Category</span>
            </Button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-start mb-4">
                <Dialog.Title className="text-xl font-bold">
                  {selectedCategory ? 'Edit Category' : 'Add New Category'}
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
                    {categoryImage ? (
                      <img
                        src={categoryImage}
                        alt="Category"
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-full h-full rounded-md flex items-center justify-center">
                        <TagIcon size={40} className="text-slate-400" />
                      </div>
                    )}
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
                  <label className="block text-sm font-medium mb-1">Category Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                    placeholder="Enter category name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
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
                      {selectedCategory ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    selectedCategory ? 'Update Category' : 'Add Category'
                  )}
                </Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      ) : categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="w-16 h-16 rounded-md overflow-hidden">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                      <TagIcon size={24} className="text-slate-400" />
                    </div>
                  )}
                </div>
                <DropdownMenu.Root
                  open={openDropdownId === category._id}
                  onOpenChange={(open) => setOpenDropdownId(open ? category._id : null)}
                >
                  <DropdownMenu.Trigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVerticalIcon size={16} />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content align="end" className="bg-white rounded-md shadow-md border border-slate-200 overflow-hidden min-w-40">
                    <DropdownMenu.Item
                      className="px-3 py-2 text-sm hover:bg-slate-100 cursor-pointer flex items-center gap-2"
                      onSelect={() => handleEditCategory(category)}
                    >
                      <EditIcon size={16} />
                      <span>Edit Category</span>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      className="px-3 py-2 text-sm hover:bg-slate-100 cursor-pointer flex items-center gap-2 text-red-600"
                      onSelect={() => handleDeleteCategory(category._id)}
                    >
                      <TrashIcon size={16} />
                      <span>Delete Category</span>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </div>

              <h3 className="text-lg font-medium mb-1">{category.name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-slate-500">No categories found</p>
        </div>
      )}

      {/* Alert Dialog for Delete Confirmation */}
      <AlertDialog open={!!deleteCategoryId} onOpenChange={(open) => !open && setDeleteCategoryId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
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

export default Categories;
import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Avatar from '@radix-ui/react-avatar';
import * as Tabs from '@radix-ui/react-tabs';
import { PlusIcon, SearchIcon, Trash2Icon, Loader2Icon } from 'lucide-react';
import { apiService } from '../../lib/axios';
import { toast } from 'sonner';
import { baseURL } from '../../lib/utils';

const Users = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'user',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.password) errors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCreateUser = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await apiService.post(`/user/addUser`, formData);
      console.log(response);

      const data = response?.data?.data;
      if (data) {
        setUsers(prev => [...prev, data]);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          role: 'user',
          password: '',
          confirmPassword: '',
        });
        toast.success('User created successfully');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error(error.response?.data?.message || 'Error creating user');
    } finally {
      setIsLoading(false);
      setIsAddUserOpen(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!userId) return;

    setIsDeleting(true);
    setDeleteUserId(userId);
    console.log(userId);
    try {
      await fetch(`${baseURL}/user/deleteUser/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setUsers(prev => prev.filter(user => user._id !== userId));
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error(error.response?.data?.message || 'Error deleting user');
    } finally {
      setIsDeleting(false);
      setDeleteUserId(null);
    }
  };

  const fetchUsers = async () => {
    setFetching(true);
    try {
      const response = await apiService.get('/user/getAllUsers');
      const data = response?.data?.data?.users;
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Error fetching users');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users?.length > 0 ? users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role.toLowerCase() === selectedRole.toLowerCase();
    return matchesSearch && matchesRole;
  }) : [];

  return (
    <div className="p-6 mt-12 md:m-0">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Users Management</h1>
          <p className="text-slate-500">Manage your customers, admins, and staff members</p>
        </div>
        <Dialog.Root open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <Dialog.Trigger asChild>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
              <PlusIcon size={16} />
              <span>Add User</span>
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
              <Dialog.Title className="text-xl font-bold mb-4">Add New User</Dialog.Title>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md ${formErrors.firstName ? 'border-red-500' : 'border-slate-300'
                        }`}
                      placeholder="Enter first name"
                    />
                    {formErrors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md ${formErrors.lastName ? 'border-red-500' : 'border-slate-300'
                        }`}
                      placeholder="Enter last name"
                    />
                    {formErrors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md ${formErrors.email ? 'border-red-500' : 'border-slate-300'
                      }`}
                    placeholder="Enter email address"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md ${formErrors.password ? 'border-red-500' : 'border-slate-300'
                      }`}
                    placeholder="Enter password"
                  />
                  {formErrors.password && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md ${formErrors.confirmPassword ? 'border-red-500' : 'border-slate-300'
                      }`}
                    placeholder="Confirm password"
                  />
                  {formErrors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Dialog.Close asChild>
                  <button className="px-4 py-2 border border-slate-300 rounded-md hover:bg-slate-50">
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  onClick={handleCreateUser}
                  disabled={isLoading}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading && <Loader2Icon className="animate-spin" size={16} />}
                  Create User
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="bg-white rounded-lg w-full shadow-sm border border-slate-200 overflow-hidden">
        <Tabs.Root defaultValue="all" className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <td className="py-3 px-4 text-sm font-medium text-slate-600 text-left">Name</td>
                <td className="py-3 px-4 text-sm font-medium text-slate-600 text-left">Email</td>
                <td className="py-3 px-4 text-sm font-medium text-slate-600 text-left">Role</td>
                <td className="py-3 px-4 text-sm font-medium text-slate-600 text-left">Actions</td>
              </tr>
            </thead>
            <tbody>
              {fetching ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center">
                    <div className="flex justify-center">
                      <Loader2Icon className="animate-spin text-slate-400" size={24} />
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-slate-500">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar.Root className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                          <Avatar.Fallback className="text-sm font-medium text-slate-600">
                            {user.firstName.charAt(0)}
                          </Avatar.Fallback>
                        </Avatar.Root>
                        <span>{user.firstName + ' ' + user.lastName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{user.email}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${user.role === 'Admin'
                          ? 'bg-purple-100 text-purple-800'
                          : user.role === 'Staff'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-800'
                          }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        disabled={isDeleting && deleteUserId === user._id}
                        className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                      >
                        {isDeleting && deleteUserId === user._id ? (
                          <Loader2Icon className="animate-spin" size={16} />
                        ) : (
                          <Trash2Icon size={16} />
                        )}
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Tabs.Root>
      </div>
    </div>
  );
};

export default Users;
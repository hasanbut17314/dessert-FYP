import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Avatar from '@radix-ui/react-avatar';
import * as Tabs from '@radix-ui/react-tabs';
import { PlusIcon, SearchIcon, FilterIcon, MoreHorizontalIcon } from 'lucide-react';

const Users = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  
  // Dummy users data
  const users = [
    { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Customer', status: 'Active', lastOrder: '2 days ago' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Admin', status: 'Active', lastOrder: '5 days ago' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', role: 'Customer', status: 'Inactive', lastOrder: '3 weeks ago' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Customer', status: 'Active', lastOrder: '1 day ago' },
    { id: 5, name: 'David Wilson', email: 'david@example.com', role: 'Staff', status: 'Active', lastOrder: 'Today' },
  ];

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
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                    placeholder="Enter user name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-md">
                    <option>Customer</option>
                    <option>Admin</option>
                    <option>Staff</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Dialog.Close asChild>
                  <button className="px-4 py-2 border border-slate-300 rounded-md hover:bg-slate-50">
                    Cancel
                  </button>
                </Dialog.Close>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  Create User
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      <div className="bg-white rounded-lg w-full shadow-sm border border-slate-200 overflow-hidden">

        <Tabs.Root defaultValue="all" className='w-full overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="py-3 px-4 text-sm font-medium text-slate-600 text-left">Name</td>
                  <td className="py-3 px-4 text-sm font-medium text-slate-600 text-left">Email</td>
                  <td className="py-3 px-4 text-sm font-medium text-slate-600 text-left">Role</td>
                  {/* <td className="py-3 px-4 text-sm font-medium text-slate-600 text-left">Status</td> */}
                  {/* <td className="py-3 px-4 text-sm font-medium text-slate-600 text-left">Last Order</td> */}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar.Root className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                          <Avatar.Fallback className="text-sm font-medium text-slate-600">
                            {user.name.charAt(0)}
                          </Avatar.Fallback>
                        </Avatar.Root>
                        <span>{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 
                        user.role === 'Staff' ? 'bg-blue-100 text-blue-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    {/* <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td> */}
                    {/* <td className="py-3 px-4 text-slate-600">{user.lastOrder}</td>
                    <td className="py-3 px-4">
                      <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
                        <MoreHorizontalIcon size={16} />
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          
        </Tabs.Root>
        
      </div>
    </div>
  );
};

export default Users;
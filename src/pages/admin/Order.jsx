import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import * as Avatar from '@radix-ui/react-avatar';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { SearchIcon, FilterIcon, EyeIcon, DownloadIcon, MoreVerticalIcon, CheckIcon, XIcon } from 'lucide-react';

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const orders = [
    { 
      id: "ORD-1234", 
      customer: { name: "John Smith", email: "john@example.com" },
      date: "Apr 9, 2025", 
      amount: "$35.99", 
      items: 3, 
      status: "Delivered",
      paymentStatus: "Paid",
      products: [
        { name: "Chocolate Ice Cream", quantity: 1, price: "$12.99" },
        { name: "Vanilla Shake", quantity: 2, price: "$8.50" }
      ]
    },
    { 
      id: "ORD-1233", 
      customer: { name: "Emily Davis", email: "emily@example.com" },
      date: "Apr 8, 2025", 
      amount: "$24.50", 
      items: 2, 
      status: "Processing",
      paymentStatus: "Paid",
      products: [
        { name: "Strawberry Cake", quantity: 1, price: "$24.50" }
      ]
    },
    { 
      id: "ORD-1232", 
      customer: { name: "Michael Brown", email: "michael@example.com" },
      date: "Apr 8, 2025", 
      amount: "$42.75", 
      items: 4, 
      status: "Processing",
      paymentStatus: "Paid",
      products: [
        { name: "Mint Ice Cream", quantity: 2, price: "$25.98" },
        { name: "Chocolate Shake", quantity: 2, price: "$16.77" }
      ]
    },
    { 
      id: "ORD-1231", 
      customer: { name: "Sarah Johnson", email: "sarah@example.com" },
      date: "Apr 7, 2025", 
      amount: "$18.25", 
      items: 2, 
      status: "Delivered",
      paymentStatus: "Paid",
      products: [
        { name: "Vanilla Ice Cream", quantity: 1, price: "$12.99" },
        { name: "Chocolate Cone", quantity: 1, price: "$5.26" }
      ]
    },
    { 
      id: "ORD-1230", 
      customer: { name: "David Wilson", email: "david@example.com" },
      date: "Apr 6, 2025", 
      amount: "$32.50", 
      items: 3, 
      status: "Cancelled",
      paymentStatus: "Refunded",
      products: [
        { name: "Strawberry Shake", quantity: 2, price: "$17.00" },
        { name: "Chocolate Cake", quantity: 1, price: "$15.50" }
      ]
    },
  ];

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="p-6 mt-12 md:m-0">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Orders Management</h1>
          <p className="text-slate-500">Track and manage all customer orders</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-md flex items-center gap-2">
            <DownloadIcon size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-x-auto">

        <Tabs.Root defaultValue="all">

            <table className="w-full border-t border-slate-200 overflow-x-auto">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="py-3 px-4 text-sm font-medium text-slate-600 text-left">Order ID</td>
                  <td className="py-3 px-4 text-sm font-medium text-slate-600 text-left">Customer</td>
                  <td className="py-3 px-4 text-sm font-medium text-slate-600 text-left">Date</td>
                  <td className="py-3 px-4 text-sm font-medium text-slate-600 text-left">Amount</td>
                  <td className="py-3 px-4 text-sm font-medium text-slate-600 text-left">Status</td>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium">{order.id}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar.Root className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                          <Avatar.Fallback className="text-sm font-medium text-slate-600">
                            {order.customer.name.charAt(0)}
                          </Avatar.Fallback>
                        </Avatar.Root>
                        <div>
                          <div>{order.customer.name}</div>
                          <div className="text-xs text-slate-500">{order.customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{order.date}</td>
                    <td className="py-3 px-4 font-medium">{order.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 
                        order.paymentStatus === 'Refunded' ? 'bg-orange-100 text-orange-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
                            <MoreVerticalIcon size={16} />
                          </button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content align="end" className="bg-white rounded-md shadow-md border border-slate-200 overflow-hidden min-w-40">
                          <DropdownMenu.Item 
                            className="px-3 py-2 text-sm hover:bg-slate-100 cursor-pointer flex items-center gap-2"
                            onSelect={() => viewOrderDetails(order)}
                          >
                            <EyeIcon size={16} />
                            <span>View Details</span>
                          </DropdownMenu.Item>


                          {/* {order.status === 'Processing' && (
                            <DropdownMenu.Item className="px-3 py-2 text-sm hover:bg-slate-100 cursor-pointer flex items-center gap-2 text-green-600">
                              <CheckIcon size={16} />
                              <span>Mark as Delivered</span>
                            </DropdownMenu.Item>
                          )} */}
                          {/* {order.status !== 'Cancelled' && (
                            <DropdownMenu.Item className="px-3 py-2 text-sm hover:bg-slate-100 cursor-pointer flex items-center gap-2 text-red-600">
                              <XIcon size={16} />
                              <span>Cancel Order</span>
                            </DropdownMenu.Item>
                          )} */}

                          
                        </DropdownMenu.Content>
                      </DropdownMenu.Root>
                    </td>
                  </tr>
                ))}
            </tbody>
            </table>
          
          {/* Other tabs would filter the orders by status */}
          <Tabs.Content value="processing">
            <div className="p-4 text-center text-slate-500">Processing orders filtered view</div>
          </Tabs.Content>
          <Tabs.Content value="delivered">
            <div className="p-4 text-center text-slate-500">Delivered orders filtered view</div>
          </Tabs.Content>
          <Tabs.Content value="cancelled">
            <div className="p-4 text-center text-slate-500">Cancelled orders filtered view</div>
          </Tabs.Content>
        </Tabs.Root>
      
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <Dialog.Root open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Dialog.Title className="text-xl font-bold">Order Details: {selectedOrder.id}</Dialog.Title>
                  <Dialog.Description className="text-slate-500">
                    {selectedOrder.date} • {selectedOrder.items} items • {selectedOrder.amount}
                  </Dialog.Description>
                </div>
                <Dialog.Close asChild>
                  <button className="rounded-full p-2 hover:bg-slate-100">
                    <XIcon size={18} />
                  </button>
                </Dialog.Close>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6 border-b border-slate-200 pb-6">
                <div>
                  <h3 className="text-sm font-medium text-slate-500 mb-1">Customer</h3>
                  <div className="flex items-center gap-3">
                    <Avatar.Root className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                      <Avatar.Fallback className="text-sm font-medium text-slate-600">
                        {selectedOrder.customer.name.charAt(0)}
                      </Avatar.Fallback>
                    </Avatar.Root>
                    <div>
                      <div className="font-medium">{selectedOrder.customer.name}</div>
                      <div className="text-sm text-slate-500">{selectedOrder.customer.email}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-500 mb-1">Order Status</h3>
                  <div className="flex gap-4">
                    <div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        selectedOrder.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                        selectedOrder.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedOrder.status}
                      </span>
                    </div>
                    <div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        selectedOrder.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 
                        selectedOrder.paymentStatus === 'Refunded' ? 'bg-orange-100 text-orange-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedOrder.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-3">Order Items</h3>
              <div className="flex justify-between items-center border-t border-slate-200 pt-4">
                <div className="text-sm">
                  <div className="font-medium">Total Amount</div>
                  <div className="text-slate-500">Including taxes and discounts</div>
                </div>
                <div className="text-xl font-bold">{selectedOrder.amount}</div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                {selectedOrder.status === 'Processing' && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2">
                    <CheckIcon size={16} />
                    <span>Mark as Delivered</span>
                  </button>
                )}
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </div>
  );
};

export default Orders;
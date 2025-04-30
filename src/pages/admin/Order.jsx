import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { apiService } from "@/lib/axios"
import { toast } from "sonner"
import { Loader2, Filter, Eye, Package, TruckIcon, CheckCircle, XCircle, User, Phone, MapPin } from "lucide-react"
import { useNavigate } from "react-router"
import { format } from "date-fns"
import useAuth from "@/hooks/useAuth"

export default function Order() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  })
  const [statusFilter, setStatusFilter] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    fetchOrders()
  }, [pagination.page, statusFilter, isAuthenticated, navigate])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const queryParams = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })

      if (statusFilter) {
        queryParams.append("status", statusFilter)
      }

      const response = await apiService.get(`/order/getAllorders?${queryParams.toString()}`)
      setOrders(response.data.data.orders)
      setPagination(response.data.data.pagination)
    } catch (error) {
      console.error("Error fetching orders:", error)
      toast.error("Failed to load orders")
    } finally {
      setLoading(false)
    }
  };

  const viewOrderDetails = async (orderId) => {
    try {
      const order = orders.find((o) => o._id === orderId)
      if (order) {
        setSelectedOrder(order)
        setOrderDetailsOpen(true)
      }
    } catch (error) {
      console.error("Error fetching order details:", error)
      toast.error("Failed to load order details")
    }
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdatingStatus(true)
      await apiService.put(`/order/${orderId}/updateStatus`, { status: newStatus })

      // Update the order in the local state
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === orderId ? { ...order, status: newStatus } : order)),
      )

      // Update the selected order if it's open
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus })
      }

      toast.success(`Order status updated to ${newStatus}`)
    } catch (error) {
      console.error("Error updating order status:", error)
      toast.error("Failed to update order status")
    } finally {
      setUpdatingStatus(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-400/50 text-yellow-700 border-yellow-500/20"
      case "Shipped":
        return "bg-blue-400/10 text-blue-600 border-blue-500/20"
      case "Delivered":
        return "bg-green-400/10 text-green-700 border-green-500/20"
      case "Cancelled":
        return "bg-red-400/30 text-red-600 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Package className="h-4 w-4" />
      case "Shipped":
        return <TruckIcon className="h-4 w-4" />
      case "Delivered":
        return <CheckCircle className="h-4 w-4" />
      case "Cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy")
    } catch (error) {
      return "Invalid date"
    }
  }

  const formatTime = (dateString) => {
    try {
      return format(new Date(dateString), "hh:mm a")
    } catch (error) {
      return "Invalid time"
    }
  }

  if (loading && orders.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
        <Loader2 className="h-8 w-8 animate-spin text-[#BA4374]" />
        <p className="mt-4">Loading orders...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-4 md:mb-0">Order Management</h1>
            <p className="text-slate-500">Manage your orders at real-time</p>
          </div>
          <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
            <div className="relative">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px] border-zinc-800">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="border-zinc-800">
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Filter className="h-4 w-4 absolute right-10 top-1/2 transform -translate-y-1/2 text-zinc-400" />
            </div>
          </div>
        </div>

        <Card className="overflow-hidden pt-0">
          <CardHeader className="!pt-0">
            <CardTitle className="sr-only !p-0">Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 overflow-auto !pt-0">
            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Package className="h-16 w-16 text-zinc-700 mb-4" />
                <h3 className="text-xl font-medium mb-2">No orders found</h3>
                <p className="text-zinc-400 mb-6 text-center">
                  {statusFilter
                    ? `There are no ${statusFilter.toLowerCase()} orders.`
                    : "There are no orders in the system."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-800">
                      <TableHead className="text-zinc-400">Order #</TableHead>
                      <TableHead className="text-zinc-400">Customer</TableHead>
                      <TableHead className="text-zinc-400">Date</TableHead>
                      <TableHead className="text-zinc-400">Status</TableHead>
                      <TableHead className="text-zinc-400">Items</TableHead>
                      <TableHead className="text-zinc-400 text-right">Total</TableHead>
                      <TableHead className="text-zinc-400 text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order._id} className="border-zinc-800">
                        <TableCell className="font-medium">{order.order_no}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{`${order.firstName} ${order.lastName}`}</span>
                            <span className="text-xs text-zinc-400">{order.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{formatDate(order.createdAt)}</span>
                            <span className="text-xs text-zinc-400">{formatTime(order.createdAt)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(order.status)} border flex items-center gap-1 w-fit`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.orderItems.length}</TableCell>
                        <TableCell className="text-right font-bold text-[#BA4374]">{order.totalPrice} PKR</TableCell>
                        <TableCell>
                          <div className="flex justify-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => viewOrderDetails(order._id)}
                              className="text-zinc-400"
                            >
                              <Eye className="h-5 w-5" />
                              <span className="sr-only">View Order</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Pagination */}
            {pagination.total > pagination.limit && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
                    disabled={pagination.page === 1 || loading}
                    className="bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800"
                  >
                    Previous
                  </Button>

                  <span className="text-sm px-4 py-2 bg-zinc-900 rounded-md border border-zinc-800">
                    Page {pagination.page} of {Math.ceil(pagination.total / pagination.limit)}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
                    disabled={pagination.page >= Math.ceil(pagination.total / pagination.limit) || loading}
                    className="bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={orderDetailsOpen} onOpenChange={setOrderDetailsOpen}>
        <DialogContent className="border-zinc-800 max-w-4xl max-h-[94vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl flex items-center justify-between">
                  <span>Order #{selectedOrder.order_no}</span>
                  <Badge className={`${getStatusColor(selectedOrder.status)} border flex items-center gap-1`}>
                    {getStatusIcon(selectedOrder.status)}
                    {selectedOrder.status}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h3 className="font-medium mb-3 text-[#BA4374] flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Customer Information
                  </h3>
                  <div className="space-y-2 text-sm md:p-4 p-2 rounded-md">
                    <div className="grid grid-cols-3">
                      <p className="text-slate-500">Name:</p>
                      <p className="col-span-2">{`${selectedOrder.firstName} ${selectedOrder.lastName}`}</p>
                    </div>
                    <div className="grid grid-cols-3">
                      <p className="text-slate-500">Email:</p>
                      <p className="col-span-2">{selectedOrder.email}</p>
                    </div>
                    <div className="grid grid-cols-3">
                      <p className="text-slate-500">Order Date:</p>
                      <p className="col-span-2">
                        {formatDate(selectedOrder.createdAt)} at {formatTime(selectedOrder.createdAt)}
                      </p>
                    </div>
                  </div>

                  <h3 className="font-medium mb-3 mt-6 text-[#BA4374] flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Delivery Information
                  </h3>
                  <div className="space-y-2 text-sm md:p-4 p-2 rounded-md">
                    <div className="grid grid-cols-3">
                      <p className="text-slate-500">Address:</p>
                      <p className="col-span-2">{selectedOrder.address}</p>
                    </div>
                    <div className="grid grid-cols-3">
                      <p className="text-slate-500">City:</p>
                      <p className="col-span-2">{selectedOrder.city}</p>
                    </div>
                    {selectedOrder.postalCode && (
                      <div className="grid grid-cols-3">
                        <p className="text-slate-500">Postal Code:</p>
                        <p className="col-span-2">{selectedOrder.postalCode}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-3">
                      <p className="text-slate-500">Contact:</p>
                      <p className="col-span-2 flex items-center gap-2">
                        <Phone className="h-4 w-4 text-slate-500" />
                        {selectedOrder.contactNumber}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3 text-[#BA4374] flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Order Items
                  </h3>
                  <div className="space-y-3">
                    {selectedOrder.orderItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 sm:p-3 p-2 rounded-md">
                        <div className="w-16 h-16 rounded-md overflow-hidden">
                          {item.prodId.image && (
                            <img
                              src={item.prodId.image || "/placeholder.svg"}
                              alt={item.prodId.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.prodId.name}</p>
                          <div className="flex justify-between text-sm text-slate-500">
                            <p>Qty: {item.quantity}</p>
                            <p>{item.price} PKR</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="p-2 rounded-md">
                      <Separator className="my-2 bg-zinc-700" />
                      <div className="flex justify-between font-bold text-[#BA4374]">
                        <span>Total</span>
                        <span>{selectedOrder.totalPrice} PKR</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-6 flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-slate-500">Update Status:</span>
                  <Select
                    disabled={updatingStatus}
                    value={selectedOrder.status}
                    onValueChange={(value) => updateOrderStatus(selectedOrder._id, value)}
                  >
                    <SelectTrigger className="w-[180px] border-zinc-700">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="border-zinc-700">
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  {updatingStatus && <Loader2 className="h-4 w-4 animate-spin" />}
                </div>
                <Button
                  variant="outline"
                  onClick={() => setOrderDetailsOpen(false)}
                  className="border-zinc-700"
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}

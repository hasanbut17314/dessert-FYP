import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { apiService } from "@/lib/axios"
import { toast } from "sonner"
import { Loader2, ChevronDown, ChevronUp, Package, Calendar, Clock } from "lucide-react"
import { useNavigate } from "react-router"
import { format } from "date-fns"
import useAuth from "@/hooks/useAuth"

export default function UserOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
    })
    const [statusFilter, setStatusFilter] = useState("")
    const [expandedOrder, setExpandedOrder] = useState(null)
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

            const response = await apiService.get(`/order/getUserOrders?${queryParams.toString()}`)
            setOrders(response.data.data.orders)
            setPagination(response.data.data.pagination)
        } catch (error) {
            console.error("Error fetching orders:", error)
            toast.error("Failed to load orders")
        } finally {
            setLoading(false)
        }
    }

    const toggleOrderExpand = (orderId) => {
        if (expandedOrder === orderId) {
            setExpandedOrder(null)
        } else {
            setExpandedOrder(orderId)
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
            case "Shipped":
                return "bg-blue-500/10 text-blue-500 border-blue-500/20"
            case "Delivered":
                return "bg-green-500/10 text-green-500 border-green-500/20"
            case "Cancelled":
                return "bg-red-500/10 text-red-500 border-red-500/20"
            default:
                return "bg-gray-500/10 text-gray-500 border-gray-500/20"
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
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <h1 className="text-3xl font-bold mb-4 md:mb-0">My Orders</h1>

                    <div className="w-full md:w-auto">
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
                    </div>
                </div>

                {orders.length === 0 ? (
                    <Card className="bg-zinc-900 border-zinc-800 text-white">
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Package className="h-16 w-16 text-zinc-700 mb-4" />
                            <h3 className="text-xl font-medium mb-2">No orders found</h3>
                            <p className="text-zinc-400 mb-6 text-center">
                                {statusFilter
                                    ? `You don't have any ${statusFilter.toLowerCase()} orders.`
                                    : "You haven't placed any orders yet."}
                            </p>
                            <Button className="bg-[#BA4374] hover:bg-[#a03964] text-white" onClick={() => navigate("/menu")}>
                                Browse Menu
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <Card key={order._id} className="bg-zinc-900 border-zinc-800 text-white overflow-hidden">
                                <CardHeader className="p-4 md:p-6">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                        <div className="flex flex-col mb-4 md:mb-0">
                                            <div className="flex items-center gap-2">
                                                <CardTitle className="text-lg md:text-xl">Order #{order.order_no}</CardTitle>
                                                <Badge className={`${getStatusColor(order.status)} border`}>{order.status}</Badge>
                                            </div>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-zinc-400">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {formatDate(order.createdAt)}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    {formatTime(order.createdAt)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-sm text-zinc-400">Total Amount</p>
                                                <p className="font-bold text-lg text-[#BA4374]">{order.totalPrice} PKR</p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => toggleOrderExpand(order._id)}
                                                className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                                            >
                                                {expandedOrder === order._id ? (
                                                    <ChevronUp className="h-5 w-5" />
                                                ) : (
                                                    <ChevronDown className="h-5 w-5" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>

                                {expandedOrder === order._id && (
                                    <CardContent className="p-4 md:p-6 pt-0">
                                        <Separator className="mb-4 bg-zinc-700" />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20">
                                            <div>
                                                <h3 className="font-medium mb-2 text-[#BA4374]">Order Items</h3>
                                                <div className="space-y-3">
                                                    {order.orderItems.map((item, index) => (
                                                        <div key={index} className="flex items-center gap-3">
                                                            <div className="w-12 h-12 bg-zinc-800 rounded-md overflow-hidden">
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
                                                                <div className="flex justify-between text-sm text-zinc-400">
                                                                    <p>Qty: {item.quantity}</p>
                                                                    <p>{item.price} PKR</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="font-medium mb-2 text-[#BA4374]">Delivery Information</h3>
                                                <div className="space-y-2 text-sm">
                                                    <div className="grid grid-cols-3">
                                                        <p className="text-zinc-400">Address:</p>
                                                        <p className="col-span-2">{order.address}</p>
                                                    </div>
                                                    <div className="grid grid-cols-3">
                                                        <p className="text-zinc-400">City:</p>
                                                        <p className="col-span-2">{order.city}</p>
                                                    </div>
                                                    {order.postalCode && (
                                                        <div className="grid grid-cols-3">
                                                            <p className="text-zinc-400">Postal Code:</p>
                                                            <p className="col-span-2">{order.postalCode}</p>
                                                        </div>
                                                    )}
                                                    <div className="grid grid-cols-3">
                                                        <p className="text-zinc-400">Contact:</p>
                                                        <p className="col-span-2">{order.contactNumber}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                )}
                            </Card>
                        ))}
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
            </div>
        </main>
    )
}

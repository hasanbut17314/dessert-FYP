import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { apiService } from "@/lib/axios"
import { toast } from "sonner"
import { Loader2, CreditCard, Banknote, CheckCircle } from "lucide-react"
import { useNavigate } from "react-router"
import useAuth from "@/hooks/useAuth"

export default function Checkout() {
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
        contactNumber: ""
    })
    const [orderComplete, setOrderComplete] = useState(false)
    const navigate = useNavigate()
    const { isAuthenticated, user } = useAuth()

    useEffect(() => {
        if (isAuthenticated && user) {
            setForm(prevForm => ({
                ...prevForm,
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || ""
            }))
        }

        fetchCart()
    }, [isAuthenticated, user])

    const fetchCart = () => {
        try {
            setLoading(true)
            const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
            setCartItems(storedCart)
        } catch (error) {
            console.error("Error fetching cart:", error)
            toast.error("Failed to load cart items")
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const requiredFields = isAuthenticated
            ? ['address', 'city', 'contactNumber']
            : ['firstName', 'lastName', 'email', 'address', 'city', 'contactNumber']

        const missingFields = requiredFields.filter(field => !form[field])

        if (missingFields.length > 0) {
            toast.error(`Please fill all required fields: ${missingFields.join(', ')}`)
            return
        }

        try {
            setSubmitting(true)

            await apiService.post("/order/create", {
                ...form,
                items: cartItems.map(item => ({
                    prodId: item._id,
                    quantity: item.quantity,
                    price: item.price
                }))
            })

            localStorage.setItem("cart", JSON.stringify([]))
            window.dispatchEvent(new Event("cartUpdated"))
            setCartItems([])
            setOrderComplete(true)
            toast.success("Order placed successfully!")
        } catch (error) {
            console.error("Error placing order:", error)
            toast.error(error.response?.data?.message || "Failed to place order")
        } finally {
            setSubmitting(false)
        }
    }

    const totalPrice = cartItems.reduce((acc, item) => acc + Number.parseFloat(item.price) * item.quantity, 0)

    if (loading) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
                <Loader2 className="h-8 w-8 animate-spin text-[#BA4374]" />
                <p className="mt-4">Loading checkout...</p>
            </main>
        )
    }

    if (cartItems.length === 0 && !orderComplete) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
                <Card className="max-w-md w-full border-zinc-800">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Your Cart is Empty</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="mb-6">Add some items to your cart before proceeding to checkout.</p>
                        <Button
                            className="w-full bg-[#BA4374] hover:bg-[#a03964] text-white"
                            onClick={() => navigate("/menu")}
                        >
                            Browse Menu
                        </Button>
                    </CardContent>
                </Card>
            </main>
        )
    }

    if (orderComplete) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 ">
                <Card className="max-w-md w-full border-zinc-800">
                    <CardHeader className="text-center">
                        <CheckCircle className="w-16 h-16 mx-auto text-[#BA4374] mb-4" />
                        <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="mb-6">Your order has been placed successfully.</p>
                        <p className="text-zinc-400 mb-8">You will receive a confirmation mail shortly.</p>
                        <Button
                            className="w-full bg-[#BA4374] hover:bg-[#a03964] text-white"
                            onClick={() => isAuthenticated ? navigate("/orders") : navigate("/menu")}
                        >
                            {isAuthenticated ? "View Orders" : "Continue Shopping"}
                        </Button>
                    </CardContent>
                </Card>
            </main>
        )
    }

    return (
        <main className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <div key={item._id} className="flex justify-between items-center">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 rounded-md overflow-hidden">
                                                    {item.image && (
                                                        <img
                                                            src={item.image || "/placeholder.svg"}
                                                            alt={item.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{item.title}</p>
                                                    <p className="text-sm text-zinc-400">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p className="font-bold">{Number.parseFloat(item.price) * item.quantity} Rs</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8">
                                    <div>
                                        <p className="text-xs text-zinc-400">*Order will be delivered within 30 to 60 minutes</p>
                                    </div>
                                    <Separator className="my-2 bg-zinc-800" />
                                    <div className="flex justify-between font-bold text-[#BA4374]">
                                        <span>Total</span>
                                        <span>{totalPrice} PKR</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Delivery Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name*</Label>
                                            <Input
                                                id="firstName"
                                                name="firstName"
                                                value={form.firstName}
                                                onChange={handleInputChange}
                                                disabled={isAuthenticated}
                                                required={!isAuthenticated}
                                                placeholder="First Name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name*</Label>
                                            <Input
                                                id="lastName"
                                                name="lastName"
                                                value={form.lastName}
                                                onChange={handleInputChange}
                                                disabled={isAuthenticated}
                                                required={!isAuthenticated}
                                                placeholder="Last Name"
                                            />
                                        </div>
                                    </div>

                                    {!isAuthenticated && (
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address*</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleInputChange}
                                                placeholder="Email Address"
                                                required
                                            />
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address*</Label>
                                        <Textarea
                                            id="address"
                                            name="address"
                                            value={form.address}
                                            onChange={handleInputChange}
                                            placeholder="Enter your full address"
                                            required
                                            className="min-h-[80px]"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="city">City*</Label>
                                            <Input
                                                id="city"
                                                name="city"
                                                value={form.city}
                                                onChange={handleInputChange}
                                                placeholder="City"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="postalCode">Postal Code</Label>
                                            <Input
                                                id="postalCode"
                                                name="postalCode"
                                                value={form.postalCode}
                                                onChange={handleInputChange}
                                                placeholder="Postal Code"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number*</Label>
                                        <Input
                                            id="phone"
                                            name="contactNumber"
                                            value={form.contactNumber}
                                            onChange={handleInputChange}
                                            placeholder="Enter your phone number"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <Label>Payment Method</Label>
                                        <RadioGroup
                                            defaultValue="cash"
                                            name="paymentMethod"
                                            value="cash"
                                            className="space-y-2"
                                        >
                                            <div className="flex items-center space-x-2 rounded-md border border-zinc-800 p-3">
                                                <RadioGroupItem value="cash" id="cash" />
                                                <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer">
                                                    <Banknote className="h-5 w-5 text-[#BA4374]" />
                                                    Cash on Delivery
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2 rounded-md border border-zinc-800 p-3">
                                                <RadioGroupItem value="card" id="card" />
                                                <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                                                    <CreditCard className="h-5 w-5 text-[#BA4374]" />
                                                    Credit/Debit Card
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-[#BA4374] hover:bg-[#a03964] text-white"
                                        disabled={submitting}
                                    >
                                        {submitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            "Confirm Order"
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    )
}






// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"
// import { apiService } from "@/lib/axios"
// import { toast } from "sonner"
// import { Loader2, CreditCard, Banknote, CheckCircle } from "lucide-react"
// import { useNavigate } from "react-router"
// import useAuth from "@/hooks/useAuth"

// export default function Checkout() {
//     const [cartItems, setCartItems] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [submitting, setSubmitting] = useState(false)
//     const [form, setForm] = useState({
//         address: "",
//         city: "",
//         postalCode: "",
//         contactNumber: ""
//     })
//     const [orderComplete, setOrderComplete] = useState(false)
//     const navigate = useNavigate()
//     const { isAuthenticated, user } = useAuth()

//     useEffect(() => {
//         if (!isAuthenticated) {
//             navigate("/login")
//             return
//         }

//         fetchCart()
//     }, [isAuthenticated, navigate])

//     const fetchCart = async () => {
//         try {
//             setLoading(true)
//             const response = await apiService.get("/cart/getUserCart")
//             setCartItems(response.data.data.items || [])
//         } catch (error) {
//             console.error("Error fetching cart:", error)
//             toast.error("Failed to load cart items")
//         } finally {
//             setLoading(false)
//         }
//     }

//     const handleInputChange = (e) => {
//         const { name, value } = e.target
//         setForm((prev) => ({
//             ...prev,
//             [name]: value,
//         }))
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         if (!form.address || !form.city || !form.contactNumber) {
//             toast.error("Please fill all required fields")
//             return
//         }

//         try {
//             setSubmitting(true)
//             await apiService.post("/order/create", form)
//             setOrderComplete(true)
//             toast.success("Order placed successfully!")
//         } catch (error) {
//             console.error("Error placing order:", error)
//             toast.error(error.response?.data?.message || "Failed to place order")
//         } finally {
//             setSubmitting(false)
//         }
//     }

//     const totalPrice = cartItems.reduce((acc, item) => acc + Number.parseFloat(item.price) * item.quantity, 0)

//     if (loading) {
//         return (
//             <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
//                 <Loader2 className="h-8 w-8 animate-spin text-[#BA4374]" />
//                 <p className="mt-4">Loading checkout...</p>
//             </main>
//         )
//     }

//     if (orderComplete) {
//         return (
//             <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 ">
//                 <Card className="max-w-md w-full border-zinc-800">
//                     <CardHeader className="text-center">
//                         <CheckCircle className="w-16 h-16 mx-auto text-[#BA4374] mb-4" />
//                         <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
//                     </CardHeader>
//                     <CardContent className="text-center">
//                         <p className="mb-6">Your order has been placed successfully.</p>
//                         <p className="text-zinc-400 mb-8">You will receive a confirmation mail shortly.</p>
//                         <Button
//                             className="w-full bg-[#BA4374] hover:bg-[#a03964] text-white"
//                             onClick={() => navigate("/orders")}
//                         >
//                             View Orders
//                         </Button>
//                     </CardContent>
//                 </Card>
//             </main>
//         )
//     }

//     return (
//         <main className="min-h-screen p-4 md:p-8">
//             <div className="max-w-7xl mx-auto">
//                 <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                     {/* Order Summary */}
//                     <div>
//                         <Card>
//                             <CardHeader>
//                                 <CardTitle>Order Summary</CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                                 <div className="space-y-4">
//                                     {cartItems.map((item) => (
//                                         <div key={item._id} className="flex justify-between items-center">
//                                             <div className="flex items-center space-x-4">
//                                                 <div className="w-12 h-12 rounded-md overflow-hidden">
//                                                     {item.image && (
//                                                         <img
//                                                             src={item.image || "/placeholder.svg"}
//                                                             alt={item.name}
//                                                             className="w-full h-full object-cover"
//                                                         />
//                                                     )}
//                                                 </div>
//                                                 <div>
//                                                     <p className="font-medium">{item.title}</p>
//                                                     <p className="text-sm text-zinc-400">Qty: {item.quantity}</p>
//                                                 </div>
//                                             </div>
//                                             <p className="font-bold">{Number.parseFloat(item.price) * item.quantity} Rs</p>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 <div className="mt-8">
//                                     <div>
//                                         <p className="text-xs text-zinc-400">*Order will be delivered in 3-5 business days</p>
//                                     </div>
//                                     <Separator className="my-2 bg-zinc-800" />
//                                     <div className="flex justify-between font-bold text-[#BA4374]">
//                                         <span>Total</span>
//                                         <span>{totalPrice} PKR</span>
//                                     </div>
//                                 </div>
//                             </CardContent>
//                         </Card>
//                     </div>

//                     {/* Checkout Form */}
//                     <div>
//                         <Card>
//                             <CardHeader>
//                                 <CardTitle>Delivery Information</CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                                 <form onSubmit={handleSubmit} className="space-y-6">
//                                     <div className="grid grid-cols-2 gap-4">
//                                         <div className="space-y-2">
//                                             <Label htmlFor="firstName">First Name</Label>
//                                             <Input
//                                                 id="firstName"
//                                                 name="firstName"
//                                                 value={user?.firstName || ""}
//                                                 disabled
//                                             />
//                                         </div>
//                                         <div className="space-y-2">
//                                             <Label htmlFor="lastName">Last Name</Label>
//                                             <Input
//                                                 id="lastName"
//                                                 name="lastName"
//                                                 value={user?.lastName || ""}
//                                                 disabled
//                                             />
//                                         </div>
//                                     </div>

//                                     <div className="space-y-2">
//                                         <Label htmlFor="address">Address*</Label>
//                                         <Textarea
//                                             id="address"
//                                             name="address"
//                                             value={form.address}
//                                             onChange={handleInputChange}
//                                             placeholder="Enter your full address"
//                                             required
//                                             className="min-h-[80px]"
//                                         />
//                                     </div>

//                                     <div className="grid grid-cols-2 gap-4">
//                                         <div className="space-y-2">
//                                             <Label htmlFor="city">City*</Label>
//                                             <Input
//                                                 id="city"
//                                                 name="city"
//                                                 value={form.city}
//                                                 onChange={handleInputChange}
//                                                 placeholder="City"
//                                                 required
//                                             />
//                                         </div>
//                                         <div className="space-y-2">
//                                             <Label htmlFor="postalCode">Postal Code</Label>
//                                             <Input
//                                                 id="postalCode"
//                                                 name="postalCode"
//                                                 value={form.postalCode}
//                                                 onChange={handleInputChange}
//                                                 placeholder="Postal Code"
//                                             />
//                                         </div>
//                                     </div>

//                                     <div className="space-y-2">
//                                         <Label htmlFor="phone">Phone Number*</Label>
//                                         <Input
//                                             id="phone"
//                                             name="contactNumber"
//                                             value={form.contactNumber}
//                                             onChange={handleInputChange}
//                                             placeholder="Enter your phone number"
//                                             required
//                                         />
//                                     </div>

//                                     <div className="space-y-3">
//                                         <Label>Payment Method</Label>
//                                         <RadioGroup
//                                             defaultValue="cash"
//                                             name="paymentMethod"
//                                             value="cash"
//                                             className="space-y-2"
//                                         >
//                                             <div className="flex items-center space-x-2 rounded-md border border-zinc-800 p-3">
//                                                 <RadioGroupItem value="cash" id="cash" />
//                                                 <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer">
//                                                     <Banknote className="h-5 w-5 text-[#BA4374]" />
//                                                     Cash on Delivery
//                                                 </Label>
//                                             </div>
//                                             <div className="flex items-center space-x-2 rounded-md border border-zinc-800 p-3">
//                                                 <RadioGroupItem value="card" id="card" />
//                                                 <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
//                                                     <CreditCard className="h-5 w-5 text-[#BA4374]" />
//                                                     Credit/Debit Card
//                                                 </Label>
//                                             </div>
//                                         </RadioGroup>
//                                     </div>

//                                     <Button
//                                         type="submit"
//                                         className="w-full bg-[#BA4374] hover:bg-[#a03964] text-white"
//                                         disabled={submitting}
//                                     >
//                                         {submitting ? (
//                                             <>
//                                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                                 Processing...
//                                             </>
//                                         ) : (
//                                             "Confirm Order"
//                                         )}
//                                     </Button>
//                                 </form>
//                             </CardContent>
//                         </Card>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     )
// }
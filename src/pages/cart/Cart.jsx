import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Link } from "react-router"

export default function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingItem, setUpdatingItem] = useState(null)

  useEffect(() => {
    fetchCart()
  }, [])

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

  const increaseQuantity = (itemId) => {
    try {
      setUpdatingItem(itemId)
      const updatedCart = cartItems.map(item => {
        if (item._id === itemId) {
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      })
      setCartItems(updatedCart)
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      toast.success("Item quantity increased")
    } catch (error) {
      console.error("Error increasing quantity:", error)
      toast.error("Failed to increase quantity")
    } finally {
      setUpdatingItem(null)
    }
  }

  const decreaseQuantity = (itemId) => {
    try {
      setUpdatingItem(itemId)
      const item = cartItems.find(item => item._id === itemId)
      if (item && item.quantity <= 1) {
        removeItemFromCart(itemId)
        return
      }
      
      const updatedCart = cartItems.map(item => {
        if (item._id === itemId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 }
        }
        return item
      })
      setCartItems(updatedCart)
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      toast.success("Item quantity decreased")
    } catch (error) {
      console.error("Error decreasing quantity:", error)
      toast.error("Failed to decrease quantity")
    } finally {
      setUpdatingItem(null)
    }
  }

  const removeItemFromCart = (itemId) => {
    try {
      setUpdatingItem(itemId)
      const updatedCart = cartItems.filter(item => item._id !== itemId)
      setCartItems(updatedCart)
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      toast.success("Item removed from cart")
    } catch (error) {
      console.error("Error removing item:", error)
      toast.error("Failed to remove item")
    } finally {
      setUpdatingItem(null)
    }
  }

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  )

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="mt-4">Loading cart...</p>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="max-w-4xl w-full">
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600 mb-3">Your cart is empty</p>
            <Link to="/menu" className="text-blue-500 hover:underline">
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <div className="divide-y">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-md">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-md"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => decreaseQuantity(item._id)}
                          disabled={updatingItem === item._id}
                        >
                          {updatingItem === item._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "-"
                          )}
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => increaseQuantity(item._id)}
                          disabled={updatingItem === item._id}
                        >
                          {updatingItem === item._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "+"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      {(parseFloat(item.price) * item.quantity)} Rs
                    </p>
                    <button
                      className="text-sm cursor-pointer text-red-500"
                      onClick={() => removeItemFromCart(item._id)}
                      disabled={updatingItem === item._id}
                    >
                      {updatingItem === item._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Remove"
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-gray-50">
              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span className="font-medium">{totalPrice}PKR</span>
              </div>
              <Link to="/checkout" className="w-full block mt-4 ms-auto bg-black text-white py-2 px-3 rounded-md text-center">Checkout</Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}









// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { apiService } from "@/lib/axios"
// import { toast } from "sonner"
// import { Loader2 } from "lucide-react"
// import { Link } from "react-router"
// import { baseURL } from "../../lib/utils"
// import useAuth from "@/hooks/useAuth"

// export default function Cart() {
//   const [cartItems, setCartItems] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [updatingItem, setUpdatingItem] = useState(null)
//   const { isAuthenticated } = useAuth()

//   useEffect(() => {
//     fetchCart()
//   }, [])

//   const fetchCart = async () => {
//     if (!isAuthenticated) {
//       setLoading(false)
//       return
//     }
//     try {
//       setLoading(true)
//       const response = await apiService.get("/cart/getUserCart")
//       setCartItems(response.data.data.items || [])
//     } catch (error) {
//       console.error("Error fetching cart:", error)
//       toast.error("Failed to load cart items")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const increaseQuantity = async (itemId) => {
//     try {
//       setUpdatingItem(itemId)
//       await apiService.put(`/cart/increment/${itemId}`, {})
//       await fetchCart()
//       toast.success("Item quantity increased")
//     } catch (error) {
//       console.error("Error increasing quantity:", error)
//       toast.error(error.response?.data?.message || "Failed to increase quantity")
//     } finally {
//       setUpdatingItem(null)
//     }
//   }

//   const decreaseQuantity = async (itemId) => {
//     try {
//       setUpdatingItem(itemId)
//       await apiService.put(`/cart/decrement/${itemId}`, {})
//       await fetchCart()
//       toast.success("Item quantity decreased")
//     } catch (error) {
//       console.error("Error decreasing quantity:", error)
//       toast.error(error.response?.data?.message || "Failed to decrease quantity")
//     } finally {
//       setUpdatingItem(null)
//     }
//   }

//   const removeItemFromCart = async (itemId) => {
//     try {
//       setUpdatingItem(itemId)
//       await fetch(`${baseURL}/cart/removeItem/${itemId}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
//         },
//       })
//       await fetchCart()
//       toast.success("Item removed from cart")
//     } catch (error) {
//       console.error("Error removing item:", error)
//       toast.error(error.response?.data?.message || "Failed to remove item")
//     } finally {
//       setUpdatingItem(null)
//     }
//   }

//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + parseFloat(item.price) * item.quantity,
//     0
//   )

//   if (loading) {
//     return (
//       <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
//         <Loader2 className="h-8 w-8 animate-spin" />
//         <p className="mt-4">Loading cart...</p>
//       </main>
//     )
//   }

//   return (
//     <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
//       <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
//       <div className="max-w-4xl w-full">
//         {cartItems.length === 0 ? (
//           <div className="text-center py-8">
//             <p className="text-lg text-gray-600 mb-3">Your cart is empty</p>
//             <Link to="/menu" className="text-blue-500 hover:underline">
//               Browse Menu
//             </Link>
//           </div>
//         ) : (
//           <div className="border rounded-lg overflow-hidden">
//             <div className="divide-y">
//               {cartItems.map((item) => (
//                 <div
//                   key={item._id}
//                   className="flex items-center justify-between p-4"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <div className="w-16 h-16 bg-gray-100 rounded-md">
//                       {item.image && (
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-full h-full object-cover rounded-md"
//                         />
//                       )}
//                     </div>
//                     <div>
//                       <h3 className="font-medium">{item.title}</h3>
//                       <div className="flex items-center gap-2 mt-2">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => decreaseQuantity(item._id)}
//                           disabled={updatingItem === item._id}
//                         >
//                           {updatingItem === item._id ? (
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                           ) : (
//                             "-"
//                           )}
//                         </Button>
//                         <span>{item.quantity}</span>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => increaseQuantity(item._id)}
//                           disabled={updatingItem === item._id}
//                         >
//                           {updatingItem === item._id ? (
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                           ) : (
//                             "+"
//                           )}
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-bold">
//                       {(parseFloat(item.price) * item.quantity)} Rs
//                     </p>
//                     <button
//                       className="text-sm cursor-pointer text-red-500"
//                       onClick={() => removeItemFromCart(item._id)}
//                       disabled={updatingItem === item._id}
//                     >
//                       {updatingItem === item._id ? (
//                         <Loader2 className="h-4 w-4 animate-spin" />
//                       ) : (
//                         "Remove"
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="p-4 bg-gray-50">
//               <div className="flex justify-between py-2">
//                 <span>Subtotal</span>
//                 <span className="font-medium">{totalPrice}PKR</span>
//               </div>
//               <Link to="/checkout" className="w-full block mt-4 ms-auto bg-black text-white py-2 px-3 rounded-md text-center">Checkout</Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </main>
//   )
// }

import { Button } from "@/components/ui/button"
import { useContext } from "react"
import { CartContext } from "@/contexts/CartContext"

export default function CartPage() {
  const {
    cartItems,
    totalPrice,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext)

  // console.log("price", totalPrice);
  const itemsInCart = cartItems.map((item) => item)
  console.log("Items in cart:", itemsInCart)
  

  const removeItemFromCart = (item) => {
    return () => {
      removeFromCart(item.id)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="max-w-4xl w-full">
        <div className="border rounded-lg overflow-hidden">
          <div className="divide-y">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-md" />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    {/* $ {(parseFloat(item.price) * item.quantity).toFixed(2)} */}
                    {item.price}
                  </p>
                  <button
                    className="text-sm cursor-pointer text-red-500"
                    onClick={removeItemFromCart(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-gray-50">
            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span className="font-medium">$ {totalPrice.toFixed(2)}</span>
            </div>
            <Button className="w-full mt-4">Checkout</Button>
          </div>
        </div>
      </div>
    </main>
  )
}








// import { Button } from "@/components/ui/button"
// import { useContext } from "react"
// import { CartContext } from "@/contexts/CartContext"

// export default function CartPage() {
//   const { cartItems, totalPrice, removeFromCart } = useContext(CartContext)
//   const removeItemFromCart = (item) => {
//     return () => {
//       removeFromCart(item.id)
//     }
//   }

//   return (
//     <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
//       <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
//       <div className="max-w-4xl w-full">
//         <div className="border rounded-lg overflow-hidden">
//           <div className="divide-y">
//             { cartItems.map((item, index) => (
//             <div 
//             key={index}
//             className="flex items-center justify-between p-4">
//             <div className="flex items-center space-x-4">
//               <div className="w-16 h-16 bg-gray-100 rounded-md"></div>
//               <div>
//                 <h3 className="font-medium">{item.name}</h3>
//               </div>
//             </div>
//             <div className="text-right">
//               <p className="font-bold">$ {item.price}</p>
//               <button className="text-sm cursor-pointer text-red-500"
//               onClick={ removeItemFromCart(item)}
//               >Remove</button>
//             </div>
//           </div>
//             ))}


//           </div>

//           <div className="p-4 bg-gray-50">
//             <div className="flex justify-between py-2">
//               <span>Subtotal</span>
//               <span className="font-medium">$ {totalPrice.toFixed(2)}</span>
//             </div>
//             <Button className="w-full mt-4">Checkout</Button>
//           </div>
//         </div>
//       </div>
//     </main>
//   )
// }
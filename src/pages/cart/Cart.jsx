import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Product 1", price: "10.00", quantity: 1 },
    { id: 2, name: "Product 2", price: "20.00", quantity: 2 },
    { id: 3, name: "Product 3", price: "30.00", quantity: 3 },
  ])

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity < 10 ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
      )
    )
  }

  const removeItemFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  )

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
                    onClick={() => removeItemFromCart(item.id)}
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

import { Button } from "@/components/ui/button"

export default function CartPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="max-w-4xl w-full">
        <div className="border rounded-lg overflow-hidden">
          <div className="divide-y">
            {/* This would be mapped from cart items */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 rounded-md"></div>
                <div>
                  <h3 className="font-medium">Vanilla Dream</h3>
                  <p className="text-sm text-gray-500">Quantity: 1</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">£4.99</p>
                <button className="text-sm text-red-500">Remove</button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50">
            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span className="font-medium">£4.99</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Delivery</span>
              <span className="font-medium">£2.50</span>
            </div>
            <div className="flex justify-between py-2 font-bold">
              <span>Total</span>
              <span>£7.49</span>
            </div>
            <Button className="w-full mt-4">Checkout</Button>
          </div>
        </div>
      </div>
    </main>
  )
}


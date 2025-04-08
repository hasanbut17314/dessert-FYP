import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
const categories = [
  { id: "cakes", name: "Cakes" },
  { id: "milkshakes", name: "Milkshakes" },
  { id: "sundaes", name: "Sundaes" },
  { id: "galetos", name: "Galetos" },
];

const products = {
  cakes: [
    { id: 1, name: "Chocolate Cake", image: "/cakes/choc.png", price: "$5" },
    { id: 2, name: "Vanilla Cake", image: "/cakes/vanilla.png", price: "$4" },
    { id: 3, name: "Red Velvet", image: "/cakes/rv.png", price: "$6" },
    { id: 4, name: "Cheesecake", image: "/cakes/cheese.png", price: "$5.5" },
    { id: 5, name: "Carrot Cake", image: "/cakes/carrot.png", price: "$4.5" },
  ],
  milkshakes: [
    { id: 6, name: "Strawberry Shake", image: "/milkshakes/straw.png", price: "$3.5" },
    { id: 7, name: "Banana Shake", image: "/milkshakes/banana.png", price: "$3" },
    { id: 8, name: "Oreo Shake", image: "/milkshakes/oreo.png", price: "$4" },
    { id: 9, name: "Mango Shake", image: "/milkshakes/mango.png", price: "$3.5" },
    { id: 10, name: "Chocolate Shake", image: "/milkshakes/choco.png", price: "$4" },
  ],
  sundaes: [
    { id: 11, name: "Classic Sundae", image: "/sundaes/classic.png", price: "$4.5" },
    { id: 12, name: "Choco Sundae", image: "/sundaes/choco.png", price: "$5" },
    { id: 13, name: "Fruit Sundae", image: "/sundaes/fruit.png", price: "$4" },
    { id: 14, name: "Nutty Sundae", image: "/sundaes/nutty.png", price: "$5.5" },
    { id: 15, name: "Brownie Sundae", image: "/sundaes/brownie.png", price: "$6" },
  ],
  galetos: [
    { id: 16, name: "Classic Galeto", image: "/galetos/classic.png", price: "$4" },
    { id: 17, name: "Pistachio Galeto", image: "/galetos/pista.png", price: "$4.5" },
    { id: 18, name: "Chocolate Galeto", image: "/galetos/choco.png", price: "$4.5" },
    { id: 19, name: "Mango Galeto", image: "/galetos/mango.png", price: "$4" },
    { id: 20, name: "Berry Galeto", image: "/galetos/berry.png", price: "$4.5" },
  ],
};

export default function MenuPage() {

  const { setCartItems, setTotalPrice, cartItems, totalPrice, setTotalQuantity } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState("cakes");
  const itemsInCart = cartItems.map((item) => item.id);
  console.log("Items in cart:", itemsInCart);
  
  
  const [fetchedImages, setFetchedImages] = useState([]);

  const addToCart = (product) => {
    return () => {
      setCartItems((prev) => [...prev, product]);
      setTotalPrice((prev) => prev + parseFloat(product.price.slice(1)));
      setTotalQuantity((prev) => prev + 1);
      console.log("Total Price:", totalPrice);
    };
  }

  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then((res) => res.json())
      .then((data) => {
        const imgs = data.recipes.map((r) => r.image);
        setFetchedImages(imgs);
        // console.log("Fetched images:", imgs);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <section className="bg-[#f8f8f8] min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center text-[#BA4374] mb-10">Our Menu</h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`px-5 py-2 font-semibold rounded-full border-2 transition-all duration-200 ${
              selectedCategory === cat.id
                ? "bg-[#BA4374] text-white border-[#BA4374]"
                : "bg-white text-[#BA4374] border-[#BA4374]"
            }`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products[selectedCategory].map((product) => (
          <div key={product.id} className="bg-white rounded-xl p-4 shadow-md text-center">
            <img
              src={ fetchedImages[product.id] || "https://placehold.co/600x400"}
              alt={product.name}
              className="h-40 w-full object-contain mb-4"
            />
            <h3 className="text-xl font-semibold text-[#BA4374]">{product.name}</h3>
            <p className="text-gray-600 my-2">{product.price}</p>
            <button 
            disabled={itemsInCart.includes(product.id)}
            onClick={addToCart(product)}
            className={`mt-2 ${itemsInCart.includes(product.id) ? "opacity-50 pointer-events-none" : ""} bg-[#BA4374] hover:bg-[#a02f5b] text-white px-4 py-2 rounded-full text-sm font-medium`}>
              {itemsInCart.includes(product.id) ? "Added" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
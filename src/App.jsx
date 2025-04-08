import { BrowserRouter as Router, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Menu from "./pages/menu/Menu";
import Cart from "./pages/cart/Cart";
import ContactUs from "./pages/contact/ContactUs";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useState, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import { CartContext } from "./contexts/CartContext";
import Profile from "./pages/Profile";

function App() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const removeFromCart = (id) => {
	const removedItem = cartItems.find(item => item.id === id);
if (!removedItem) return;

const updatedCartItems = cartItems.filter(item => item.id !== id);
setCartItems(updatedCartItems);
setTotalPrice((prev) => prev - parseFloat(removedItem.price.slice(1)));
setTotalQuantity((prev) => prev - 1);

	// const updatedCartItems = cartItems.filter((item) => item.id !== id);
	// setCartItems(updatedCartItems);
	// console.log("Total Price:", totalPrice);
	// setTotalPrice((prev) => prev - cartItems.find(item => item.id === id).price);
	// console.log("Total Price:", totalPrice)
	// setTotalQuantity((prev) => prev - 1);
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } else {
      console.log("No user data found in local storage.");
    }
  }, []);

	const authRoutes = ["/login", "/register", "/profile"];
	return (
  <UserContext.Provider value={{ user, setUser }}>
		<CartContext.Provider value={{ cartItems, setCartItems, removeFromCart, totalPrice, setTotalPrice, totalQuantity, setTotalQuantity }}>
		<Router>
			{!authRoutes.includes(window.location.pathname) && <Navbar />}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/menu" element={<Menu />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/contact" element={<ContactUs />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
			<Footer />
		</Router>
		</CartContext.Provider>
  </UserContext.Provider>
	);
}

export default App;
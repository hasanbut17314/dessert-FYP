import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
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
import Profile from "./pages/Profile";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
//    console.log("Local Storage User name:", parsedUser.name); 
//      console.log("Local Storage User:", parsedUser);
      // setUser(parsedUser.name);
      setUser(parsedUser);
    } else {
      console.log("No user data found in local storage.");
    }
    // console.log("User:", user);
  }, []);


  // const [cartItems, setCartItems] = useState([]);
	const authRoutes = ["/login", "/register", "/profile"];
	return (
  <UserContext.Provider value={{ user, setUser }}>
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
				{/* <Route path="/profile" element={<Profile />} /> */}
			</Routes>
			<Footer />
		</Router>
  </UserContext.Provider>
	);
}

export default App;
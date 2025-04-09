import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router";
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

// import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import CartAdmin from "./pages/admin/Cart";
import Categories from "./pages/admin/Categories";
import Products from "./pages/admin/Products";
import Sidebar from "./pages/admin/Sidebar";

function App() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [admnin, setAdmin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
	  console.log(parsedUser.email);
		if(parsedUser.email === "admin@gmail.com"){
			setAdmin(true)
		}
    } else {
      console.log("No user data found in local storage.");
    }
  }, []);

  const removeFromCart = (id) => {
    const removedItem = cartItems.find((item) => item.id === id);
    if (!removedItem) return;

    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    setTotalPrice((prev) => prev - parseFloat(removedItem.price.replace("$", "")));
    setTotalQuantity((prev) => prev - 1);
  };

  const increaseQuantity = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    const updatedItem = cartItems.find((item) => item.id === id);
    setCartItems(updatedItems);
    setTotalPrice((prev) => prev + parseFloat(updatedItem.price.replace("$", "")));
    setTotalQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = (id) => {
    const updatedItem = cartItems.find((item) => item.id === id);
    if (!updatedItem || updatedItem.quantity <= 1) return;

    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedItems);
    setTotalPrice((prev) => prev - parseFloat(updatedItem.price.replace("$", "")));
    setTotalQuantity((prev) => prev - 1);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CartContext.Provider
        value={{
          cartItems,
          setCartItems,
          removeFromCart,
          totalPrice,
          setTotalPrice,
          totalQuantity,
          setTotalQuantity,
          increaseQuantity,
          decreaseQuantity,
        }}
      >
        <Router>
			{ admnin ? <AdminDashboard /> : <AppContent />}
        </Router>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

function AppContent() {
  const location = useLocation();
  const authRoutes = ["/login", "/register"];
  const isAuthRoute = authRoutes.includes(location.pathname);

  return (
    <>
      {!isAuthRoute && <Navbar />}
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
    </>
  );
}

function AdminDashboard() {
	  return (
			<div style={{ display: "flex" }}>
				<Sidebar />
				<div style={{ flex: 1, padding: "20px" }}>
				<Routes>
					<Route path="/" element={<Homeadmin />} />
					<Route path="/admin/users" element={<Users />} />
					<Route path="/admin/cart" element={<CartAdmin />} />
					<Route path="/admin/categories" element={<Categories />} />
					<Route path="/admin/products" element={<Products />} />
				</Routes>
			</div>
			</div>
			  );
			}

function Homeadmin() {
	  return (
			<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>

				<h1>Welcome to the Admin Dashboard</h1>
				<p>Select an option from the sidebar to manage the application.</p>
</div>
	  )}
				

export default App;






// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router";
// import Navbar from "./components/Navbar";
// import Home from "./pages/home/Home";
// import Menu from "./pages/menu/Menu";
// import Cart from "./pages/cart/Cart";
// import ContactUs from "./pages/contact/ContactUs";
// import Footer from "./components/Footer";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import { useState, useEffect } from "react";
// import { UserContext } from "./contexts/UserContext";
// import { CartContext } from "./contexts/CartContext";
// import Profile from "./pages/Profile";

// function App() {
//   const [user, setUser] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [totalQuantity, setTotalQuantity] = useState(0);

//   const removeFromCart = (id) => {
// 	const removedItem = cartItems.find(item => item.id === id);
// if (!removedItem) return;

// const updatedCartItems = cartItems.filter(item => item.id !== id);
// setCartItems(updatedCartItems);
// setTotalPrice(prev => prev - parseFloat(removedItem.price.replace('$', '')))
// setTotalQuantity((prev) => prev - 1);
//   }

//   const increaseQuantity = (id) => {
// 	const updatedItems = cartItems.map(item =>
// 	  item.id === id ? { ...item, quantity: item.quantity + 1 } : item
// 	);
// 	const updatedItem = cartItems.find(item => item.id === id);
// 	setCartItems(updatedItems);
// 	setTotalPrice(prev => prev + parseFloat(updatedItem.price.replace('$', '')))
// 	setTotalQuantity(prev => prev + 1);
//   };
  
//   const decreaseQuantity = (id) => {
// 	const updatedItem = cartItems.find(item => item.id === id);
// 	if (!updatedItem || updatedItem.quantity <= 1) return;
  
// 	const updatedItems = cartItems.map(item =>
// 	  item.id === id ? { ...item, quantity: item.quantity - 1 } : item
// 	);
// 	setCartItems(updatedItems);
// 	setTotalPrice(prev => prev - parseFloat(updatedItem.price.replace('$', '')))
// 	setTotalQuantity(prev => prev - 1);
//   };
  

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUser(parsedUser);
//     } else {
//       console.log("No user data found in local storage.");
//     }
//   }, []);

// 	const authRoutes = ["/login", "/register", "/profile"];
// 	const location = useLocation();
// 	const isAuthRoute = authRoutes.includes(location.pathname);
// 	return (
//   <UserContext.Provider value={{ user, setUser }}>
// <CartContext.Provider value={{
//   cartItems, setCartItems,
//   removeFromCart, totalPrice, setTotalPrice,
//   totalQuantity, setTotalQuantity,
//   increaseQuantity, decreaseQuantity
// }}>
// 		<Router>
// 			{/* {!authRoutes.includes(window.location.pathname) && <Navbar />} */}
// 			{!isAuthRoute && <Navbar />}
// 			<Routes>
// 				<Route path="/" element={<Home />} />
// 				<Route path="/menu" element={<Menu />} />
// 				<Route path="/cart" element={<Cart />} />
// 				<Route path="/contact" element={<ContactUs />} />
// 				<Route path="/login" element={<Login />} />
// 				<Route path="/register" element={<Register />} />
// 				<Route path="/profile" element={<Profile />} />
// 			</Routes>
// 			<Footer />
// 		</Router>
// 		</CartContext.Provider>
//   </UserContext.Provider>
// 	);
// }

// export default App;
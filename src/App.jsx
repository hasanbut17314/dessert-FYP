import { BrowserRouter as Router, Routes, Route, Link,  } from "react-router";
import Navbar from "./components/Navbar"
import Home from "./pages/home/Home"
import Menu from "./pages/menu/Menu"
import Cart from "./pages/cart/Cart"
import ContactUs from "./pages/contact/ContactUs";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {

  // const navigate = useNavigate();
  const authRoutes = [ "/login", "/register" ];
  return (
    <Router>
      { !authRoutes.includes(window.location.pathname) && <Navbar /> }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App
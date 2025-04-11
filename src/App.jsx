import { BrowserRouter as Router, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Menu from "./pages/menu/Menu";
import Cart from "./pages/cart/Cart";
import ContactUs from "./pages/contact/ContactUs";
import Footer from "./components/Footer";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/Profile";
import VerifyEmail from "./pages/auth/VerifyEmail";

import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Order";
import Categories from "./pages/admin/Categories";
import Products from "./pages/admin/Products";
import Sidebar from "./pages/admin/Sidebar";

import { Toaster } from "./components/ui/sonner";

function Routing() {
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
              <Footer />
            </>
          }
        />
        <Route
          path="/admin/*"
          element={
            <div style={{ display: "flex" }}>
              <div className="fixed w-56 bg-slate-800 text-white h-screen flex flex-col z-10">
                <Sidebar />
              </div>
              <div style={{ flex: 1, padding: "20px", marginLeft: "200px" }}>
                <Routes>
                  <Route path="users" element={<Users />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="categories" element={<Categories />} />
                  <Route path="products" element={<Products />} />
                </Routes>
              </div>
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="*" element={
          <h1 className="sm:text-5xl text-3xl font-semibold">404 Page Not Found</h1>
        } />
      </Routes>
    </Router>
  );
}

function App() {

  return (
    <>
      <Routing />
      <Toaster expand={true} />
    </>
  )
}

export default App;


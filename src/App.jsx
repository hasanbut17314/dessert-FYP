import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import Home from "./pages/home/Home";
import Menu from "./pages/menu/Menu";
import Cart from "./pages/cart/Cart";
import ContactUs from "./pages/contact/ContactUs";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/Profile";
import VerifyEmail from "./pages/auth/VerifyEmail";
import Checkout from "./pages/checkout/Checkout";
import UserOrders from "./pages/orders/Orders";

import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Order";
import Categories from "./pages/admin/Categories";
import Products from "./pages/admin/Products";
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/AdminDashboard";

import { Toaster } from "./components/ui/sonner";
import About from "./pages/about/About";
import { useEffect } from "react";
import Layout from "./layout/Layout";

function Routing() {
  useEffect(() => {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="cart" element={<Cart />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<About />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<UserOrders />} />
        </Route>

        <Route
          path="/admin/*"
          element={
            <div className="flex flex-col lg:flex-row min-h-screen bg-slate-100">
              <Sidebar />
              <div className="flex-1 transition-all duration-300 sm:p-4 lg:p-6 lg:ml-56">
                <Routes>
                  <Route path="/" element={<Navigate to="/admin/dashboard" />} />
                  <Route path="dashboard" element={<Dashboard />} />
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
  );
}

export default App;







// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
// import Navbar from "./components/Navbar";
// import Home from "./pages/home/Home";
// import Menu from "./pages/menu/Menu";
// import Cart from "./pages/cart/Cart";
// import ContactUs from "./pages/contact/ContactUs";
// import Footer from "./components/Footer";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Profile from "./pages/Profile";
// import VerifyEmail from "./pages/auth/VerifyEmail";
// import Checkout from "./pages/checkout/Checkout";
// import UserOrders from "./pages/orders/Orders";

// import Users from "./pages/admin/Users";
// import Orders from "./pages/admin/Order";
// import Categories from "./pages/admin/Categories";
// import Products from "./pages/admin/Products";
// import Sidebar from "./pages/admin/Sidebar";
// import Dashboard from "./pages/admin/AdminDashboard";

// import { Toaster } from "./components/ui/sonner";
// import About from "./pages/about/About";

// function Routing() {
//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/*"
//           element={
//             <>
//               <Navbar />
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/menu" element={<Menu />} />
//                 <Route path="/cart" element={<Cart />} />
//                 <Route path="/contact" element={<ContactUs />} />
//                 <Route path="/profile" element={<Profile />} />
//                 <Route path="/about" element={<About />} />
//                 <Route path="/checkout" element={<Checkout />} />
//                 <Route path="/orders" element={<UserOrders />} />
//               </Routes>
//               <Footer />
//             </>
//           }
//         />

//         <Route
//           path="/admin/*"
//           element={
//             <div className="flex flex-col lg:flex-row min-h-screen bg-slate-100">
//               <Sidebar />
//               <div className="flex-1 transition-all duration-300 sm:p-4 lg:p-6 lg:ml-56">
//                 <Routes>
//                   <Route path="/" element={<Navigate to="/admin/dashboard" />} />
//                   <Route path="dashboard" element={<Dashboard />} />
//                   <Route path="users" element={<Users />} />
//                   <Route path="orders" element={<Orders />} />
//                   <Route path="categories" element={<Categories />} />
//                   <Route path="products" element={<Products />} />
//                 </Routes>
//               </div>
//             </div>
//           }
//         />

//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/verify-email/:token" element={<VerifyEmail />} />
//         <Route path="*" element={
//           <h1 className="sm:text-5xl text-3xl font-semibold">404 Page Not Found</h1>
//         } />
//       </Routes>
//     </Router>
//   );
// }

// function App() {

//   return (
//     <>
//       <Routing />
//       <Toaster expand={true} />
//     </>
//   )
// }

// export default App;
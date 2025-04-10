import { Link, useLocation } from "react-router";
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { HomeIcon, UsersIcon, ShoppingCartIcon, LayersIcon, PackageIcon } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const menu = [
    // { path: "/admin/dashboard", label: "Dashboard", icon: <HomeIcon size={18} /> },
    { path: "/admin/users", label: "Users", icon: <UsersIcon size={18} /> },
    { path: "/admin/orders", label: "Orders", icon: <ShoppingCartIcon size={18} /> },
    { path: "/admin/categories", label: "Categories", icon: <LayersIcon size={18} /> },
    { path: "/admin/products", label: "Products", icon: <PackageIcon size={18} /> },
  ];

  return (
    <div className="w-56 bg-slate-800 text-white h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold py-4 px-2">Admin Panel</h2>
      </div>
      
      <NavigationMenu.Root orientation="vertical" className="w-full">
        <NavigationMenu.List className="flex flex-col space-y-1 w-full">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavigationMenu.Item key={item.path} className="w-full">
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md w-full transition-colors ${
                    isActive 
                      ? 'bg-green-600 text-white font-medium' 
                      : 'text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </NavigationMenu.Item>
            );
          })}
        </NavigationMenu.List>
      </NavigationMenu.Root>
      
      <div className="mt-auto pb-4 px-3">
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <div>
            <p className="text-slate-200">Admin User</p>
            <p>admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;



// import { Link, useLocation } from "react-router";

// const Sidebar = () => {
//   const location = useLocation();
//   const menu = [
//     { path: "/admin/users", label: "Users" },
//     { path: "/admin/cart", label: "Added to Cart" },
//     { path: "/admin/categories", label: "Categories" },
//     { path: "/admin/products", label: "Products" },
//   ];

//   return (
//     <div style={{
//       width: "200px",
//       background: "#222",
//       color: "#fff",
//       height: "100vh",
//       padding: "20px",
//       boxSizing: "border-box"
//     }}>
//       <h2 className="text-2xl font-bold my-8">Admin</h2>
//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {menu.map((item) => (
//           <li key={item.path} style={{ margin: "20px 0" }}>
//             <Link 
//               to={item.path} 
//               style={{ 
//                 color: location.pathname === item.path ? "#4CAF50" : "#fff", 
//                 textDecoration: "none" 
//               }}
//             >
//               {item.label}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
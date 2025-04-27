import { useState } from 'react';
import { Link, useLocation } from "react-router";
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { HomeIcon, UsersIcon, ShoppingCartIcon, LayersIcon, PackageIcon, MenuIcon, XIcon } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const menu = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <HomeIcon size={18} /> },
    { path: "/admin/users", label: "Users", icon: <UsersIcon size={18} /> },
    { path: "/admin/orders", label: "Orders", icon: <ShoppingCartIcon size={18} /> },
    { path: "/admin/categories", label: "Categories", icon: <LayersIcon size={18} /> },
    { path: "/admin/products", label: "Products", icon: <PackageIcon size={18} /> },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu toggle button - visible only on small screens */}
      <button
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-slate-700 text-white"
        onClick={toggleSidebar}
      >
        {isOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
      </button>

      {/* Overlay to capture clicks outside the sidebar on mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-10"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen bg-slate-800 text-white z-20
        transition-transform duration-300 ease-in-out
        lg:w-56 lg:translate-x-0 w-64
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 flex flex-col h-full">
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
                      className={`flex items-center gap-3 px-3 py-2 rounded-md w-full transition-colors ${isActive
                          ? 'bg-green-600 text-white font-medium'
                          : 'text-slate-200 hover:bg-slate-700'
                        }`}
                      onClick={() => setIsOpen(false)}
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
            <div className="flex flex-col items-center gap-2 text-sm text-slate-400">
              <p className="text-slate-200">{user?.firstName} {user?.lastName}</p>
              <p className='line-clamp-1'>{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
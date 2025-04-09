import { Link, useLocation } from "react-router";

const Sidebar = () => {
  const location = useLocation();
  const menu = [
    { path: "/admin/users", label: "Users" },
    { path: "/admin/cart", label: "Added to Cart" },
    { path: "/admin/categories", label: "Categories" },
    { path: "/admin/products", label: "Products" },
  ];

  return (
    <div style={{
      width: "200px",
      background: "#222",
      color: "#fff",
      height: "100vh",
      padding: "20px",
      boxSizing: "border-box"
    }}>
      <h2 className="text-2xl font-bold my-8">Admin</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {menu.map((item) => (
          <li key={item.path} style={{ margin: "20px 0" }}>
            <Link 
              to={item.path} 
              style={{ 
                color: location.pathname === item.path ? "#4CAF50" : "#fff", 
                textDecoration: "none" 
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

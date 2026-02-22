import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingCart, Package, Users, Settings } from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
  { name: "Orders", path: "/orders", icon: <ShoppingCart size={20} /> },
  // { name: "Products", path: "/products", icon: <Package size={20} /> },
  { name: "Profile", path: "/profile", icon: <Users size={20} /> },
  { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
      <div className="px-6 py-6 text-2xl font-bold text-blue-400">
        Merchant Admin
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
              location.pathname === item.path
                ? "bg-blue-600 text-white shadow-neon-blue"
                : "text-slate-300 hover:bg-slate-700 hover:text-blue-400"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

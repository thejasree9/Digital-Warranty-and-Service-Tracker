import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  LayoutDashboard,
  Package,
  ShieldCheck,
  Wrench,
  Bell,
  User,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <User size={20} />,
    },
    {
      name: "Products",
      path: "/products",
      icon: <Package size={20} />,
    },
    {
      name: "Warranty",
      path: "/warranty",
      icon: <ShieldCheck size={20} />,
    },
    {
  name: "Service History",
  path: "/services",
  icon: <Wrench size={20} />,
},
    {
      name: "Notifications",
      path: "/notifications",
      icon: <Bell size={20} />,
    },
  ];

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-60"
      } min-h-screen bg-slate-900 text-white transition-all duration-300 flex flex-col`}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-slate-700">
        {!collapsed && (
          <h1 className="text-xl font-bold flex items-center gap-2">
            <ShieldCheck className="text-blue-400" size={24} />
            <span>
              Warranty
              <span className="text-blue-400">Tracker</span>
            </span>
          </h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-slate-800 transition"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center ${
                collapsed ? "justify-center" : "gap-3"
              } px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            {item.icon}

            {!collapsed && (
              <span className="font-medium">
                {item.name}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={logout}
          className={`w-full flex items-center ${
            collapsed ? "justify-center" : "justify-center gap-3"
          } px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition`}
        >
          <LogOut size={20} />

          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
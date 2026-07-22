import {
  Bell,
  Search,
  Moon,
  Sun,
  UserCircle,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown"; 
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);
  const { user } = useAuth();
  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target)
    ) {
      setShowProfileMenu(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
  
  return (
    <header className="bg-white dark:bg-slate-900 dark:text-white border-b border-gray-200 dark:border-slate-700 shadow-sm px-6 py-4 flex items-center justify-between">

      {/* Search Bar */}

      <div className="flex items-center bg-gray-100 dark:bg-slate-800 rounded-xl px-4 py-2 w-full max-w-md">

        <Search className="text-gray-400" size={18} />

        <input
          type="text"
          placeholder="Search products, warranty,services..."
          className="bg-transparent outline-none px-3 w-full"
        />

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-5">

        {/* Notification */}

        <button className="relative p-2 rounded-xl hover:bg-gray-100 transition">

          <Bell size={22} />

          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>

        </button>

        {/* Dark Mode */}

        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl hover:bg-gray-100 transition"
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>

       {/* User */}

<div className="relative" ref={profileRef}>
  <button
    onClick={() => setShowProfileMenu(!showProfileMenu)}
    className="flex items-center gap-3 hover:bg-gray-100 rounded-xl px-3 py-2 transition"
  >
    <UserCircle
      size={40}
      className="text-blue-600"
    />

    <div className="hidden md:block text-left">
      <h3 className="font-semibold text-slate-800">
        {user?.name || "User"}
      </h3>

      <p className="text-xs text-gray-500">
        {user?.role || "USER"}
      </p>
    </div>
  </button>

  {showProfileMenu && (
    <ProfileDropdown
  user={user}
  onClose={() => setShowProfileMenu(false)}
/>
  )}
</div>

      </div>

    </header>
  );
};

export default Navbar;
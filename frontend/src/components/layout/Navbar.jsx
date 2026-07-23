import {
  Bell,
  Search,
  Moon,
  Sun,
  UserCircle,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";
import { useTheme } from "../../context/ThemeContext";
import NotificationDropdown from "./NotificationDropdown";
import { getUnreadCount } from "../../services/notificationService";


const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const [search, setSearch] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const profileRef = useRef(null);
const searchRef = useRef(null);

  const routes = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Profile", path: "/profile" },
  { name: "Products", path: "/products" },
  { name: "Warranty", path: "/warranty" },
  { name: "Service History", path: "/services" },
  { name: "Notifications", path: "/notifications" },
];

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target)
    ) {
      setShowProfileMenu(false);
      setShowNotifications(false);
    }

    if (
      searchRef.current &&
      !searchRef.current.contains(event.target)
    ) {
      setShowSuggestions(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () =>
    document.removeEventListener("mousedown", handleClickOutside);
}, []);

  useEffect(() => {
    loadUnreadCount();

    const interval = setInterval(loadUnreadCount, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadUnreadCount = async () => {
    try {
      const data = await getUnreadCount();
      setUnreadCount(data.count);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredRoutes([]);
      return;
    }

    const filtered = routes.filter((route) =>
      route.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredRoutes(filtered);
    setShowSuggestions(true);
  }, [search]);

  const handleSearch = (e) => {
    if (e.key !== "Enter") return;

    if (filteredRoutes.length > 0) {
      navigate(filteredRoutes[0].path);
      setSearch("");
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (route) => {
  navigate(route.path);
  setSearch("");
  setFilteredRoutes([]);
  setShowSuggestions(false);
};
  
  return (
    <header className="bg-white dark:bg-slate-900 dark:text-white border-b border-gray-200 dark:border-slate-700 shadow-sm px-6 py-4 flex items-center justify-between">

      {/* Search Bar */}

      <div
  className="relative w-full max-w-md"
  ref={searchRef}
>
  <Search
    className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${
      darkMode ? "text-gray-400" : "text-gray-500"
    }`}
  />

  <input
    type="text"
    placeholder="Search pages..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    onKeyDown={handleSearch}
    onFocus={() => {
      if (filteredRoutes.length > 0) {
        setShowSuggestions(true);
      }
    }}
    className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2
      ${
        darkMode
          ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500"
          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
      }`}
  />

  {showSuggestions && filteredRoutes.length > 0 && (
    <div
      className={`absolute mt-2 w-full rounded-lg shadow-lg border z-50 overflow-hidden ${
        darkMode
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      }`}
    >
      {filteredRoutes.map((route) => (
        <button
  key={route.path}
  onMouseDown={() => handleSuggestionClick(route)}
          className={`w-full text-left px-4 py-3 transition-colors ${
            darkMode
              ? "hover:bg-gray-700 text-white"
              : "hover:bg-gray-100 text-gray-900"
          }`}
        >
          {route.name}
        </button>
      ))}
    </div>
  )}
</div>

      {/* Right Side */}

      <div className="flex items-center gap-5 relative" ref={profileRef}>


        {/* Notification */}

<div className="relative">

  <button
    onClick={() => setShowNotifications(!showNotifications)}
    className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition"
  >
    <Bell size={22} />

    {unreadCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full min-w-[18px] h-[18px] text-[10px] flex items-center justify-center">
        {unreadCount}
      </span>
    )}
  </button>

  {showNotifications && (
    <NotificationDropdown
      setUnreadCount={setUnreadCount}
      onClose={() => setShowNotifications(false)}
    />
  )}

</div>

        {/* Dark Mode */}

        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition"
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>

       {/* User */}

<div className="relative">
  <button
    onClick={() => setShowProfileMenu(!showProfileMenu)}
    className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl px-3 py-2 transition"
  >
    <UserCircle
      size={40}
      className="text-blue-600"
    />

    <div className="hidden md:block text-left">
      <h3 className="font-semibold text-slate-800 dark:text-white">
        {user?.name || "User"}
      </h3>

      <p className="text-xs text-gray-500 dark:text-slate-400">
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
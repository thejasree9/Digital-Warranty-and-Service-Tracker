import {
  Bell,
  Search,
  Moon,
  Sun,
  UserCircle,
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between">

      {/* Search Bar */}

      <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 w-full max-w-md">

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
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl hover:bg-gray-100 transition"
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        {/* User */}

        <button className="flex items-center gap-3 hover:bg-gray-100 rounded-xl px-3 py-2 transition">

          <UserCircle
            size={40}
            className="text-blue-600"
          />

          <div className="hidden md:block text-left">

            <h3 className="font-semibold text-slate-800">
              Sneha
            </h3>

            <p className="text-xs text-gray-500">
              Administrator
            </p>

          </div>

        </button>

      </div>

    </header>
  );
};

export default Navbar;
import { User, Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProfileDropdown = ({ user, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
  onClose();
  logout();
  navigate("/login");
};

  return (
    <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 z-50 transition-colors duration-300">
      <div className="p-4 border-b border-gray-200 dark:border-slate-700">
        <h3 className="font-semibold text-gray-800 dark:text-white">{user?.name}</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400">{user?.role}</p>
      </div>

      <button
        onClick={() => {
  onClose();
  navigate("/profile");
}}
        className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 transition"
      >
        <User size={18} />
        My Profile
      </button>

      <button
        onClick={() => {
  onClose();
  navigate("/notifications");
}}
       className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 transition"
      >
        <Bell size={18} />
        Notifications
      </button>


      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-b-xl transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
};

export default ProfileDropdown;
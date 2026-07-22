import { User, Bell, Lock, LogOut } from "lucide-react";
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
    <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-gray-800">{user?.name}</h3>
        <p className="text-sm text-gray-500">{user?.role}</p>
      </div>

      <button
        onClick={() => {
  onClose();
  navigate("/profile");
}}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
      >
        <User size={18} />
        My Profile
      </button>

      <button
        onClick={() => {
  onClose();
  navigate("/notifications");
}}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
      >
        <Bell size={18} />
        Notifications
      </button>

      <button
        onClick={() => {
  onClose();
  navigate("/change-password");
}}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
      >
        <Lock size={18} />
        Change Password
      </button>

      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-b-xl"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
};

export default ProfileDropdown;
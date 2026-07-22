import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit,
  Save,
  X,
  Lock,
  Eye,
  EyeOff,
  Package,
  ShieldCheck,
  Wrench,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getProfile,
  updateProfile,
  changePassword,
} from "../../services/profileService";

import { getDashboard } from "../../services/dashboardService";

const Profile = () => {

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState(null);

  const [dashboard, setDashboard] = useState(null);

  const [editing, setEditing] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const [profileResponse, dashboardResponse] =
        await Promise.all([
          getProfile(),
          getDashboard(),
        ]);

      setProfile(profileResponse);

      setDashboard(dashboardResponse.data);

      setFormData({
        name: profileResponse.name || "",
        phone: profileResponse.phone || "",
      });

    } catch (error) {

      console.error(error);

      toast.error("Unable to load profile");

    } finally {

      setLoading(false);

    }

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSave = async () => {

    try {

      const updatedProfile =
        await updateProfile(formData);

      setProfile(updatedProfile);

      setEditing(false);

      toast.success("Profile updated successfully");

    } catch (error) {

      console.error(error);

      toast.error("Unable to update profile");

    }

  };

  const handleCancel = () => {

    setEditing(false);

    setFormData({
      name: profile.name,
      phone: profile.phone,
    });

  };

  const handlePasswordInput = (e) => {

    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });

  };

  const handleChangePassword = async () => {

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {

      toast.error("Passwords do not match");

      return;

    }

    try {

      await changePassword(passwordData);

      toast.success("Password changed successfully");

      setShowPasswordModal(false);

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Unable to change password"
      );

    }

  };

  if (loading) {

    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">
          Loading Profile...
        </h2>
      </div>
    );

  }
  return (
  <div className="space-y-8">

    {/* Header */}

    <div className="flex items-center justify-between">

      <div>
        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="text-gray-500 mt-2">
          View and manage your account.
        </p>
      </div>

      {!editing ? (

        <button
          onClick={() => setEditing(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
        >
          <Edit size={18} />
          Edit Profile
        </button>

      ) : (

        <div className="flex gap-3">

          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
          >
            <Save size={18} />
            Save
          </button>

          <button
            onClick={handleCancel}
            className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-5 py-3 rounded-xl"
          >
            <X size={18} />
            Cancel
          </button>

        </div>

      )}

    </div>

    {/* Profile Card */}

    <div className="bg-white rounded-2xl shadow-md p-8">

      <div className="flex flex-col md:flex-row items-center gap-8">

        <img
          src={
            profile.profileImage ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              profile.name
            )}&background=2563eb&color=fff&size=200`
          }
          alt="Profile"
          className="w-36 h-36 rounded-full border-4 border-blue-500 object-cover"
        />

        <div className="flex-1">

          {editing ? (

            <div className="space-y-5">

              <div>

                <label className="block font-semibold mb-2">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />

              </div>

              <div>

                <label className="block font-semibold mb-2">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />

              </div>

            </div>

          ) : (

            <>

              <h2 className="text-3xl font-bold">
                {profile.name}
              </h2>

              <p className="text-gray-500 mt-2">
                {profile.email}
              </p>

              <div className="mt-5">

                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">

                  Joined {" "}
                  {new Date(profile.createdAt).toLocaleDateString()}

                </span>

              </div>

            </>

          )}

        </div>

        <button
          onClick={() => setShowPasswordModal(true)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl"
        >
          <Lock size={18} />
          Change Password
        </button>

      </div>

    </div>

    {/* Personal Information */}

    <div className="bg-white rounded-2xl shadow-md p-8">

      <h2 className="text-2xl font-bold mb-6">
        Personal Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="flex items-center gap-4">

          <User className="text-blue-600"/>

          <div>

            <p className="text-gray-500 text-sm">
              Name
            </p>

            <h3 className="font-semibold">
              {profile.name}
            </h3>

          </div>

        </div>

        <div className="flex items-center gap-4">

          <Mail className="text-green-600"/>

          <div>

            <p className="text-gray-500 text-sm">
              Email
            </p>

            <h3 className="font-semibold">
              {profile.email}
            </h3>

          </div>

        </div>

        <div className="flex items-center gap-4">

          <Phone className="text-orange-600"/>

          <div>

            <p className="text-gray-500 text-sm">
              Phone
            </p>

            <h3 className="font-semibold">
              {profile.phone || "Not Available"}
            </h3>

          </div>

        </div>

        <div className="flex items-center gap-4">

          <Calendar className="text-red-500"/>

          <div>

            <p className="text-gray-500 text-sm">
              Joined Date
            </p>

            <h3 className="font-semibold">
              {new Date(profile.createdAt).toLocaleDateString()}
            </h3>

          </div>

        </div>

      </div>

    </div>
        {/* Statistics */}

    <div className="bg-white rounded-2xl shadow-md p-8">

      <h2 className="text-2xl font-bold mb-6">
        Statistics
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Products */}

        <div className="bg-blue-50 rounded-2xl p-6 text-center hover:shadow-lg transition">

          <Package
            className="mx-auto text-blue-600 mb-3"
            size={34}
          />

          <h2 className="text-3xl font-bold text-blue-600">
            {dashboard?.totalProducts ?? 0}
          </h2>

          <p className="text-gray-600 mt-2">
            Products
          </p>

        </div>

        {/* Active Warranty */}

        <div className="bg-green-50 rounded-2xl p-6 text-center hover:shadow-lg transition">

          <ShieldCheck
            className="mx-auto text-green-600 mb-3"
            size={34}
          />

          <h2 className="text-3xl font-bold text-green-600">
            {dashboard?.activeWarranties ?? 0}
          </h2>

          <p className="text-gray-600 mt-2">
            Active Warranty
          </p>

        </div>

        {/* Services */}

        <div className="bg-orange-50 rounded-2xl p-6 text-center hover:shadow-lg transition">

          <Wrench
            className="mx-auto text-orange-600 mb-3"
            size={34}
          />

          <h2 className="text-3xl font-bold text-orange-600">
            {dashboard?.totalServices ?? 0}
          </h2>

          <p className="text-gray-600 mt-2">
            Services
          </p>

        </div>

        {/* Expiring Soon */}

        <div className="bg-red-50 rounded-2xl p-6 text-center hover:shadow-lg transition">

          <AlertTriangle
            className="mx-auto text-red-600 mb-3"
            size={34}
          />

          <h2 className="text-3xl font-bold text-red-600">
            {dashboard?.expiringSoon ?? 0}
          </h2>

          <p className="text-gray-600 mt-2">
            Expiring Soon
          </p>

        </div>

      </div>

    </div>
        {/* Change Password Modal */}

    {showPasswordModal && (

      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold">
              Change Password
            </h2>

            <button
              onClick={() => {
                setShowPasswordModal(false);

                setPasswordData({
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                });
              }}
            >
              <X className="text-gray-500 hover:text-red-500"/>
            </button>

          </div>

          <div className="space-y-5">

            {/* Current Password */}

            <div>

              <label className="block font-semibold mb-2">
                Current Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordInput}
                  className="w-full border rounded-xl p-3 pr-12"
                  placeholder="Enter current password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? (
                    <EyeOff size={20}/>
                  ) : (
                    <Eye size={20}/>
                  )}
                </button>

              </div>

            </div>

            {/* New Password */}

            <div>

              <label className="block font-semibold mb-2">
                New Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordInput}
                className="w-full border rounded-xl p-3"
                placeholder="Enter new password"
              />

            </div>

            {/* Confirm Password */}

            <div>

              <label className="block font-semibold mb-2">
                Confirm Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordInput}
                className="w-full border rounded-xl p-3"
                placeholder="Confirm new password"
              />

            </div>

          </div>

          <div className="flex justify-end gap-4 mt-8">

            <button
              onClick={() => {
                setShowPasswordModal(false);

                setPasswordData({
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                });
              }}
              className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={handleChangePassword}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              Change Password
            </button>

          </div>

        </div>

      </div>

    )}

  </div>

);

};

export default Profile;
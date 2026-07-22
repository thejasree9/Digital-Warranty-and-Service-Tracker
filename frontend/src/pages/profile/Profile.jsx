import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Calendar,
  Edit,
  Lock,
  Save,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getProfile,
  updateProfile,
  changePassword,
} from "../../services/profileService";

const Profile = () => {

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    profileImage: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();

      setProfile(data);

      setFormData({
        name: data.name || "",
        phone: data.phone || "",
        profileImage: data.profileImage || "",
      });

    } catch (err) {
      console.error(err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };
const [showPasswordModal, setShowPasswordModal] = useState(false);

const [passwordData, setPasswordData] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {

      const updated = await updateProfile(formData);

      setProfile(updated);

      setEditing(false);

      toast.success("Profile Updated Successfully");

    } catch (err) {
      console.error(err);
      toast.error("Update Failed");
    }
  };

  const handlePasswordChange = (e) => {
  setPasswordData({
    ...passwordData,
    [e.target.name]: e.target.value,
  });
};
const handleChangePassword = async () => {

  if (passwordData.newPassword !== passwordData.confirmPassword) {
    toast.error("New password and Confirm password do not match");
    return;
  }

  try {

    await changePassword(passwordData);

    toast.success("Password changed successfully!");

    setShowPasswordModal(false);

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Failed to change password"
    );

  }

};
  const handleCancel = () => {

    setEditing(false);

    setFormData({
      name: profile.name,
      phone: profile.phone,
      profileImage: profile.profileImage,
    });

  };

  if (loading) {

    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading Profile...
      </div>
    );

  }

  return (

    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your personal information.
        </p>

      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Left Card */}

        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">

          <img
                src={
                    profile?.profileImage ||
                    `https://ui-avatars.com/api/?name=${profile?.name}`
                }
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-blue-600"
                />

          {!editing ? (

            <>

              <h2 className="text-2xl font-bold mt-4">
                {profile?.name}
              </h2>

              <p className="text-gray-500">
                {profile?.role}
              </p>

            </>

          ) : (

            <div className="space-y-3 w-full mt-5">

  <input
    type="text"
    className="w-full border rounded-xl p-3"
    name="name"
    value={formData.name}
    onChange={handleChange}
    placeholder="Enter full name"
  />

  <input
    type="text"
    className="w-full border rounded-xl p-3"
    name="phone"
    value={formData.phone}
    onChange={handleChange}
    placeholder="Enter phone number"
  />
</div>

          )}

          <div className="flex gap-3 mt-6">

            {!editing ? (

              <>

                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl"
                >
                  <Edit size={18}/>
                  Edit
                </button>

              <button
  onClick={() => setShowPasswordModal(true)}
  className="flex items-center gap-2 border px-5 py-2 rounded-xl hover:bg-gray-100"
>
  <Lock size={18} />
  Password
</button>
              </>

            ) : (

              <>

                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-xl"
                >
                  <Save size={18}/>
                  Save
                </button>

                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-gray-600 text-white px-5 py-2 rounded-xl"
                >
                  <X size={18}/>
                  Cancel
                </button>

              </>

            )}

          </div>

        </div>
                {/* Personal Information */}

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-xl font-bold mb-6">
            Personal Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="flex items-center gap-3">
              <User className="text-blue-600" />
              <div>
                <p className="text-gray-500 text-sm">Full Name</p>
                <p className="font-semibold">{profile?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="text-blue-600" />
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-semibold">{profile?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-blue-600" />
              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <p className="font-semibold">
                  {profile?.phone || "Not Available"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="text-blue-600" />
              <div>
                <p className="text-gray-500 text-sm">Role</p>
                <p className="font-semibold">{profile?.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="text-blue-600" />
              <div>
                <p className="text-gray-500 text-sm">Joined</p>
                <p className="font-semibold">
                  {profile?.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString()
                    : "-"}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h3 className="text-3xl font-bold text-blue-600">
            58
          </h3>
          <p className="text-gray-500 mt-2">
            Products
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h3 className="text-3xl font-bold text-green-600">
            43
          </h3>
          <p className="text-gray-500 mt-2">
            Active Warranty
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h3 className="text-3xl font-bold text-orange-500">
            12
          </h3>
          <p className="text-gray-500 mt-2">
            Services
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h3 className="text-3xl font-bold text-red-500">
            5
          </h3>
          <p className="text-gray-500 mt-2">
            Alerts
          </p>
        </div>

      </div>

      {/* Recent Activity */}

      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-xl font-bold mb-5">
          Recent Activity
        </h2>

        <div className="space-y-4">

          <div className="border-l-4 border-blue-600 pl-4">
            Added Dell Laptop
          </div>

          <div className="border-l-4 border-green-600 pl-4">
            Samsung TV Warranty Updated
          </div>

          <div className="border-l-4 border-orange-500 pl-4">
            Washing Machine Service Scheduled
          </div>

          <div className="border-l-4 border-red-500 pl-4">
            HP Printer Warranty Expired
          </div>

        </div>

      </div>
      {showPasswordModal && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

<div className="bg-white rounded-xl p-6 w-[420px]">

<h2 className="text-xl font-bold mb-5">
Change Password
</h2>

<input
type="password"
name="currentPassword"
placeholder="Current Password"
value={passwordData.currentPassword}
onChange={handlePasswordChange}
className="w-full border rounded-lg p-3 mb-4"
/>

<input
type="password"
name="newPassword"
placeholder="New Password"
value={passwordData.newPassword}
onChange={handlePasswordChange}
className="w-full border rounded-lg p-3 mb-4"
/>

<input
type="password"
name="confirmPassword"
placeholder="Confirm Password"
value={passwordData.confirmPassword}
onChange={handlePasswordChange}
className="w-full border rounded-lg p-3 mb-6"
/>

<div className="flex justify-end gap-3">

<button
onClick={() => setShowPasswordModal(false)}
className="px-5 py-2 rounded-lg border"
>
Cancel
</button>

<button
onClick={handleChangePassword}
className="px-5 py-2 rounded-lg bg-blue-600 text-white"
>
Update Password
</button>

</div>

</div>

</div>

)}

    </div>
  );
};

export default Profile;
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Calendar,
  Edit,
  Lock,
  Package,
  Wrench,
  Bell,
} from "lucide-react";

const Profile = () => {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          My Profile
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your personal information and account settings.
        </p>
      </div>

      {/* Top Section */}

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Profile Card */}

        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">

          <img
            src="https://ui-avatars.com/api/?name=Sneha+Vanka&background=2563EB&color=fff&size=200"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-600"
          />

          <h2 className="text-2xl font-bold mt-4">
            Sneha Vanka
          </h2>

          <p className="text-gray-500">
            Administrator
          </p>

          <div className="flex gap-4 mt-6">

            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl">

              <Edit size={18} />

              Edit Profile

            </button>

            <button className="flex items-center gap-2 border px-5 py-2 rounded-xl hover:bg-gray-100">

              <Lock size={18} />

              Password

            </button>

          </div>

        </div>

        {/* Information */}

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-xl font-bold mb-6">
            Personal Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="flex items-center gap-3">

              <User className="text-blue-600" />

              <div>

                <p className="text-gray-500 text-sm">
                  Full Name
                </p>

                <p className="font-semibold">
                  Sneha Vanka
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <Mail className="text-blue-600" />

              <div>

                <p className="text-gray-500 text-sm">
                  Email
                </p>

                <p className="font-semibold">
                  sneha@gmail.com
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <Phone className="text-blue-600" />

              <div>

                <p className="text-gray-500 text-sm">
                  Phone
                </p>

                <p className="font-semibold">
                  +91 98765 43210
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <ShieldCheck className="text-blue-600" />

              <div>

                <p className="text-gray-500 text-sm">
                  Role
                </p>

                <p className="font-semibold">
                  Administrator
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <Calendar className="text-blue-600" />

              <div>

                <p className="text-gray-500 text-sm">
                  Joined
                </p>

                <p className="font-semibold">
                  22 July 2026
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white shadow-md rounded-2xl p-6 text-center">

          <Package
            size={36}
            className="mx-auto text-blue-600"
          />

          <h2 className="text-3xl font-bold mt-3">
            58
          </h2>

          <p className="text-gray-500">
            Products
          </p>

        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 text-center">

          <ShieldCheck
            size={36}
            className="mx-auto text-green-600"
          />

          <h2 className="text-3xl font-bold mt-3">
            43
          </h2>

          <p className="text-gray-500">
            Active Warranty
          </p>

        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 text-center">

          <Wrench
            size={36}
            className="mx-auto text-orange-500"
          />

          <h2 className="text-3xl font-bold mt-3">
            12
          </h2>

          <p className="text-gray-500">
            Services
          </p>

        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 text-center">

          <Bell
            size={36}
            className="mx-auto text-red-500"
          />

          <h2 className="text-3xl font-bold mt-3">
            5
          </h2>

          <p className="text-gray-500">
            Alerts
          </p>

        </div>

      </div>

      {/* Recent Activity */}

      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-xl font-bold mb-5">
          Recent Activity
        </h2>

        <ul className="space-y-4">

          <li className="border-l-4 border-blue-600 pl-4">
            Added Dell Laptop.
          </li>

          <li className="border-l-4 border-green-600 pl-4">
            Updated Samsung TV Warranty.
          </li>

          <li className="border-l-4 border-orange-500 pl-4">
            Scheduled Washing Machine Service.
          </li>

          <li className="border-l-4 border-red-500 pl-4">
            Warranty expired for HP Printer.
          </li>

        </ul>

      </div>

    </div>
  );
};

export default Profile;
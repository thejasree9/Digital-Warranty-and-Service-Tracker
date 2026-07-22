import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login as loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    try {

      setLoading(true);

      const response = await loginUser(data);

      login({
        token: response.data.token,
        user: response.data.user,
      });

      toast.success("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Invalid Email or Password"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="
      min-h-screen
      overflow-hidden
      bg-gradient-to-br
      from-blue-700
      via-indigo-700
      to-purple-700
      flex
      items-center
      justify-center
      px-6
      relative
    "
    >

      {/* Background Blur */}

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-32 -right-32 w-[450px] h-[450px] bg-pink-500/20 rounded-full blur-3xl"></div>

      <div className="absolute top-20 right-20 w-44 h-44 bg-cyan-400/20 rounded-full blur-3xl"></div>

      {/* Content */}

      <div className="relative z-10 w-full max-w-sm">

        {/* Logo */}

        <div className="text-center mb-6">

          <div
            className="
              inline-flex
              items-center
              justify-center
              w-16
              h-16
              rounded-2xl
              bg-white
              shadow-xl
              mb-4
            "
          >

            <ShieldCheck
              size={32}
              className="text-blue-600"
            />

          </div>

          <h1 className="text-3xl font-bold text-white">

            WarrantyTracker

          </h1>

          <p className="text-blue-100 mt-2 text-base">

            Digital Warranty & Service Tracker

          </p>

        </div>

        {/* Login Card */}

        <div
          className="
            bg-white/95
            backdrop-blur-xl
            rounded-3xl
            shadow-[0_20px_60px_rgba(0,0,0,0.25)]
            border
            border-white/20
            p-6
          "
        >

          <div className="text-center mb-6">

            <h2 className="text-2xl font-bold text-slate-800">

              Welcome Back

            </h2>

            <p className="text-gray-500 text-sm mt-2">

              Login to continue

            </p>

          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
                        {/* Email */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  className="
                    w-full
                    pl-11
                    pr-4
                    py-2.5
                    rounded-xl
                    border
                    border-gray-300
                    bg-gray-50
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                    outline-none
                    transition-all
                  "
                />

              </div>

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}

            </div>

            {/* Password */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="
                    w-full
                    pl-11
                    pr-11
                    py-2.5
                    rounded-xl
                    border
                    border-gray-300
                    bg-gray-50
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                    outline-none
                    transition-all
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}

            </div>

            {/* Remember Me */}

            <div className="flex items-center justify-between text-sm">

              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">

                <input
                  type="checkbox"
                  className="accent-blue-600"
                />

                Remember me

              </label>

              <Link
                to="/forgot-password"
                className="text-blue-600 hover:underline font-medium"
              >
                Forgot Password?
              </Link>

            </div>

            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                py-2.5
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                via-indigo-600
                to-purple-600
                text-white
                font-semibold
                hover:shadow-xl
                hover:scale-[1.02]
                transition-all
                duration-300
              "
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            

            {/* Register Button */}


                      </form>

          {/* Bottom Text */}

         <div className="mt-6 text-center">

  <p className="text-sm text-gray-600">

    Don't have an account?

    <Link
      to="/register"
      className="ml-2 text-blue-600 font-semibold hover:underline"
    >
      Create one
    </Link>

  </p>

</div>
        </div>

        {/* Footer */}

        <div className="mt-5 text-center">

          <p className="text-white font-semibold text-base">
            Digital Warranty & Service Tracker
          </p>

          <p className="text-blue-100 text-sm mt-1">
            Securely manage your products,
            warranties and service history.
          </p>

          <p className="text-blue-200 text-xs mt-3">
            © {new Date().getFullYear()} All Rights Reserved
          </p>

        </div>

      </div>

    </div>
  );
}
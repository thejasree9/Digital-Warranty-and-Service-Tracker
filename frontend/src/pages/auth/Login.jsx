import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { login as loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Login button clicked");
    try {
      setLoading(true);

      const response = await loginUser(data);

console.log(response);

login({
  token: response.token,
  user: response.user,
});

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid Email or Password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="font-medium">Email</label>

            <div className="relative mt-2">
              <Mail
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />

              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                className="w-full border rounded-lg py-2 pl-10 pr-3"
                placeholder="Enter Email"
              />
            </div>

            <p className="text-red-500 text-sm">
              {errors.email?.message}
            </p>
          </div>

          <div>
            <label className="font-medium">Password</label>

            <div className="relative mt-2">
              <Lock
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />

              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full border rounded-lg py-2 pl-10 pr-10"
                placeholder="Enter Password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <p className="text-red-500 text-sm">
              {errors.password?.message}
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
          <div className="mt-4 text-center">
  <p className="text-sm">
    Don't have an account?{" "}
    <Link
      to="/register"
      className="text-blue-600 hover:underline font-medium"
    >
      Register
    </Link>
  </p>

  <p className="mt-2">
    <Link
      to="/forgot-password"
      className="text-blue-600 hover:underline text-sm"
    >
      Forgot Password?
    </Link>
  </p>
</div>
        </form>
      </div>
    </div>
  );
}
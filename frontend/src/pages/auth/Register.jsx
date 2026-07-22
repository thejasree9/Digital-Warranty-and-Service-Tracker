import { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { register as registerUser } from "../../services/authService";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await registerUser(data);

      toast.success("Registration Successful");

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">
          Create Account
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div>
            <label>Name</label>

            <div className="relative mt-2">
              <User
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />

              <input
                {...register("name", {
                  required: "Name is required",
                })}
                className="w-full border rounded-lg py-2 pl-10"
                placeholder="Enter Name"
              />
            </div>

            <p className="text-red-500 text-sm">
              {errors.name?.message}
            </p>
          </div>

          <div>
            <label>Email</label>

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
                className="w-full border rounded-lg py-2 pl-10"
                placeholder="Enter Email"
              />
            </div>

            <p className="text-red-500 text-sm">
              {errors.email?.message}
            </p>
          </div>

          <div>
            <label>Password</label>

            <div className="relative mt-2">
              <Lock
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />

              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                className="w-full border rounded-lg py-2 pl-10 pr-10"
                placeholder="Enter Password"
              />

              <button
                type="button"
                className="absolute right-3 top-2"
                onClick={() => setShowPassword(!showPassword)}
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
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
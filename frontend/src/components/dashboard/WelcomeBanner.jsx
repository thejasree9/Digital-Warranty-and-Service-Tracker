import { CalendarDays } from "lucide-react";

const WelcomeBanner = () => {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const userData = localStorage.getItem("user");

let user = null;

if (userData && userData !== "undefined") {
  try {
    user = JSON.parse(userData);
  } catch (e) {
    console.error("Invalid user in localStorage", e);
    localStorage.removeItem("user");
  }
}

const userName = user?.name || "User";
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white p-8 shadow-lg">
      <h1 className="text-3xl font-bold">
        Welcome back, {userName} 👋
      </h1>

      <p className="mt-2 text-blue-100">
        Manage your products, warranties and service history from one place.
      </p>

      <div className="flex items-center gap-2 mt-5">
        <CalendarDays size={20} />
        <span>{today}</span>
      </div>
    </div>
  );
};

export default WelcomeBanner;
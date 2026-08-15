import { CalendarDays } from "lucide-react";

const DashboardHeader = () => {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 transition-colors duration-300">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white transition-colors duration-300">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400 transition-colors duration-300">
          Welcome back! Here's an overview of your warranty tracker.
        </p>
      </div>

      <div className="flex items-center gap-2 mt-4 md:mt-0 text-blue-600 dark:text-blue-400 font-medium transition-colors duration-300">
        <CalendarDays size={18} />

        <span>{today}</span>
      </div>
    </div>
  );
};

export default DashboardHeader;
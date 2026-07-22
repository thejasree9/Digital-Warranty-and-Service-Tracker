import { CalendarDays } from "lucide-react";

const DashboardHeader = () => {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back! Here's an overview of your warranty tracker.
        </p>
      </div>

      <div className="flex items-center gap-2 text-blue-600 font-medium mt-4 md:mt-0">
        
      </div>
    </div>
  );
};

export default DashboardHeader;
import {
  Package,
  ShieldCheck,
  Wrench,
  AlertTriangle,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Dell Laptop Added",
    description: "A new product has been added.",
    icon: <Package size={18} />,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300",
  },
  {
    id: 2,
    title: "Warranty Activated",
    description: "Samsung TV warranty activated.",
    icon: <ShieldCheck size={18} />,
    color: "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-300",
  },
  {
    id: 3,
    title: "Service Scheduled",
    description: "LG Washing Machine service booked.",
    icon: <Wrench size={18} />,
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300",
  },
  {
    id: 4,
    title: "Warranty Expired",
    description: "HP Printer warranty expired.",
    icon: <AlertTriangle size={18} />,
    color: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300",
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-md p-6 transition-all duration-300">

      <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">
        Recent Activity
      </h2>

      <div className="space-y-5">

        {activities.map((item) => (

          <div
            key={item.id}
            className="flex items-start gap-4"
          >

            <div className={`p-3 rounded-full ${item.color}`}>
              {item.icon}
            </div>

            <div>

              <h3 className="font-semibold text-slate-800 dark:text-white">
                {item.title}
              </h3>

              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {item.description}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default RecentActivity;
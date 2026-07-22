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
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "Warranty Activated",
    description: "Samsung TV warranty activated.",
    icon: <ShieldCheck size={18} />,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    title: "Service Scheduled",
    description: "LG Washing Machine service booked.",
    icon: <Wrench size={18} />,
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 4,
    title: "Warranty Expired",
    description: "HP Printer warranty expired.",
    icon: <AlertTriangle size={18} />,
    color: "bg-red-100 text-red-600",
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">
        Recent Activity
      </h2>

      <div className="space-y-5">
        {activities.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-4"
          >
            <div
              className={`p-3 rounded-full ${item.color}`}
            >
              {item.icon}
            </div>

            <div>
              <h3 className="font-semibold">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm">
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
import { AlertTriangle } from "lucide-react";

const warranties = [
  {
    id: 1,
    product: "Dell Laptop",
    expires: "10 Aug 2026",
    status: "Expiring Soon",
  },
  {
    id: 2,
    product: "Samsung TV",
    expires: "25 Sep 2026",
    status: "Active",
  },
  {
    id: 3,
    product: "LG Washing Machine",
    expires: "05 Aug 2026",
    status: "Expiring Soon",
  },
  {
    id: 4,
    product: "HP Printer",
    expires: "Expired",
    status: "Expired",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";

    case "Expiring Soon":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300";

    case "Expired":
      return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";

    default:
      return "bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300";
  }
};

const UpcomingWarranty = () => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-md p-6 transition-all duration-300">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Upcoming Warranty Expiry
        </h2>

        <AlertTriangle className="text-yellow-500 dark:text-yellow-400" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-slate-700">
              <th className="text-left py-3 text-slate-700 dark:text-gray-300">
                Product
              </th>
              <th className="text-left py-3 text-slate-700 dark:text-gray-300">
                Expiry Date
              </th>
              <th className="text-left py-3 text-slate-700 dark:text-gray-300">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {warranties.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors duration-300"
              >
                <td className="py-4 text-slate-800 dark:text-white">
                  {item.product}
                </td>

                <td className="text-gray-600 dark:text-gray-300">
                  {item.expires}
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingWarranty;
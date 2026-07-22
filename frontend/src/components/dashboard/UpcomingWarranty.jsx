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
      return "bg-green-100 text-green-700";
    case "Expiring Soon":
      return "bg-yellow-100 text-yellow-700";
    case "Expired":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const UpcomingWarranty = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">
          Upcoming Warranty Expiry
        </h2>

        <AlertTriangle className="text-yellow-500" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Product</th>
              <th className="text-left py-3">Expiry Date</th>
              <th className="text-left py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {warranties.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">

                <td className="py-4">{item.product}</td>

                <td>{item.expires}</td>

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
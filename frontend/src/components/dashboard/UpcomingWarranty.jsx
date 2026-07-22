import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { toast } from "react-hot-toast";

import { getWarranties } from "../../services/warrantyService";

const UpcomingWarranty = () => {

  const [warranties, setWarranties] = useState([]);

  useEffect(() => {
    loadWarranties();
  }, []);

  const loadWarranties = async () => {

    try {

      const response = await getWarranties();

      const today = new Date();

      const upcoming = response.data
        .filter((item) => new Date(item.endDate) >= today)
        .sort(
          (a, b) =>
            new Date(a.endDate) -
            new Date(b.endDate)
        )
        .slice(0, 5);

      setWarranties(upcoming);

    } catch (error) {

      console.error(error);

      toast.error("Unable to load warranties");

    }

  };

  const getStatus = (endDate) => {

    const today = new Date();

    const end = new Date(endDate);

    const days =
      (end - today) / (1000 * 60 * 60 * 24);

    if (days < 0) return "Expired";

    if (days <= 30) return "Expiring Soon";

    return "Active";

  };

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

              <th className="text-left py-3">
                Product
              </th>

              <th className="text-left py-3">
                Expiry Date
              </th>

              <th className="text-left py-3">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {warranties.map((item) => {

              const status = getStatus(item.endDate);

              return (

                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="py-4">
                    {item.productName}
                  </td>

                  <td>
                    {new Date(item.endDate).toLocaleDateString()}
                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        status
                      )}`}
                    >
                      {status}
                    </span>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default UpcomingWarranty;
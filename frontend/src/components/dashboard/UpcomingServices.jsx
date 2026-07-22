import { useEffect, useState } from "react";
import { Wrench } from "lucide-react";
import { toast } from "react-hot-toast";
import { getServices } from "../../services/serviceHistoryService";

const UpcomingServices = () => {

  const [services, setServices] = useState([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {

    try {

      const response = await getServices();

      const sortedServices = (response.data || [])
        .sort(
          (a, b) =>
            new Date(b.serviceDate) -
            new Date(a.serviceDate)
        )
        .slice(0, 5);

      setServices(sortedServices);

    } catch (error) {

      console.error(error);

      toast.error("Unable to load services");

    }

  };

  return (

    <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-md p-6 transition-all duration-300">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Recent Services
        </h2>

        <Wrench className="text-blue-600 dark:text-blue-400" />

      </div>

      <div className="space-y-4">

        {services.length === 0 ? (

          <p className="text-gray-500 dark:text-gray-400">
            No service history found.
          </p>

        ) : (

          services.map((service) => (

            <div
              key={service.id}
              className="border border-gray-200 dark:border-slate-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors duration-300"
            >

              <h3 className="font-semibold text-slate-800 dark:text-white">
                {service.productName}
              </h3>

              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {service.serviceCenter}
              </p>

              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {service.description}
              </p>

              <p className="text-blue-600 dark:text-blue-400 text-sm mt-2">
                {new Date(
                  service.serviceDate
                ).toLocaleDateString()}
              </p>

            </div>

          ))

        )}

      </div>

    </div>

  );

};

export default UpcomingServices;
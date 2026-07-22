import { Wrench } from "lucide-react";

const services = [
  {
    id: 1,
    product: "Dell Laptop",
    date: "15 Aug 2026",
    center: "Dell Service Center",
  },
  {
    id: 2,
    product: "Samsung TV",
    date: "20 Aug 2026",
    center: "Samsung Care",
  },
  {
    id: 3,
    product: "LG Washing Machine",
    date: "01 Sep 2026",
    center: "LG Service",
  },
];

const UpcomingServices = () => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-md p-6 transition-all duration-300">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Upcoming Services
        </h2>

        <Wrench className="text-blue-600 dark:text-blue-400" />

      </div>

      <div className="space-y-4">

        {services.map((service) => (

          <div
            key={service.id}
            className="border border-gray-200 dark:border-slate-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors duration-300"
          >

            <h3 className="font-semibold text-slate-800 dark:text-white">
              {service.product}
            </h3>

            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {service.center}
            </p>

            <p className="text-blue-600 dark:text-blue-400 text-sm mt-2">
              {service.date}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default UpcomingServices;
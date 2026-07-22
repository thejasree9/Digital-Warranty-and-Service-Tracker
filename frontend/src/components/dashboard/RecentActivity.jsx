import { useEffect, useState } from "react";
import { Package, Wrench } from "lucide-react";
import { toast } from "react-hot-toast";

import { getProducts } from "../../services/productService";
import { getServices } from "../../services/serviceHistoryService";

const RecentActivity = () => {

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {

    try {

      const [productResponse, serviceResponse] = await Promise.all([
        getProducts(0, 100),
        getServices(),
      ]);

      const products = productResponse.data.products || [];
      const services = serviceResponse.data || [];

      const productActivities = products.map((product) => ({
        id: `product-${product.id}`,
        title: `${product.productName} Added`,
        description: `${product.brand} product added to your account.`,
        date: product.createdAt,
        icon: <Package size={18} />,
        color: "bg-blue-100 text-blue-600",
      }));

      const serviceActivities = services.map((service) => ({
        id: `service-${service.id}`,
        title: `${service.productName} Serviced`,
        description: `${service.serviceCenter}`,
        date: service.serviceDate,
        icon: <Wrench size={18} />,
        color: "bg-orange-100 text-orange-600",
      }));

      const merged = [...productActivities, ...serviceActivities]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

      setActivities(merged);

    } catch (error) {

      console.error(error);
      toast.error("Unable to load recent activity");

    }

  };

  return (

    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-6">
        Recent Activity
      </h2>

      {activities.length === 0 ? (

        <p className="text-gray-500">
          No recent activity found.
        </p>

      ) : (

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

                <p className="text-xs text-gray-400 mt-1">
                  {new Date(item.date).toLocaleDateString()}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default RecentActivity;
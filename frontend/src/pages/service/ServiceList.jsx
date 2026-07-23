import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  Eye,
  Pencil,
  Trash2,
  Search,
  RefreshCcw,
  Plus,
  Wrench,
} from "lucide-react";
import Swal from "sweetalert2";
import {
  getServices,
  deleteService,
} from "../../services/serviceHistoryService";

export default function ServiceList() {

  const navigate = useNavigate();

  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {

    loadServices();

  }, []);

  const loadServices = async () => {

    try {

      setLoading(true);

      const response = await getServices();

      console.log(response);

      setServices(response.data || []);

    } catch (error) {

      console.error(error);

      toast.error("Failed to load services");

    } finally {

      setLoading(false);

    }

  };

  const handleDelete = async (id) => {

  const result = await Swal.fire({
    title: "Delete Service?",
    text: "Are you sure you want to delete this service history?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, Delete",
  });

  if (!result.isConfirmed) return;

  try {

    const response = await deleteService(id);

    toast.success(response.message);

    loadServices();

  } catch (error) {

    console.error(error);

    toast.error(
      error.response?.data?.message || "Unable to delete service"
    );

  }

};

  const filteredServices = services.filter((service) =>

    service.productName
      ?.toLowerCase()
      .includes(search.toLowerCase())

  );

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-8 transition-colors duration-300">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>

            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">

              Service History

            </h1>

            <p className="text-gray-500 dark:text-slate-400 mt-2">

              Track all product service records.

            </p>

          </div>

          <button

            onClick={() => navigate("/services/add")}

            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"

          >

            <Plus size={20} />

            Add Service

          </button>

        </div>

        {/* Search */}

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-5 mb-8 transition-colors duration-300">

          <div className="flex flex-col md:flex-row gap-4">

            <div className="relative flex-1">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search by Product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
               className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <button

              onClick={loadServices}

              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-6 rounded-xl"

            >

              <RefreshCcw size={18} />

              Refresh

            </button>

          </div>

        </div>
                {/* Service Table */}

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md overflow-hidden overflow-x-auto transition-colors duration-300">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="p-4 text-left">Product</th>

                <th className="p-4 text-left">Service Center</th>

                <th className="p-4 text-left">Service Date</th>

                <th className="p-4 text-left">Cost</th>

                <th className="p-4 text-left">Technician</th>

                <th className="p-4 text-center">Actions</th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-12 text-gray-500 dark:text-gray-400"
                  >

                    Loading service history...

                  </td>

                </tr>

              ) : filteredServices.length === 0 ? (

                <tr>

                  <td colSpan="6" className="py-16">

                    <div className="flex flex-col items-center">

                      <Wrench
                        size={60}
                        className="text-gray-300"
                      />

                      <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-white">

                        No Service Records Found

                      </h2>

                      <p className="text-gray-500 dark:text-gray-400 mt-2">

                        Start by adding your first service record.

                      </p>

                      <button

                        onClick={() => navigate("/services/add")}

                        className="mt-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"

                      >

                        <Plus size={18} />

                        Add Service

                      </button>

                    </div>

                  </td>

                </tr>

              ) : (

                filteredServices.map((service) => (

                  <tr
                    key={service.id}
                    className="border-b border-gray-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-700 transition"
                  >

                    {/* Product */}

                    <td className="p-4">

                      <div>

                        <h3 className="font-semibold text-slate-800 dark:text-white">

                          {service.productName}

                        </h3>

                        <p className="text-sm text-gray-500 dark:text-gray-400">

                          {service.description || "No Description"}

                        </p>

                      </div>

                    </td>

                    {/* Service Center */}

                    <td className="p-4 text-slate-700 dark:text-slate-200">

                      {service.serviceCenter}

                    </td>

                    {/* Service Date */}

                    <td className="p-4 text-slate-700 dark:text-slate-200">

                      {service.serviceDate}

                    </td>

                    {/* Cost */}

                    <td className="p-4 font-semibold text-green-600 dark:text-green-400">

                      ₹ {service.cost}

                    </td>

                    {/* Technician */}

                    <td className="p-4 text-slate-700 dark:text-slate-200">

                      {service.technicianName || "-"}

                    </td>
                                        {/* Actions */}

                    <td className="p-4">

                      <div className="flex justify-center items-center gap-3">

                        {/* View */}

                        <button
                          title="View Service"
                          onClick={() =>
                            navigate(`/services/${service.id}`)
                          }
                          className="p-2 rounded-lg bg-green-100 hover:bg-green-200 transition"
                        >

                          <Eye
                            size={18}
                            className="text-green-700"
                          />

                        </button>

                        {/* Edit */}

                        <button
                          title="Edit Service"
                          onClick={() =>
                            navigate(`/services/edit/${service.id}`)
                          }
                          className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 transition"
                        >

                          <Pencil
                            size={18}
                            className="text-yellow-700"
                          />

                        </button>

                        {/* Delete */}

                        <button
                          title="Delete Service"
                          onClick={() =>
                            handleDelete(service.id)
                          }
                          className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition"
                        >

                          <Trash2
                            size={18}
                            className="text-red-700"
                          />

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>
                {/* Footer */}

        {!loading && filteredServices.length > 0 && (

          <div className="flex flex-col md:flex-row items-center justify-between mt-6 bg-white dark:bg-slate-800 rounded-2xl shadow-md px-6 py-4 transition-colors duration-300">

            <p className="text-gray-600 dark:text-gray-300 text-sm">

              Showing

              <span className="font-semibold text-blue-600">

                {" "} {filteredServices.length} {" "}

              </span>

              service record{filteredServices.length > 1 ? "s" : ""}

            </p>

            <button

              onClick={loadServices}

              className="mt-3 md:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"

            >

              <RefreshCcw size={18} />

              Refresh Services

            </button>

          </div>

        )}

      </div>

    </div>

  );

}
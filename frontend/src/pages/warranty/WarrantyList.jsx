import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Eye,
  Pencil,
  Trash2,
  Search,
  RefreshCcw,
  Plus,
  ShieldCheck,
} from "lucide-react";

import {
  getWarranties,
  deleteWarranty,
} from "../../services/warrantyService";

export default function WarrantyList() {

  const navigate = useNavigate();

  const [warranties, setWarranties] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {

    loadWarranties();

  }, []);

  const loadWarranties = async () => {

    try {

      setLoading(true);

      const response = await getWarranties();

      console.log(response);

      setWarranties(response.data || []);

    } catch (error) {

      console.error(error);

      toast.error("Failed to load warranties");

    } finally {

      setLoading(false);

    }

  };

  const handleDelete = async (productId) => {

  const result = await Swal.fire({
    title: "Delete Warranty?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {

    const response = await deleteWarranty(productId);

    toast.success(response.message);

    await loadWarranties();

  } catch (error) {

    console.error(error);

    toast.error(
      error.response?.data?.message || "Delete failed"
    );

  }
};

  const filteredWarranty = warranties.filter((item) =>

    item.productName
      ?.toLowerCase()
      .includes(search.toLowerCase())

  );

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-8 transition-colors duration-300">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

          <div>

            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">

              Warranty Management

            </h1>

            <p className="text-gray-500 dark:text-slate-400 mt-2">

              Manage all warranties in one place.

            </p>

          </div>

          <button

            onClick={() => navigate("/warranty/add")}

            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"

          >

            <Plus size={20} />

            Add Warranty

          </button>

        </div>

        {/* Search Card */}

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-5 mb-8 transition-colors duration-300">

          <div className="flex flex-col md:flex-row gap-4">

            <div className="relative flex-1">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search by Product Name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <button

              onClick={loadWarranties}

              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-6 rounded-xl"

            >

              <RefreshCcw size={18} />

              Refresh

            </button>

          </div>

        </div>
                {/* Warranty Table */}

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md overflow-hidden overflow-x-auto transition-colors duration-300">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="p-4 text-left">Product</th>

                <th className="p-4 text-left">Provider</th>

                <th className="p-4 text-left">Type</th>

                <th className="p-4 text-left">Start Date</th>

                <th className="p-4 text-left">End Date</th>

                <th className="p-4 text-center">Status</th>

                <th className="p-4 text-center">Actions</th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="7"
                    className="text-center py-12 text-gray-500 dark:text-gray-400"
                  >

                    Loading warranties...

                  </td>

                </tr>

              ) : filteredWarranty.length === 0 ? (

                <tr>

                  <td colSpan="7" className="py-16">

                    <div className="flex flex-col items-center">

                      <ShieldCheck
                        size={60}
                        className="text-gray-300"
                      />

                      <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-white">

                        No Warranty Found

                      </h2>

                      <p className="text-gray-500 dark:text-gray-400 mt-2">

                        Add your first warranty to get started.

                      </p>

                      <button

                        onClick={() => navigate("/warranty/add")}

                        className="mt-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"

                      >

                        <Plus size={18} />

                        Add Warranty

                      </button>

                    </div>

                  </td>

                </tr>

              ) : (

                filteredWarranty.map((warranty) => (

                  <tr
                    key={warranty.id}
                    className="border-b border-gray-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-700 transition"
                  >

                    <td className="p-4 text-slate-700 dark:text-slate-200">

                      <div>

                        <h3 className="font-semibold text-slate-800 dark:text-white">

                          {warranty.productName}

                        </h3>

                      </div>

                    </td>

                    <td className="p-4 text-slate-700 dark:text-slate-200">

                      {warranty.provider}

                    </td>

                    <td className="p-4 text-slate-700 dark:text-slate-200">

                      {warranty.warrantyType}

                    </td>

                    <td className="p-4 text-slate-700 dark:text-slate-200">

                      {warranty.startDate}

                    </td>

                    <td className="p-4 text-slate-700 dark:text-slate-200">

                      {warranty.endDate}

                    </td>
                                        {/* Status */}

                    <td className="p-4 text-center">

                      {new Date(warranty.endDate) < new Date() ? (

                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">

                          Expired

                        </span>

                      ) : new Date(warranty.endDate) <
                        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? (

                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">

                          Expiring Soon

                        </span>

                      ) : (

                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">

                          Active

                        </span>

                      )}

                    </td>

                    {/* Actions */}

                    <td className="p-4">

                      <div className="flex justify-center items-center gap-3">

                        <button
                          title="View Warranty"
                          onClick={() =>
                            navigate(`/warranty/${warranty.productId}`)
                          }
                          className="p-2 rounded-lg bg-green-100 hover:bg-green-200 transition"
                        >

                          <Eye
                            size={18}
                            className="text-green-700"
                          />

                        </button>

                        <button
                          title="Edit Warranty"
                          onClick={() =>
                            navigate(`/warranty/edit/${warranty.productId}`)
                          }
                          className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 transition"
                        >

                          <Pencil
                            size={18}
                            className="text-yellow-700"
                          />

                        </button>

                        <button
                          title="Delete Warranty"
                          onClick={() =>
                            handleDelete(warranty.productId)
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

        {!loading && filteredWarranty.length > 0 && (

          <div className="flex flex-col md:flex-row items-center justify-between mt-6 bg-white dark:bg-slate-800 rounded-2xl shadow-md px-6 py-4 transition-colors duration-300">

            <p className="text-gray-600 dark:text-gray-300 text-sm">

              Showing

              <span className="font-semibold text-blue-600">

                {" "} {filteredWarranty.length} {" "}

              </span>

              warrant{filteredWarranty.length > 1 ? "ies" : "y"}

            </p>

            <button

              onClick={loadWarranties}

              className="mt-3 md:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"

            >

              <RefreshCcw size={18} />

              Refresh Warranties

            </button>

          </div>

        )}

      </div>

    </div>

  );

}
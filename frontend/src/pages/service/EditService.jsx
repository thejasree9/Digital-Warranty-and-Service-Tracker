import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ArrowLeft, Save } from "lucide-react";

import {
  getService,
  updateService,
} from "../../services/serviceHistoryService";

export default function EditService() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({

    productId: "",

    serviceDate: "",

    serviceCenter: "",

    description: "",

    cost: "",

    technicianName: "",

    notes: "",

  });

  useEffect(() => {

    loadService();

  }, [id]);

  const loadService = async () => {

    try {

      const response = await getService(id);

      setFormData(response.data);

    } catch (error) {

      console.error(error);

      toast.error("Unable to load service");

    }

  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };
    const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.serviceDate) {
      toast.error("Service date is required");
      return;
    }

    if (!formData.serviceCenter.trim()) {
      toast.error("Service center is required");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Description is required");
      return;
    }

    try {

      setLoading(true);

      await updateService(
  id,
  {
    ...formData,
    cost: Number(formData.cost),
  },
  file
);
      toast.success("Service updated successfully");

      navigate("/services");

    } catch (error) {

      console.error(error);

      toast.error("Failed to update service");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-8 transition-colors duration-300">

      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-md p-8 transition-colors duration-300">

        {/* Header */}

        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">

              Edit Service History

            </h1>

            <p className="text-gray-500 dark:text-slate-400 mt-2">

              Update the service history details.

            </p>

          </div>

          <button

            onClick={() => navigate("/services")}

            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl"

          >

            <ArrowLeft size={18} />

            Back

          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
                  {/* Product ID (Read Only) */}

          <div>

            <label className="block mb-2 font-semibold text-slate-700 dark:text-slate-300">

              Product ID

            </label>

            <input
              type="text"
              value={formData.productId}
              readOnly
              className="w-full border border-gray-300 dark:border-slate-600 bg-gray-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl p-3 cursor-not-allowed"
            />

          </div>

          {/* Service Date */}

          <div>

            <label className="block mb-2 font-semibold text-slate-700 dark:text-slate-300">

              Service Date

            </label>

            <input
              type="date"
              name="serviceDate"
              value={formData.serviceDate}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Service Center */}

          <div>

            <label className="block mb-2 font-semibold text-slate-700 dark:text-slate-300">

              Service Center

            </label>

            <input
              type="text"
              name="serviceCenter"
              value={formData.serviceCenter}
              onChange={handleChange}
              placeholder="Dell Service Center"
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Description */}

          <div>

            <label className="block mb-2 font-semibold text-slate-700 dark:text-slate-300">

              Service Description

            </label>

            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Screen replacement, Battery replacement..."
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Cost & Technician */}

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 font-semibold text-slate-700 dark:text-slate-300">

                Service Cost

              </label>

              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                placeholder="1000"
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div>

              <label className="block mb-2 font-semibold text-slate-700 dark:text-slate-300">

                Technician Name

              </label>

              <input
                type="text"
                name="technicianName"
                value={formData.technicianName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

          </div>

          {/* Upload New Invoice */}

<div>

  <label className="block mb-2 font-semibold text-slate-700 dark:text-slate-300">

    Upload New Invoice (Optional)

  </label>

  <input
    type="file"
    accept=".pdf,.jpg,.jpeg,.png"
    onChange={(e) => setFile(e.target.files[0])}
    className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl p-3"
  />

  {formData.invoiceUrl && (
    <a
      href={formData.invoiceUrl}
      target="_blank"
      rel="noreferrer"
      className="text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300 mt-2 inline-block"
    >
      View Current Invoice
    </a>
  )}

</div>

          {/* Notes */}

          <div>

            <label className="block mb-2 font-semibold text-slate-700 dark:text-slate-300">

              Notes

            </label>

            <textarea
              rows="5"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter additional notes..."
              className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

          </div>
                    {/* Buttons */}

          <div className="flex justify-end gap-4 pt-6">

            <button
              type="button"
              onClick={() => navigate("/services")}
             className="px-6 py-3 rounded-xl border border-gray-300 dark:border-slate-600 text-slate-700 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-xl transition"
            >
              <Save size={18} />

              {loading ? "Updating..." : "Update Service"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}
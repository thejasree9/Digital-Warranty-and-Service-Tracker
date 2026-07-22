import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ArrowLeft, Save } from "lucide-react";

import {
  getWarranty,
  updateWarranty,
} from "../../services/warrantyService";

export default function EditWarranty() {

  const { productId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    productId: "",

    provider: "",

    warrantyType: "",

    startDate: "",

    endDate: "",

    terms: "",

  });

  useEffect(() => {

    loadWarranty();

  }, [productId]);

  const loadWarranty = async () => {

    try {

      const response = await getWarranty(productId);

      setFormData(response.data);

    } catch (error) {

      console.error(error);

      toast.error("Unable to load warranty");

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

    if (!formData.provider.trim()) {
      toast.error("Warranty provider is required");
      return;
    }

    if (!formData.warrantyType.trim()) {
      toast.error("Warranty type is required");
      return;
    }

    if (!formData.startDate) {
      toast.error("Start date is required");
      return;
    }

    if (!formData.endDate) {
      toast.error("End date is required");
      return;
    }

    try {

      setLoading(true);

      await updateWarranty(productId, formData);

      toast.success("Warranty updated successfully");

      navigate("/warranty");

    } catch (error) {

      console.error(error);

      toast.error("Failed to update warranty");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="text-3xl font-bold">

              Edit Warranty

            </h1>

            <p className="text-gray-500 mt-2">

              Update warranty information.

            </p>

          </div>

          <button

            onClick={() => navigate("/warranty")}

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
                  {/* Product Name (Read Only) */}

          <div>

            <label className="block mb-2 font-semibold">

              Product ID

            </label>

            <input
              type="text"
              value={formData.productId}
              readOnly
              className="w-full border rounded-xl p-3 bg-gray-100 cursor-not-allowed"
            />

          </div>

          {/* Provider */}

          <div>

            <label className="block mb-2 font-semibold">

              Warranty Provider

            </label>

            <input
              type="text"
              name="provider"
              value={formData.provider}
              onChange={handleChange}
              placeholder="Dell, HP, Samsung..."
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Warranty Type */}

          <div>

            <label className="block mb-2 font-semibold">

              Warranty Type

            </label>

            <select
              name="warrantyType"
              value={formData.warrantyType}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
            >

              <option value="Manufacturer">
                Manufacturer
              </option>

              <option value="Extended">
                Extended
              </option>

              <option value="Accidental Damage">
                Accidental Damage
              </option>

              <option value="Premium">
                Premium
              </option>

            </select>

          </div>

          {/* Dates */}

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 font-semibold">

                Start Date

              </label>

              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div>

              <label className="block mb-2 font-semibold">

                End Date

              </label>

              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

          </div>

          {/* Terms */}

          <div>

            <label className="block mb-2 font-semibold">

              Terms & Conditions

            </label>

            <textarea
              rows="5"
              name="terms"
              value={formData.terms}
              onChange={handleChange}
              placeholder="Enter warranty terms..."
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

          </div>
                    {/* Buttons */}

          <div className="flex justify-end gap-4 pt-6">

            <button
              type="button"
              onClick={() => navigate("/warranty")}
              className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-xl transition"
            >
              <Save size={18} />

              {loading ? "Updating..." : "Update Warranty"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}
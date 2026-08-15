import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  ArrowLeft,
  Save,
  Upload,
} from "lucide-react";

import {
  getWarranty,
  updateWarranty,
} from "../../services/warrantyService";

export default function EditWarranty() {

  const { productId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({

    productId: "",

    provider: "",

    warrantyType: "",

    startDate: "",

    endDate: "",

    terms: "",

    warrantyCardUrl: "",

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

  const handleFileChange = (e) => {

    if (e.target.files.length > 0) {

      setFile(e.target.files[0]);

    }

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

      await updateWarranty(
        productId,
        formData,
        file
      );

      toast.success("Warranty updated successfully");

      navigate("/warranty");

    } catch (error) {

      console.error(error);

      toast.error(

        error.response?.data?.message ||

        "Failed to update warranty"

      );

    } finally {

      setLoading(false);

    }

  };
  return (

  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-10 px-6">

    <div className="max-w-5xl mx-auto">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">

            Edit Warranty

          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">

            Update your warranty details and replace the warranty card if needed.

          </p>

        </div>

        <button

          onClick={() => navigate("/warranty")}

          className="mt-4 md:mt-0 flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-5 py-3 rounded-xl transition"

        >

          <ArrowLeft size={18} />

          Back

        </button>

      </div>

      {/* Form Card */}

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8">

        <form
          onSubmit={handleSubmit}
          className="space-y-7"
        >

          {/* Product ID */}

          <div>

            <label className="block mb-2 font-semibold text-slate-700 dark:text-slate-300">

              Product ID

            </label>

            <input
              type="text"
              value={formData.productId}
              readOnly
              className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-4 py-3 cursor-not-allowed"
            />

          </div>

          {/* Warranty Provider */}

          <div>

            <label className="block mb-2 font-semibold text-slate-700 dark:text-slate-300">

              Warranty Provider

            </label>

            <input
              type="text"
              name="provider"
              value={formData.provider}
              onChange={handleChange}
              placeholder="Samsung, Dell, HP..."
              className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Warranty Type */}

          <div>

            <label className="block mb-2 font-semibold text-slate-700 dark:text-slate-300">

              Warranty Type

            </label>

            <select
              name="warrantyType"
              value={formData.warrantyType}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
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

              <label className="block mb-2 font-semibold text-slate-700 dark:text-slate-300">

                Start Date

              </label>

              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div>

              <label className="block mb-2 font-semibold text-slate-700 dark:text-slate-300">

                End Date

              </label>

              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

          </div>
                    {/* Terms & Conditions */}

          <div>

            <label className="block mb-2 font-semibold text-slate-700 dark:text-slate-300">

              Terms & Conditions

            </label>

            <textarea
              rows="5"
              name="terms"
              value={formData.terms}
              onChange={handleChange}
              placeholder="Enter warranty terms..."
              className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

          </div>

          {/* Current Warranty Card */}

          <div>

            <label className="block mb-3 font-semibold text-slate-700 dark:text-slate-300">

              Current Warranty Card

            </label>

            {formData.warrantyCardUrl ? (

              <div className="border rounded-2xl bg-gray-50 dark:bg-slate-700 p-5">

                {formData.warrantyCardUrl
                  .toLowerCase()
                  .match(/\.(jpg|jpeg|png|gif|webp)$/) ? (

                  <img
                    src={formData.warrantyCardUrl}
                    alt="Warranty Card"
                    className="w-full max-w-md rounded-xl border shadow-lg"
                  />

                ) : (

                  <a
                    href={formData.warrantyCardUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-semibold underline"
                  >
                    View Warranty Card
                  </a>

                )}

              </div>

            ) : (

              <div className="border border-dashed rounded-2xl p-6 text-center bg-gray-50 dark:bg-slate-700">

                <p className="text-gray-500 dark:text-gray-400">

                  No warranty card uploaded.

                </p>

              </div>

            )}

          </div>

          {/* Replace Warranty Card */}

          <div>

            <label className="block mb-3 font-semibold text-slate-700 dark:text-slate-300">

              Replace Warranty Card

            </label>

            <div className="border-2 border-dashed border-blue-300 dark:border-blue-500 rounded-2xl bg-blue-50 dark:bg-slate-700 p-8 text-center transition hover:border-blue-500">

              <Upload
                size={48}
                className="mx-auto text-blue-600 mb-4"
              />

              <p className="text-slate-700 dark:text-slate-300 font-medium mb-3">

                Click below to upload a new warranty card

              </p>

              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-slate-600
                file:mr-4
                file:py-3
                file:px-6
                file:rounded-xl
                file:border-0
                file:bg-blue-600
                file:text-white
                hover:file:bg-blue-700
                cursor-pointer"
              />

              {file && (

                <div className="mt-5 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700">

                  <p className="text-green-700 dark:text-green-300 font-medium">

                    ✓ Selected File

                  </p>

                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">

                    {file.name}

                  </p>

                </div>

              )}

            </div>

          </div>
                    {/* Action Buttons */}

          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">

            <button
              type="button"
              onClick={() => navigate("/warranty")}
              className="px-6 py-3 rounded-xl border border-gray-300 dark:border-slate-600 text-slate-700 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 transition font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-xl transition font-semibold shadow-lg"
            >
              <Save size={20} />

              {loading ? "Updating Warranty..." : "Update Warranty"}
            </button>

          </div>

        </form>

      </div>

    </div>

  </div>

);

}
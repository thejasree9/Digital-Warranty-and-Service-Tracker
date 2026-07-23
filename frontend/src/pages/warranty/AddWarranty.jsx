import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ArrowLeft, Save } from "lucide-react";

import { getProducts } from "../../services/productService";
import { addWarranty } from "../../services/warrantyService";

export default function AddWarranty() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

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

    loadProducts();

  }, []);

  const loadProducts = async () => {

    try {

      const response = await getProducts();

      setProducts(response.data.products || []);

    } catch (error) {

      console.error(error);

      toast.error("Unable to load products");

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

    if (!formData.productId) {
      toast.error("Please select a product");
      return;
    }

    if (!formData.provider.trim()) {
      toast.error("Provider is required");
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

      await addWarranty(formData);

      toast.success("Warranty added successfully");

      navigate("/warranty");

    } catch (error) {

      console.error(error);

      toast.error("Failed to add warranty");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-8 transition-colors duration-300">

      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-md p-8 transition-colors duration-300">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">

              Add Warranty

            </h1>

            <p className="text-3xl font-bold text-slate-800 dark:text-white">

              Register a warranty for your product.

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
                    {/* Product */}

          <div>

            <label className="block mb-2 font-semibold text-slate-700 dark:text-slate-300">

              Select Product

            </label>

            <select
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
            >

              <option value="">

                Select Product

              </option>

              {products.map((product) => (

                <option
                  key={product.id}
                  value={product.id}
                >

                  {product.productName}

                </option>

              ))}

            </select>

          </div>

          {/* Provider */}

          <div>

            <label className="block mb-2 font-semibold text-slate-700 dark:text-slate-300">

              Warranty Provider

            </label>

            <input
              type="text"
              name="provider"
              value={formData.provider}
              onChange={handleChange}
              placeholder="Dell, HP, Samsung..."
              className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
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
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
            >

              <option value="">

                Select Warranty Type

              </option>

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
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

          </div>

          {/* Terms */}

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
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

          </div>
                    {/* Buttons */}

          <div className="flex justify-end gap-4 pt-6">

            <button
              type="button"
              onClick={() => navigate("/warranty")}
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

              {loading ? "Saving..." : "Save Warranty"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}
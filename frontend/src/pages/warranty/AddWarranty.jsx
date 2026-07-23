import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  ArrowLeft,
  Save,
  Upload,
  ShieldCheck,
} from "lucide-react";

import { getProducts } from "../../services/productService";
import { addWarranty } from "../../services/warrantyService";

export default function AddWarranty() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);

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

  const handleFileChange = (e) => {

    setFile(e.target.files[0]);

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

      toast.error("Warranty Type is required");

      return;

    }

    if (!formData.startDate) {

      toast.error("Start Date is required");

      return;

    }

    if (!formData.endDate) {

      toast.error("End Date is required");

      return;

    }

    try {

      setLoading(true);

      await addWarranty(formData, file);

      toast.success("Warranty Added Successfully");

      navigate("/warranty");

    } catch (error) {

      console.error(error);

      toast.error(

        error.response?.data?.message ||

        "Failed to add warranty"

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

          <div className="flex items-center gap-3">

            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">

              <ShieldCheck
                className="text-white"
                size={28}
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold text-slate-800 dark:text-white">

                Add Warranty

              </h1>

              <p className="text-slate-500 dark:text-slate-400 mt-1">

                Register and securely manage your product warranty.

              </p>

            </div>

          </div>

        </div>

        <button

          onClick={() => navigate("/warranty")}

          className="mt-5 md:mt-0 flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-700 hover:bg-gray-800 text-white transition"

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

          {/* Product */}

          <div>

            <label className="block mb-2 font-semibold text-slate-700 dark:text-slate-300">

              Select Product

            </label>

            <select

              name="productId"

              value={formData.productId}

              onChange={handleChange}

              className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"

            >

              <option value="">

                Choose Product

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

              <option value="">

                Select Warranty Type

              </option>

              <option value="Manufacturer">

                Manufacturer Warranty

              </option>

              <option value="Extended">

                Extended Warranty

              </option>

              <option value="Premium">

                Premium Warranty

              </option>

              <option value="Accidental Damage">

                Accidental Damage Protection

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
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  dark:border-slate-600
                  bg-white
                  dark:bg-slate-700
                  text-slate-800
                  dark:text-white
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
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
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  dark:border-slate-600
                  bg-white
                  dark:bg-slate-700
                  text-slate-800
                  dark:text-white
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

            </div>

          </div>

          {/* Terms */}

          <div>

            <label className="block mb-2 font-semibold text-slate-700 dark:text-slate-300">

              Terms & Conditions

            </label>

            <textarea
              rows={5}
              name="terms"
              value={formData.terms}
              onChange={handleChange}
              placeholder="Enter warranty terms and conditions..."
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                dark:border-slate-600
                bg-white
                dark:bg-slate-700
                text-slate-800
                dark:text-white
                px-4
                py-3
                outline-none
                resize-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>

          {/* Warranty Card Upload */}

          <div>

            <label className="block mb-3 font-semibold text-slate-700 dark:text-slate-300">

              Warranty Card

            </label>

            <label
              htmlFor="warrantyFile"
              className="
                cursor-pointer
                border-2
                border-dashed
                border-blue-400
                dark:border-slate-500
                rounded-2xl
                bg-blue-50
                dark:bg-slate-700
                p-8
                flex
                flex-col
                items-center
                justify-center
                hover:bg-blue-100
                dark:hover:bg-slate-600
                transition-all
                duration-300
              "
            >

              <Upload
                size={42}
                className="text-blue-600 mb-4"
              />

              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">

                Upload Warranty Card

              </h3>

              <p className="text-gray-500 dark:text-gray-300 mt-2">

                Click to browse or drag & drop

              </p>

              <p className="text-sm text-gray-400 mt-1">

                PDF • JPG • JPEG • PNG

              </p>

              {file && (

                <div className="mt-5 bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium">

                  ✅ {file.name}

                </div>

              )}

              <input
                id="warrantyFile"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />

            </label>

          </div>
                    {/* Buttons */}

          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">

            <button
              type="button"
              onClick={() => navigate("/warranty")}
              className="
                px-6
                py-3
                rounded-xl
                border
                border-gray-300
                dark:border-slate-600
                bg-white
                dark:bg-slate-700
                text-slate-700
                dark:text-white
                hover:bg-gray-100
                dark:hover:bg-slate-600
                transition-all
                duration-300
              "
            >

              Cancel

            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                flex
                items-center
                justify-center
                gap-2
                px-8
                py-3
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                hover:from-blue-700
                hover:to-indigo-700
                text-white
                font-semibold
                shadow-lg
                hover:shadow-xl
                transition-all
                duration-300
                disabled:opacity-70
                disabled:cursor-not-allowed
              "
            >

              <Save size={20} />

              {loading
                ? "Saving..."
                : "Save Warranty"}

            </button>

          </div>

        </form>

      </div>

    </div>

  </div>

);
}
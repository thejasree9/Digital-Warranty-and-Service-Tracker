import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  ArrowLeft,
  Save,
  Package,
  FileText,
  Upload,
} from "lucide-react";

import {
  getProduct,
  updateProduct,
} from "../../services/productService";

export default function EditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [product, setProduct] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {

    fetchProduct();

  }, []);

  const fetchProduct = async () => {

    try {

      const response = await getProduct(id);

      setProduct(response.data);

      reset(response.data);

    } catch (error) {

      console.error(error);

      toast.error("Unable to load product");

    }

  };

  const onSubmit = async (data) => {

    try {

      setLoading(true);

      await updateProduct(
        id,
        data,
        selectedFile
      );

      toast.success("Product Updated Successfully");

      navigate("/products");

    } catch (error) {

      console.error(error);

      toast.error("Update Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-10 px-6 transition-all duration-300">

      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-3">

              <Package className="text-blue-600" />

              Edit Product

            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-2">

              Update your product information and invoice.

            </p>

          </div>

          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 transition"
          >

            <ArrowLeft size={18} />

            Back

          </button>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
        >
                    {/* Product Information */}

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-slate-700">

            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-2">

              <Package className="text-blue-600" size={22} />

              Product Information

            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Product Name */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Product Name
                </label>

                <input
                  {...register("productName", {
                    required: "Product Name is required",
                  })}
                  className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />

                {errors.productName && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.productName.message}
                  </p>
                )}

              </div>

              {/* Brand */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Brand
                </label>

                <input
                  {...register("brand", {
                    required: "Brand is required",
                  })}
                  className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />

                {errors.brand && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.brand.message}
                  </p>
                )}

              </div>

              {/* Model */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Model
                </label>

                <input
                  {...register("model", {
                    required: "Model is required",
                  })}
                  className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />

                {errors.model && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.model.message}
                  </p>
                )}

              </div>

              {/* Serial Number */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Serial Number
                </label>

                <input
                  {...register("serialNumber", {
                    required: "Serial Number is required",
                  })}
                  className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />

                {errors.serialNumber && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.serialNumber.message}
                  </p>
                )}

              </div>

              {/* Purchase Date */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Purchase Date
                </label>

                <input
                  type="date"
                  {...register("purchaseDate")}
                  className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />

              </div>

              {/* Price */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Price (₹)
                </label>

                <input
                  type="number"
                  step="0.01"
                  {...register("price")}
                  className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />

              </div>

            </div>

          </div>
                    {/* Invoice Section */}

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-slate-700">

            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-2">

              <FileText
                className="text-green-600"
                size={22}
              />

              Invoice

            </h2>

            {/* Current Invoice */}

            <div className="mb-6">

              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">

                Current Invoice

              </label>

              {product?.invoiceUrl ? (

                <a
                  href={product.invoiceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    text-blue-600
                    hover:text-blue-700
                    hover:underline
                    font-medium
                  "
                >

                  <FileText size={18} />

                  View Current Invoice

                </a>

              ) : (

                <div className="text-gray-500 dark:text-gray-400">

                  No Invoice Uploaded

                </div>

              )}

            </div>

            {/* Replace Invoice */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">

                Replace Invoice

              </label>

              <label
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  border-2
                  border-dashed
                  border-blue-300
                  dark:border-slate-600
                  rounded-2xl
                  p-8
                  cursor-pointer
                  hover:border-blue-500
                  hover:bg-blue-50
                  dark:hover:bg-slate-700
                  transition-all
                "
              >

                <Upload
                  size={40}
                  className="text-blue-600 mb-3"
                />

                <p className="font-semibold text-slate-700 dark:text-white">

                  Click to Upload Invoice

                </p>

                <p className="text-sm text-gray-500 mt-2">

                  PDF, JPG, JPEG or PNG

                </p>

                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) =>
                    setSelectedFile(
                      e.target.files[0]
                    )
                  }
                />

              </label>

              {selectedFile && (

                <div className="mt-4 rounded-xl bg-green-50 dark:bg-green-900/20 p-4">

                  <p className="text-green-700 dark:text-green-300 font-medium">

                    Selected File

                  </p>

                  <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">

                    {selectedFile.name}

                  </p>

                </div>

              )}

            </div>

          </div>
                    {/* Action Buttons */}

          <div className="flex flex-col sm:flex-row justify-end gap-4">

            <button
              type="button"
              onClick={() => navigate("/products")}
              className="
                flex
                items-center
                justify-center
                gap-2
                px-6
                py-3
                rounded-xl
                bg-gray-200
                dark:bg-slate-700
                text-slate-700
                dark:text-white
                hover:bg-gray-300
                dark:hover:bg-slate-600
                transition-all
                duration-300
              "
            >
              <ArrowLeft size={18} />

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
                text-white
                font-semibold
                shadow-lg
                hover:shadow-xl
                hover:scale-[1.02]
                transition-all
                duration-300
                disabled:opacity-70
                disabled:cursor-not-allowed
              "
            >

              <Save size={18} />

              {loading
                ? "Updating..."
                : "Update Product"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}
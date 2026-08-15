import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  Save,
  Upload,
  Image as ImageIcon,
} from "lucide-react";

import { addProduct } from "../../services/productService";

export default function AddProduct() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);

  const [preview, setPreview] = useState("");

  const [product, setProduct] = useState({

    productName: "",

    brand: "",

    model: "",

    serialNumber: "",

    purchaseDate: "",

    price: "",

    invoiceUrl: ""

  });

  const handleChange = (e) => {

    setProduct({

      ...product,

      [e.target.name]: e.target.value

    });

  };

  const handleFileChange = (e) => {

    const selected = e.target.files[0];

    if (!selected) return;

    setFile(selected);

    setPreview(URL.createObjectURL(selected));

  };

  const validate = () => {

    if (!product.productName.trim()) {

      toast.error("Product name is required");

      return false;

    }

    if (!product.brand.trim()) {

      toast.error("Brand is required");

      return false;

    }

    if (!product.model.trim()) {

      toast.error("Model is required");

      return false;

    }

    if (!product.purchaseDate) {

      toast.error("Purchase date is required");

      return false;

    }

    if (!product.price) {

      toast.error("Price is required");

      return false;

    }

    return true;

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    try {

      setLoading(true);

      const response = await addProduct(

        product,

        file

      );

      if (response.success) {

        toast.success("Product Added Successfully");

        navigate("/products");

      } else {

        toast.error(response.message);

      }

    } catch (error) {

      console.error(error);

      toast.error("Failed to add product");

    } finally {

      setLoading(false);

    }

  };
    return (

    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-8 transition-colors duration-300">

      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">

              Add Product

            </h1>

            <p className="text-gray-500 dark:text-slate-400 mt-2">

              Register a new product with purchase details.

            </p>

          </div>

          <button

            onClick={() => navigate("/products")}

            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-3 rounded-xl transition"

          >

            <ArrowLeft size={18} />

            Back

          </button>

        </div>

        {/* Form */}

        <form

          onSubmit={handleSubmit}

          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 transition-colors duration-300"

        >

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Left Side */}

            <div className="space-y-5">

              {/* Product Name */}

              <div>

                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">

                  Product Name *

                </label>

                <input

                  type="text"

                  name="productName"

                  value={product.productName}

                  onChange={handleChange}

                  placeholder="Dell Inspiron Laptop"

                  className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"

                />

              </div>

              {/* Brand */}

              <div>

                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">

                  Brand *

                </label>

                <input

                  type="text"

                  name="brand"

                  value={product.brand}

                  onChange={handleChange}

                  placeholder="Dell"

                  className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"

                />

              </div>

              {/* Model */}

              <div>

                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">

                  Model *

                </label>

                <input

                  type="text"

                  name="model"

                  value={product.model}

                  onChange={handleChange}

                  placeholder="Inspiron 15"

                  className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"

                />

              </div>

              {/* Serial Number */}

              <div>

                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">

                  Serial Number

                </label>

                <input

                  type="text"

                  name="serialNumber"

                  value={product.serialNumber}

                  onChange={handleChange}

                  placeholder="SN123456789"

                  className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"

                />

              </div>

            </div>

            {/* Right Side */}

            <div className="space-y-5">

              {/* Purchase Date */}

              <div>

                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">

                  Purchase Date *

                </label>

                <input

                  type="date"

                  name="purchaseDate"

                  value={product.purchaseDate}

                  onChange={handleChange}

                  className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"

                />

              </div>

              {/* Price */}

              <div>

                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">

                  Purchase Price *

                </label>

                <input

                  type="number"

                  name="price"

                  value={product.price}

                  onChange={handleChange}

                  placeholder="50000"

                  className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"

                />

              </div>
                            {/* Invoice Upload */}

              <div>

                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">

                  Product Invoice

                </label>

                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-blue-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-2xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-600 transition">

                  {preview ? (

                    <img
                      src={preview}
                      alt="Invoice Preview"
                      className="h-full object-contain rounded-xl"
                    />

                  ) : (

                    <>

                      <ImageIcon
                        size={55}
                        className="text-blue-500"
                      />

                      <p className="mt-3 text-gray-600 dark:text-gray-300">

                        Click to upload invoice image

                      </p>

                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">

                        JPG, PNG or JPEG

                      </p>

                    </>

                  )}

                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                </label>

              </div>

            </div>

          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4 mt-10">

            <button
              type="button"
              onClick={() => navigate("/products")}
              className="px-6 py-3 rounded-xl border border-gray-300 dark:border-slate-600 text-slate-700 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 transition"
            >

              Cancel

            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-8 py-3 rounded-xl transition"
            >

              {loading ? (

                <>

                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                  Saving...

                </>

              ) : (

                <>

                  <Save size={18} />

                  Save Product

                </>

              )}

            </button>

          </div>

                {/* Product Information */}

        <div className="mt-10 border-t border-gray-200 dark:border-slate-700 pt-6">

          <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-5">
            Product Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-blue-50 dark:bg-slate-700 rounded-xl p-5">

              <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                💡 Tips
              </h3>

              <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">

                <li>• Enter the exact product name.</li>

                <li>• Use the serial number printed on the product.</li>

                <li>• Upload a clear invoice image.</li>

                <li>• Double-check the purchase date.</li>

              </ul>

            </div>

            <div className="bg-green-50 dark:bg-slate-700 rounded-xl p-5">

              <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">
                Warranty Reminder
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-sm leading-6">

                After adding a product, you can register its warranty
                and receive notifications before the warranty expires.

              </p>

            </div>

          </div>

        </div>

      </form>

    </div>

  </div>

);

}
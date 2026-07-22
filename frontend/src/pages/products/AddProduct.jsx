import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { addProduct } from "../../services/productService";


export default function AddProduct() {
  const [loading, setLoading] = useState(false);
const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const payload = {
        ...data,
        price: Number(data.price),
      };

      const response = await addProduct(payload, file);

      toast.success(response.message || "Product Added Successfully");

      reset();
        setFile(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to Add Product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Add Product
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Product Name */}
          <div>
            <label className="font-medium">
              Product Name
            </label>

            <input
              {...register("productName", {
                required: "Product Name is required",
              })}
              className="w-full border rounded-lg p-2 mt-2"
            />

            <p className="text-red-500 text-sm">
              {errors.productName?.message}
            </p>
          </div>

          {/* Brand */}
          <div>
            <label className="font-medium">
              Brand
            </label>

            <input
              {...register("brand", {
                required: "Brand is required",
              })}
              className="w-full border rounded-lg p-2 mt-2"
            />

            <p className="text-red-500 text-sm">
              {errors.brand?.message}
            </p>
          </div>

          {/* Model */}
          <div>
            <label className="font-medium">
              Model
            </label>

            <input
              {...register("model", {
                required: "Model is required",
              })}
              className="w-full border rounded-lg p-2 mt-2"
            />

            <p className="text-red-500 text-sm">
              {errors.model?.message}
            </p>
          </div>

          {/* Serial Number */}
          <div>
            <label className="font-medium">
              Serial Number
            </label>

            <input
              {...register("serialNumber", {
                required: "Serial Number is required",
              })}
              className="w-full border rounded-lg p-2 mt-2"
            />

            <p className="text-red-500 text-sm">
              {errors.serialNumber?.message}
            </p>
          </div>

          {/* Purchase Date */}
          <div>
            <label className="font-medium">
              Purchase Date
            </label>

            <input
              type="date"
              {...register("purchaseDate", {
                required: "Purchase Date is required",
              })}
              className="w-full border rounded-lg p-2 mt-2"
            />

            <p className="text-red-500 text-sm">
              {errors.purchaseDate?.message}
            </p>
          </div>

          {/* Price */}
          <div>
            <label className="font-medium">
              Price
            </label>

            <input
              type="number"
              step="0.01"
              {...register("price", {
                required: "Price is required",
                min: {
                  value: 1,
                  message: "Price must be greater than 0",
                },
              })}
              className="w-full border rounded-lg p-2 mt-2"
            />

            <p className="text-red-500 text-sm">
              {errors.price?.message}
            </p>
          </div>

          {/* Invoice Upload */}

<div>
  <label className="font-medium">
    Invoice / Product Image
  </label>

  <input
    type="file"
    accept="image/*,.pdf"
    onChange={(e) => setFile(e.target.files[0])}
    className="w-full border rounded-lg p-2 mt-2"
  />

  {file && (
    <p className="text-green-600 text-sm mt-2">
      Selected File: {file.name}
    </p>
  )}
</div>

          {/* Submit Button */}
          <div className="md:col-span-2">

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  getProduct,
  updateProduct,
} from "../../services/productService";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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

      // If your API returns { success, data }
      reset(response.data);

      // If your API directly returns the product, use:
      // reset(response);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load product");
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await updateProduct(id, data);

      toast.success("Product Updated");

      navigate("/products");
    } catch (error) {
      console.error(error);
      toast.error("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-6"
        >
          <input
            {...register("productName", { required: true })}
            placeholder="Product Name"
            className="border p-2 rounded"
          />

          <input
            {...register("brand", { required: true })}
            placeholder="Brand"
            className="border p-2 rounded"
          />

          <input
            {...register("model", { required: true })}
            placeholder="Model"
            className="border p-2 rounded"
          />

          <input
            {...register("serialNumber", { required: true })}
            placeholder="Serial Number"
            className="border p-2 rounded"
          />

          <input
            type="date"
            {...register("purchaseDate")}
            className="border p-2 rounded"
          />

          <input
            type="number"
            step="0.01"
            {...register("price")}
            className="border p-2 rounded"
          />

          <div className="col-span-2">
            <button
              type="submit"
              className="bg-blue-600 text-white w-full py-3 rounded-lg"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
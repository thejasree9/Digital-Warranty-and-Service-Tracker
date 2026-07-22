import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { addWarranty } from "../../services/warrantyService";

export default function AddWarranty() {

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {

    try {

      setLoading(true);

      await addWarranty(data);

      toast.success("Warranty Added Successfully");

      reset();

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Unable to add warranty"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center py-10">

      <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-8">

        <h1 className="text-3xl font-bold mb-8">
          Add Warranty
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-5"
        >

          <input
            type="number"
            placeholder="Product ID"
            {...register("productId", { required: true })}
            className="border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Warranty Type"
            {...register("warrantyType", { required: true })}
            className="border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Provider"
            {...register("provider", { required: true })}
            className="border p-3 rounded"
          />

          <input
            type="date"
            {...register("startDate", { required: true })}
            className="border p-3 rounded"
          />

          <input
            type="date"
            {...register("endDate", { required: true })}
            className="border p-3 rounded"
          />

          <textarea
            placeholder="Terms"
            {...register("terms")}
            className="border p-3 rounded col-span-2"
            rows="4"
          />

          <button
            className="bg-blue-600 text-white py-3 rounded-lg col-span-2"
          >
            {loading ? "Saving..." : "Add Warranty"}
          </button>

        </form>

      </div>

    </div>

  );
}
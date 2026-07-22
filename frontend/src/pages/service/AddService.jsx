import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { addService } from "../../services/serviceHistoryService";

export default function AddService() {

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

            await addService(data);

            toast.success("Service Added Successfully");

            reset();

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Unable to add service"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center py-10">

            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl">

                <h1 className="text-3xl font-bold mb-8">
                    Add Service History
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
                        type="date"
                        {...register("serviceDate", { required: true })}
                        className="border p-3 rounded"
                    />

                    <input
                        placeholder="Service Center"
                        {...register("serviceCenter", { required: true })}
                        className="border p-3 rounded"
                    />

                    <input
                        placeholder="Technician Name"
                        {...register("technicianName")}
                        className="border p-3 rounded"
                    />

                    <input
                        type="number"
                        step="0.01"
                        placeholder="Cost"
                        {...register("cost", { required: true })}
                        className="border p-3 rounded"
                    />

                    <input
                        placeholder="Invoice URL"
                        {...register("invoiceUrl")}
                        className="border p-3 rounded"
                    />

                    <textarea
                        rows="4"
                        placeholder="Description"
                        {...register("description", { required: true })}
                        className="border p-3 rounded col-span-2"
                    />

                    <textarea
                        rows="3"
                        placeholder="Notes"
                        {...register("notes")}
                        className="border p-3 rounded col-span-2"
                    />

                    <button
                        className="bg-blue-600 text-white py-3 rounded-lg col-span-2"
                    >
                        {loading ? "Saving..." : "Add Service"}
                    </button>

                </form>

            </div>

        </div>

    );

}
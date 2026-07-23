import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ArrowLeft, Pencil } from "lucide-react";

import { getWarranty } from "../../services/warrantyService";

export default function WarrantyDetails() {

  const { productId } = useParams();

  const navigate = useNavigate();

  const [warranty, setWarranty] = useState(null);

  useEffect(() => {

    loadWarranty();

  }, [productId]);

  const loadWarranty = async () => {

    try {

      const response = await getWarranty(productId);

      setWarranty(response.data);

    } catch (error) {

      console.error(error);

      toast.error("Unable to load warranty");

    }

  };

  if (!warranty) {

    return (

      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-slate-900 text-slate-800 dark:text-white transition-colors duration-300">

        Loading...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-8 transition-colors duration-300">

      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 transition-colors duration-300">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">

            Warranty Details

          </h1>

          <div className="flex gap-3">

            <button
              onClick={() => navigate("/warranty")}
              className="px-4 py-2 rounded-lg bg-gray-600 text-white"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              onClick={() =>
                navigate(`/warranty/edit/${productId}`)
              }
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              <Pencil size={18} />
            </button>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">
                    {/* Product Name */}

          <div>

            <p className="text-gray-500 dark:text-gray-400 text-sm">

              Product Name

            </p>

            <p className="font-semibold text-lg text-slate-800 dark:text-white">

              {warranty.productName}

            </p>

          </div>

          {/* Provider */}

          <div>

            <p className="text-gray-500 dark:text-gray-400 text-sm">

              Warranty Provider

            </p>

            <p className="font-semibold text-lg text-slate-800 dark:text-white">

              {warranty.provider}

            </p>

          </div>

          {/* Warranty Type */}

          <div>

            <p className="text-gray-500 dark:text-gray-400 text-sm">

              Warranty Type

            </p>

            <p className="font-semibold text-lg text-slate-800 dark:text-white">

              {warranty.warrantyType}

            </p>

          </div>

          {/* Start Date */}

          <div>

            <p className="text-gray-500 dark:text-gray-400 text-sm">

              Start Date

            </p>

            <p className="font-semibold text-lg text-slate-800 dark:text-white">

              {warranty.startDate}

            </p>

          </div>

          {/* End Date */}

          <div>

            <p className="text-gray-500 dark:text-gray-400 text-sm">

              End Date

            </p>

            <p className="font-semibold text-lg text-slate-800 dark:text-white">

              {warranty.endDate}

            </p>

          </div>

          {/* Status */}

          <div>

            <p className="text-gray-500 dark:text-gray-400 text-sm">

              Status

            </p>

            {new Date(warranty.endDate) < new Date() ? (

              <span className="inline-block mt-1 px-3 py-1 rounded-full bg-red-100 text-red-700 font-medium">

                Expired

              </span>

            ) : new Date(warranty.endDate) <
              new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? (

              <span className="inline-block mt-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">

                Expiring Soon

              </span>

            ) : (

              <span className="inline-block mt-1 px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">

                Active

              </span>

            )}

          </div>

          {/* Terms */}

          <div className="md:col-span-2">

            <p className="text-gray-500 text-sm mb-2">

              Terms & Conditions

            </p>

            <div className="bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-xl p-4 whitespace-pre-wrap text-slate-700 dark:text-slate-200">

              {warranty.terms || "No terms available."}

            </div>

          </div>

        </div>

      </div>
      {/* Warranty Card */}
{/* Warranty Card */}

<div className="md:col-span-2 mt-6">

  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">

    Warranty Card

  </h3>

  {warranty.warrantyCardUrl ? (

    <div className="rounded-2xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 p-6">

      <img
        src={warranty.warrantyCardUrl}
        alt="Warranty Card"
        className="mx-auto max-h-[500px] rounded-xl shadow-lg object-contain"
      />

    </div>

  ) : (

    <div className="rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-600 p-10 text-center">

      <p className="text-gray-500">

        No Warranty Card Uploaded

      </p>

    </div>

  )}

</div>
    </div>

  );

}
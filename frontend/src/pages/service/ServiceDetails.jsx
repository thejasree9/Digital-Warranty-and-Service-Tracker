import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ArrowLeft, Pencil } from "lucide-react";

import { getService } from "../../services/serviceHistoryService";

export default function ServiceDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [service, setService] = useState(null);

  useEffect(() => {

    loadService();

  }, [id]);

  const loadService = async () => {

    try {

      const response = await getService(id);

      setService(response.data);

    } catch (error) {

      console.error(error);

      toast.error("Unable to load service");

    }

  };

  if (!service) {

    return (

      <div className="flex justify-center items-center h-screen">

        Loading...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">

            Service Details

          </h1>

          <div className="flex gap-3">

            <button
              onClick={() => navigate("/services")}
              className="px-4 py-2 rounded-lg bg-gray-600 text-white"
            >

              <ArrowLeft size={18} />

            </button>

            <button
              onClick={() =>
                navigate(`/services/edit/${id}`)
              }
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            >

              <Pencil size={18} />

            </button>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">
                  {/* Product */}

          <div>

            <p className="text-gray-500 text-sm">

              Product

            </p>

            <p className="font-semibold text-lg">

              {service.productName}

            </p>

          </div>

          {/* Service Center */}

          <div>

            <p className="text-gray-500 text-sm">

              Service Center

            </p>

            <p className="font-semibold text-lg">

              {service.serviceCenter}

            </p>

          </div>

          {/* Service Date */}

          <div>

            <p className="text-gray-500 text-sm">

              Service Date

            </p>

            <p className="font-semibold text-lg">

              {service.serviceDate}

            </p>

          </div>

          {/* Cost */}

          <div>

            <p className="text-gray-500 text-sm">

              Service Cost

            </p>

            <p className="font-semibold text-lg text-green-600">

              ₹ {service.cost}

            </p>

          </div>

          {/* Technician */}

          <div>

            <p className="text-gray-500 text-sm">

              Technician

            </p>

            <p className="font-semibold text-lg">

              {service.technicianName || "-"}

            </p>

          </div>

          {/* Description */}

          <div>

            <p className="text-gray-500 text-sm">

              Description

            </p>

            <p className="font-semibold text-lg">

              {service.description}

            </p>

          </div>

          {/* Invoice */}

          <div className="md:col-span-2">

            <p className="text-gray-500 text-sm mb-2">

              Invoice

            </p>

            {service.invoiceUrl ? (

              <a
                href={service.invoiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >

                View Invoice

              </a>

            ) : (

              <p className="text-gray-500">

                No invoice uploaded.

              </p>

            )}

          </div>

          {/* Notes */}

          <div className="md:col-span-2">

            <p className="text-gray-500 text-sm mb-2">

              Notes

            </p>

            <div className="bg-gray-50 border rounded-xl p-4 whitespace-pre-wrap">

              {service.notes || "No notes available."}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}
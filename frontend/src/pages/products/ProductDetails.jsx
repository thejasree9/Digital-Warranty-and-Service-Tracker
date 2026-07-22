import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ArrowLeft, Pencil } from "lucide-react";

import { getProduct } from "../../services/productService";

export default function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {

    loadProduct();

  }, [id]);

  const loadProduct = async () => {

    try {

      const response = await getProduct(id);

      setProduct(response.data);

    } catch (error) {

      console.error(error);

      toast.error("Unable to load product");

    }

  };

  if (!product) {

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

            Product Details

          </h1>

          <div className="flex gap-3">

            <button
              onClick={() => navigate("/products")}
              className="px-4 py-2 rounded-lg bg-gray-600 text-white"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              onClick={() => navigate(`/products/edit/${id}`)}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              <Pencil size={18} />
            </button>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <p className="font-semibold">Product Name</p>

            <p>{product.productName}</p>

          </div>

          <div>

            <p className="font-semibold">Brand</p>

            <p>{product.brand}</p>

          </div>

          <div>

            <p className="font-semibold">Model</p>

            <p>{product.model}</p>

          </div>

          <div>

            <p className="font-semibold">Serial Number</p>

            <p>{product.serialNumber}</p>

          </div>

          <div>

            <p className="font-semibold">Purchase Date</p>

            <p>{product.purchaseDate}</p>

          </div>

          <div>

            <p className="font-semibold">Price</p>

            <p>₹ {product.price}</p>

          </div>

          <div className="md:col-span-2">

            <p className="font-semibold mb-2">

              Invoice

            </p>

            {product.invoiceUrl ? (

              <a
                href={product.invoiceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                View Invoice
              </a>

            ) : (

              <p>No Invoice Uploaded</p>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}
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

    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-8 transition-colors duration-300">

      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 transition-colors duration-300">

        <div className="flex justify-between items-center mb-8">

  <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
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

<hr className="mb-8 border-gray-200 dark:border-slate-700" />

<div className="grid md:grid-cols-2 gap-6">

          <div>

            <p className="font-semibold text-slate-700 dark:text-slate-200">Product Name</p>

            <p className="text-slate-600 dark:text-slate-300">
  {product.productName}
</p>

          </div>

          <div>

            <p className="font-semibold text-slate-700 dark:text-slate-200">Brand</p>

            <p className="text-slate-600 dark:text-slate-300">
  {product.brand}
</p>

          </div>

          <div>

            <p className="font-semibold text-slate-700 dark:text-slate-200">Model</p>

            <p className="text-slate-600 dark:text-slate-300">
  {product.model}
</p>

          </div>

          <div>

            <p className="font-semibold text-slate-700 dark:text-slate-200">Serial Number</p>

            <p className="text-slate-600 dark:text-slate-300">
  {product.serialNumber}
</p>

          </div>

          <div>

            <p className="font-semibold text-slate-700 dark:text-slate-200">Purchase Date</p>

            <p className="text-slate-600 dark:text-slate-300">
  {product.purchaseDate}
</p>

          </div>

          <div>

            <p className="font-semibold text-slate-700 dark:text-slate-200">Price</p>

            <p className="text-green-600 dark:text-green-400 font-semibold">
  ₹ {product.price}
</p>

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
                className="text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
              >
                View Invoice
              </a>

            ) : (

              <p className="text-slate-500 dark:text-slate-400">
  No Invoice Uploaded
</p>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}
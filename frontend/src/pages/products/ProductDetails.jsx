import { useEffect, useState } from "react";
import { getProduct } from "../../services/productService";
import { toast } from "react-hot-toast";

export default function ProductDetails({ productId }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const response = await getProduct(productId);
      setProduct(response.data);
    } catch (error) {
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
    <div className="min-h-screen bg-gray-100 flex justify-center p-10">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-8">

        <h1 className="text-3xl font-bold mb-8">
          Product Details
        </h1>

        <div className="grid grid-cols-2 gap-6">

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

          <div className="col-span-2">
            <p className="font-semibold">Invoice URL</p>

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
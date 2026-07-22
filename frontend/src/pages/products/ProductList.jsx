import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  getProducts,
  deleteProduct,
  searchByName,
} from "../../services/productService";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts();

      setProducts(response.data.content);

    } catch (error) {
      toast.error("Unable to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this product?")) return;

    try {

      await deleteProduct(id);

      toast.success("Product Deleted");

      loadProducts();

    } catch (error) {

      toast.error("Delete Failed");

    }
  };

  const handleSearch = async () => {

    if (search.trim() === "") {

      loadProducts();
      return;

    }

    try {

      const response = await searchByName(search);

      setProducts(response.data);

    } catch (error) {

      toast.error("No Products Found");

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Products
          </h1>

        </div>

        {/* Search */}

        <div className="flex gap-3 mb-6">

          <input
            type="text"
            placeholder="Search Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg p-2 flex-1"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-5 rounded-lg"
          >
            Search
          </button>

          <button
            onClick={loadProducts}
            className="bg-gray-600 text-white px-5 rounded-lg"
          >
            Refresh
          </button>

        </div>

        {/* Table */}

        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="p-3">Product</th>
                <th className="p-3">Brand</th>
                <th className="p-3">Model</th>
                <th className="p-3">Price</th>
                <th className="p-3">Purchase Date</th>
                <th className="p-3">Actions</th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-6"
                  >
                    Loading...
                  </td>

                </tr>

              ) : products.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-6"
                  >
                    No Products Found
                  </td>

                </tr>

              ) : (

                products.map((product) => (

                  <tr
                    key={product.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3">
                      {product.productName}
                    </td>

                    <td className="p-3">
                      {product.brand}
                    </td>

                    <td className="p-3">
                      {product.model}
                    </td>

                    <td className="p-3">
                      ₹{product.price}
                    </td>

                    <td className="p-3">
                      {product.purchaseDate}
                    </td>

                    <td className="p-3 flex gap-2">

                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        View
                      </button>

                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

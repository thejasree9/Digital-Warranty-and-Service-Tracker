import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  Eye,
  Pencil,
  Trash2,
  Search,
  RefreshCcw,
  Plus,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  getProducts,
  deleteProduct,
} from "../../services/productService";

export default function ProductList() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);

  const [totalPages, setTotalPages] = useState(0);

  const [sortBy, setSortBy] = useState("productName");

  const [direction, setDirection] = useState("asc");

  useEffect(() => {

    loadProducts();

  }, [page]);

  const loadProducts = async () => {

    try {

      setLoading(true);

      const response = await getProducts(
        page,
        100,
        sortBy,
        direction
      );

      if (response.success) {

        setProducts(response.data.products || []);

        setTotalPages(response.data.totalPages || 0);

      } else {

        toast.error("Unable to load products");

      }

    } catch (error) {

      console.error(error);

      toast.error("Failed to load products");

    } finally {

      setLoading(false);

    }

  };

  const filteredProducts = useMemo(() => {

    if (!search.trim()) return products;

    const keyword = search.toLowerCase();

    return products.filter((product) => {

      return (

        product.productName?.toLowerCase().includes(keyword) ||

        product.brand?.toLowerCase().includes(keyword) ||

        product.model?.toLowerCase().includes(keyword) ||

        product.serialNumber?.toLowerCase().includes(keyword) ||

        String(product.price).includes(keyword) ||

        product.purchaseDate?.includes(keyword)

      );

    });

  }, [products, search]);

  const handleDelete = async (id) => {

    if (!id) {

      toast.error("Invalid Product");

      return;

    }

    const result = await Swal.fire({

      title: "Delete Product?",

      text: "This action cannot be undone.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#dc2626",

      cancelButtonColor: "#6b7280",

      confirmButtonText: "Yes, Delete",

      cancelButtonText: "Cancel",

    });

    if (!result.isConfirmed) return;

    try {

      const response = await deleteProduct(id);

      toast.success(response.message);

      loadProducts();

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Delete Failed"

      );

    }

  };

  const nextPage = () => {

    if (page < totalPages - 1)

      setPage(page + 1);

  };

  const previousPage = () => {

    if (page > 0)

      setPage(page - 1);

  };
  return (
  <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-8 transition-all duration-300">

    <div className="max-w-7xl mx-auto">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-800 dark:text-white flex items-center gap-3">

            <Package className="text-blue-600" size={34} />

            Products

          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-2">

            Manage all your registered products in one place.

          </p>

        </div>

        <button
          onClick={() => navigate("/products/add")}
          className="
            mt-5
            md:mt-0
            flex
            items-center
            gap-2
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-xl
            shadow-lg
            transition-all
          "
        >

          <Plus size={20} />

          Add Product

        </button>

      </div>

      {/* Smart Search */}

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-8">

        <div className="relative">

          <Search
            size={20}
            className="
              absolute
              left-5
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search by Product Name, Brand, Model, Serial Number, Price or Purchase Date..."
            className="
              w-full
              pl-14
              pr-32
              py-4
              rounded-xl
              border
              border-gray-300
              dark:border-slate-600
              bg-white
              dark:bg-slate-700
              text-slate-800
              dark:text-white
              focus:ring-2
              focus:ring-blue-500
              outline-none
              transition
            "
          />

          {search && (

            <button
              onClick={() => setSearch("")}
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                flex
                items-center
                gap-2
                bg-gray-100
                dark:bg-slate-700
                hover:bg-gray-200
                dark:hover:bg-slate-600
                px-4
                py-2
                rounded-lg
                transition
              "
            >

              <RefreshCcw size={16} />

              Clear

            </button>

          )}

        </div>


      </div>
            {/* Products Table */}

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="text-left px-6 py-4">Product</th>

                <th className="text-left px-6 py-4">Brand</th>

                <th className="text-left px-6 py-4">Model</th>

                <th className="text-left px-6 py-4">Price</th>

                <th className="text-left px-6 py-4">Purchase Date</th>

                <th className="text-center px-6 py-4">Actions</th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-12 text-gray-500"
                  >
                    Loading Products...
                  </td>

                </tr>

              ) : filteredProducts.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-12 text-gray-500 dark:text-gray-400"
                  >

                    No Products Found

                  </td>

                </tr>

              ) : (

                filteredProducts.map((product) => (

                  <tr
                    key={product.id}
                    className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                  >

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center">

                          <Package
                            className="text-blue-600"
                            size={28}
                          />

                        </div>

                        <div>

                          <h3 className="font-semibold text-slate-800 dark:text-white">

                            {product.productName}

                          </h3>

                          <p className="text-sm text-gray-500">

                            Serial : {product.serialNumber}

                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="px-6 py-5">

                      {product.brand}

                    </td>

                    <td className="px-6 py-5">

                      {product.model}

                    </td>

                    <td className="px-6 py-5 font-semibold text-green-600">

                      ₹{product.price}

                    </td>

                    <td className="px-6 py-5">

                      {product.purchaseDate}

                    </td>

                    <td className="px-6 py-5">

                      <div className="flex justify-center gap-3">

                        <button
                          onClick={() =>
                            navigate(`/products/${product.id}`)
                          }
                          className="p-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 transition"
                        >

                          <Eye size={18} />

                        </button>

                        <button
                          onClick={() =>
                            navigate(`/products/edit/${product.id}`)
                          }
                          className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-600 transition"
                        >

                          <Pencil size={18} />

                        </button>

                        <button
                          onClick={() =>
                            handleDelete(product.id)
                          }
                          className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition"
                        >

                          <Trash2 size={18} />

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>
                      </div>

      </div>

      {/* Footer */}

      {!loading && (

        <div className="flex flex-col lg:flex-row justify-between items-center bg-white dark:bg-slate-800 rounded-2xl shadow-lg mt-6 p-6">

          {/* Search Result Count */}

          <div>

            {search ? (

              <p className="text-gray-600 dark:text-gray-300">

                Showing

                <span className="font-bold text-blue-600">

                  {" "}
                  {filteredProducts.length}{" "}

                </span>

                result{filteredProducts.length !== 1 ? "s" : ""}

                for

                <span className="font-semibold">

                  {" "}
                  "{search}"

                </span>

              </p>

            ) : (

              <p className="text-gray-600 dark:text-gray-300">

                Showing

                <span className="font-bold text-blue-600">

                  {" "}
                  {filteredProducts.length}{" "}

                </span>

                product{filteredProducts.length !== 1 ? "s" : ""}

              </p>

            )}

          </div>

          {/* Pagination */}

          <div className="flex items-center gap-3 mt-5 lg:mt-0">

            <button

              onClick={previousPage}

              disabled={page === 0}

              className={`flex items-center gap-2 px-5 py-2 rounded-xl transition

                ${
                  page === 0

                    ? "bg-gray-200 dark:bg-slate-700 text-gray-400 cursor-not-allowed"

                    : "bg-gray-700 hover:bg-gray-800 text-white"

                }`}

            >

              <ChevronLeft size={18} />

              Previous

            </button>

            <div className="px-5 py-2 rounded-xl bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold">

              Page {page + 1}

              {totalPages > 0 && ` of ${totalPages}`}

            </div>

            <button

              onClick={nextPage}

              disabled={page >= totalPages - 1}

              className={`flex items-center gap-2 px-5 py-2 rounded-xl transition

                ${
                  page >= totalPages - 1

                    ? "bg-gray-200 dark:bg-slate-700 text-gray-400 cursor-not-allowed"

                    : "bg-blue-600 hover:bg-blue-700 text-white"

                }`}

            >

              Next

              <ChevronRight size={18} />

            </button>

          </div>

        </div>

      )}

    </div>

  </div>

);
}
        

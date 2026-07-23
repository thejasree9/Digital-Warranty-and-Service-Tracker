import { useEffect, useState } from "react";
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
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  getProducts,
  deleteProduct,
  searchProducts,
} from "../../services/productService";

export default function ProductList() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);

  const [totalPages, setTotalPages] = useState(0);

  const [categoryFilter, setCategoryFilter] = useState("");

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
        5,
        sortBy,
        direction
      );

      console.log("Product Response");
      console.log(response);

      if (response.success) {

        setProducts(response.data.products|| []);

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

  const handleSearch = async () => {

    if (search.trim() === "") {

      loadProducts();

      return;

    }

    try {

      const response = await searchProducts(search);

      if (response.success) {

        setProducts(response.data || []);

      } else {

        setProducts([]);

      }

    } catch (error) {

      console.error(error);

      toast.error("No matching products found");

    }

  };

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

  await loadProducts();

} catch (error) {

  console.error(error);

  toast.error(
    error.response?.data?.message || "Delete failed"
  );

}
  };

  const nextPage = () => {

    if (page < totalPages - 1) {

      setPage(page + 1);

    }

  };

  const previousPage = () => {

    if (page > 0) {

      setPage(page - 1);

    }

  };
  return (

<div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-8 transition-colors">

<div className="max-w-7xl mx-auto">

{/* Header */}

<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-8">

<div>

<h1 className="text-3xl font-bold text-slate-800 dark:text-white">
Products
</h1>

<p className="text-slate-500 dark:text-slate-400 mt-2">
Manage all your registered products in one place.
</p>

</div>

<button
onClick={() => navigate("/products/add")}
className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-md transition"
>

<Plus size={20} />

Add Product

</button>

</div>

{/* Search Card */}

<div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 mb-8 transition-colors">

<div className="grid grid-cols-1 md:grid-cols-4 gap-4">

{/* Search */}

<div className="relative md:col-span-2">

<Search
size={18}
className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
/>

<input
type="text"
placeholder="Search by Product Name..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
onKeyDown={(e)=>{
if(e.key==="Enter"){
handleSearch();
}
}}
className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
/>

</div>

{/* Category */}

<select

value={categoryFilter}

onChange={(e)=>setCategoryFilter(e.target.value)}

className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl px-4 py-3"

>

<option value="">
All Categories
</option>

<option>
Laptop
</option>

<option>
Mobile
</option>

<option>
TV
</option>

<option>
Refrigerator
</option>

<option>
Air Conditioner
</option>

<option>
Printer
</option>

<option>
Washing Machine
</option>

<option>
Other
</option>

</select>

{/* Buttons */}

<div className="flex gap-3">

<button

onClick={handleSearch}

className="flex-1 flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"

>

<Search size={18}/>

Search

</button>

<button

onClick={loadProducts}

className="flex justify-center items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 rounded-xl"

>

<RefreshCcw size={18}/>

</button>

</div>

</div>

</div>

{/* Product Table */}

<div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md overflow-hidden transition-colors">

<table className="w-full">

<thead className="bg-blue-600 text-white">

<tr>

<th className="text-left p-4">
Product
</th>

<th className="text-left p-4">
Brand
</th>

<th className="text-left p-4">
Model
</th>

<th className="text-left p-4">
Price
</th>

<th className="text-left p-4">
Purchase Date
</th>

<th className="text-center p-4">
Actions
</th>

</tr>

</thead>
<tbody>

{loading ? (

<tr>

<td
colSpan="6"
className="py-16 text-center"
>

<div className="flex flex-col items-center">

<div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

<p className="mt-4 text-gray-500 dark:text-gray-400">
Loading Products...
</p>

</div>

</td>

</tr>

) : products.length === 0 ? (

<tr>

<td
colSpan="6"
className="py-16"
>

<div className="flex flex-col items-center">

<Package
size={70}
className="text-gray-300"
/>

<h2 className="mt-5 text-2xl font-semibold text-gray-700 dark:text-white">

No Products Found

</h2>

<p className="mt-2 text-gray-500 dark:text-gray-400">

There are no registered products.

</p>

<button

onClick={() => navigate("/products/add")}

className="mt-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"

>

<Plus size={18}/>

Add Product

</button>

</div>

</td>

</tr>

) : (

products.map((product) => (

<tr
key={product.id}
className="border-b border-gray-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-700 transition"
>

{/* Product */}

<td className="p-4">

<div className="flex items-center gap-4">

<img

src={
product.invoiceUrl ||
"https://placehold.co/70x70?text=📦"
}

alt={product.productName}

className="w-14 h-14 rounded-xl object-cover border"

/>

<div>

<h3 className="font-semibold text-slate-800 dark:text-white">

{product.productName}

</h3>

<p className="text-sm text-gray-500 dark:text-gray-400">

Serial :

{product.serialNumber || "N/A"}

</p>

</div>

</div>

</td>

{/* Brand */}

<td className="p-4 text-slate-700 dark:text-slate-200">

{product.brand}

</td>

{/* Model */}

<td className="p-4">

{product.model}

</td>

{/* Price */}

<td className="p-4">

<span className="font-semibold text-green-600">

₹ {product.price}

</span>

</td>

{/* Purchase Date */}

<td className="p-4">

{product.purchaseDate}

</td>

{/* Actions */}

<td className="p-4">

<div className="flex justify-center gap-3">

<button

title="View Product"

onClick={() => {

if(product.id){

navigate(`/products/${product.id}`);

}else{

toast.error("Invalid Product");

}

}}

className="p-2 rounded-lg bg-green-100 hover:bg-green-200 transition"

>

<Eye
size={18}
className="text-green-700"
/>

</button>

<button

title="Edit Product"

onClick={() => {

if(product.id){

navigate(`/products/edit/${product.id}`);

}else{

toast.error("Invalid Product");

}

}}

className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 transition"

>

<Pencil
size={18}
className="text-yellow-700"
/>

</button>

<button

title="Delete Product"

onClick={() => handleDelete(product.id)}

className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition"

>

<Trash2
size={18}
className="text-red-700"
/>

</button>

</div>

</td>

</tr>

))

)}

</tbody>
          </table>

        </div>

        {/* Footer */}

        {!loading && (

          <div className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-slate-800 rounded-2xl shadow-md mt-6 p-5 transition-colors">

            {/* Product Count */}

            <p className="text-gray-600 dark:text-gray-300">

              Showing

              <span className="font-semibold text-blue-600">
                {" "}
                {products.length}
                {" "}
              </span>

              product{products.length !== 1 ? "s" : ""}

            </p>

            {/* Pagination */}

            <div className="flex items-center gap-3 mt-4 md:mt-0">

              <button

                onClick={previousPage}

                disabled={page === 0}

                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition

                  ${page === 0

                    ? "bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"

                    : "bg-gray-700 hover:bg-gray-800 text-white"

                  }`}

              >

                <ChevronLeft size={18} />

                Previous

              </button>

              <div className="px-5 py-2 rounded-xl bg-blue-50 text-blue-700 font-semibold">

                Page {page + 1}

                {totalPages > 0 && ` of ${totalPages}`}

              </div>

              <button

                onClick={nextPage}

                disabled={page >= totalPages - 1}

                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition

                  ${page >= totalPages - 1

                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"

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
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { toast } from "react-hot-toast";
import { getProducts } from "../../services/productService";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ProductChart = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {

    try {

      // Load all products
      const response = await getProducts(0, 100);

      const products = response.data.products;

      // Initialize every month with 0
      const monthlyCount = {};

      months.forEach((month) => {
        monthlyCount[month] = 0;
      });

      // Count products by created month
      products.forEach((product) => {

        if (product.createdAt) {

          const date = new Date(product.createdAt);

          const month = months[date.getMonth()];

          monthlyCount[month]++;

        }

      });

      const chartData = months.map((month) => ({
        month,
        products: monthlyCount[month],
      }));

      setData(chartData);

    } catch (error) {

      console.error(error);

      toast.error("Unable to load product chart");

    }

  };

  return (

    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-xl font-semibold mb-4">
        Monthly Products Added
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Bar
            dataKey="products"
            fill="#2563EB"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

};

export default ProductChart;
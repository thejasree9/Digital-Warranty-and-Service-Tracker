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
import { useTheme } from "../../context/ThemeContext";

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

  const { darkMode } = useTheme();

  const [data, setData] = useState([]);

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {

    try {

      const response = await getProducts(0, 100);

      const products = response.data.products || [];

      const monthlyCount = {};

      months.forEach((month) => {
        monthlyCount[month] = 0;
      });

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

    <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-md p-6 transition-all duration-300">

      <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
        Monthly Products Added
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <BarChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? "#475569" : "#e5e7eb"}
          />

          <XAxis
            dataKey="month"
            stroke={darkMode ? "#ffffff" : "#475569"}
          />

          <YAxis
            allowDecimals={false}
            stroke={darkMode ? "#ffffff" : "#475569"}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? "#0f172a" : "#ffffff",
              border: "none",
              borderRadius: "10px",
              color: darkMode ? "#ffffff" : "#000000",
            }}
          />

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
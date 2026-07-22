import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { useTheme } from "../../context/ThemeContext";

const data = [
  { month: "Jan", products: 8 },
  { month: "Feb", products: 12 },
  { month: "Mar", products: 15 },
  { month: "Apr", products: 18 },
  { month: "May", products: 22 },
  { month: "Jun", products: 28 },
];

const ProductChart = () => {
  const { darkMode } = useTheme();

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
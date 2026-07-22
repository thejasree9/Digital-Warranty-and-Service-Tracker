import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

const data = [
  { name: "Active", value: 43 },
  { name: "Expiring", value: 10 },
  { name: "Expired", value: 15 },
];

const COLORS = ["#2563EB", "#F59E0B", "#EF4444"];

const WarrantyChart = () => {
  const { darkMode } = useTheme();

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-md p-6 transition-all duration-300">

      <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
        Warranty Status
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={110}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? "#0f172a" : "#ffffff",
              border: "none",
              borderRadius: "10px",
              color: darkMode ? "#ffffff" : "#000000",
            }}
          />

          <Legend
            wrapperStyle={{
              color: darkMode ? "#ffffff" : "#000000",
            }}
          />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
};

export default WarrantyChart;
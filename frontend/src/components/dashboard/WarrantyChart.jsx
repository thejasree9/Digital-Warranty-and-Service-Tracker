import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { toast } from "react-hot-toast";

import { getWarranties } from "../../services/warrantyService";

const COLORS = ["#2563EB", "#F59E0B", "#EF4444"];

const WarrantyChart = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    loadWarrantyChart();
  }, []);

  const loadWarrantyChart = async () => {

    try {

      const response = await getWarranties();

      const warranties = response.data;

      const today = new Date();

      let active = 0;
      let expiring = 0;
      let expired = 0;

      warranties.forEach((item) => {

        const endDate = new Date(item.endDate);

        const diffDays =
          (endDate - today) / (1000 * 60 * 60 * 24);

        if (diffDays < 0) {

          expired++;

        } else if (diffDays <= 30) {

          expiring++;

        } else {

          active++;

        }

      });

      setData([
        {
          name: "Active",
          value: active,
        },
        {
          name: "Expiring Soon",
          value: expiring,
        },
        {
          name: "Expired",
          value: expired,
        },
      ]);

    } catch (error) {

      console.error(error);

      toast.error("Unable to load warranty chart");

    }

  };

  return (

    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-xl font-semibold mb-4">
        Warranty Status
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

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

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

};

export default WarrantyChart;
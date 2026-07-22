const StatisticsCard = ({
  title,
  value,
  percentage,
  color,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div
          className={`text-sm px-3 py-1 rounded-full ${color}`}
        >
          {percentage}
        </div>

      </div>

    </div>
  );
};

export default StatisticsCard;
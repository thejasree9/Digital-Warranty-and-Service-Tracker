const StatisticsCard = ({
  title,
  value,
  percentage,
  color,
}) => {
  return (
    <div
      className="
        bg-white
        dark:bg-slate-900
        rounded-2xl
        shadow
        dark:shadow-slate-950/40
        border
        border-gray-100
        dark:border-slate-700
        p-6
        transition-all
        duration-300
        hover:shadow-xl
      "
    >
      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500 dark:text-gray-400 transition-colors duration-300">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2 text-slate-800 dark:text-white transition-colors duration-300">
            {value}
          </h2>

        </div>

        <div
          className={`
            text-sm
            px-3
            py-1
            rounded-full
            font-semibold
            ${color}
          `}
        >
          {percentage}
        </div>

      </div>
    </div>
  );
};

export default StatisticsCard;
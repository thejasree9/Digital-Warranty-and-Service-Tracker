import { motion } from "framer-motion";

const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        relative
        overflow-hidden
        bg-white
        dark:bg-slate-900
        rounded-2xl
        shadow-md
        hover:shadow-xl
        dark:shadow-black/30
        border
        border-gray-100
        dark:border-slate-700
        p-6
        flex
        justify-between
        items-center
        transition-all
        duration-300
      "
    >
      {/* Left Border */}
      <div
        className={`absolute left-0 top-0 h-full w-1 ${color}`}
      />

      {/* Content */}
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-300">
          {title}
        </p>

        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mt-2 transition-colors duration-300">
          {value}
        </h2>

        <p className="text-xs text-green-600 dark:text-green-400 mt-2">
          ↑ Updated today
        </p>
      </div>

      {/* Icon */}
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg ${color}`}
      >
        {icon}
      </div>
    </motion.div>
  );
};

export default DashboardCard;
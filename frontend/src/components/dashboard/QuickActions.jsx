import {
  Plus,
  ShieldPlus,
  Wrench,
  Bell,
} from "lucide-react";

const QuickActions = () => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-md p-6 transition-all duration-300">

      <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <button
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            rounded-xl
            p-4
            flex
            flex-col
            items-center
            gap-2
            transition-all
            duration-300
            hover:scale-105
            active:scale-95
            shadow-md
          "
        >
          <Plus size={26} />
          <span className="font-medium">Add Product</span>
        </button>

        <button
          className="
            bg-green-600
            hover:bg-green-700
            text-white
            rounded-xl
            p-4
            flex
            flex-col
            items-center
            gap-2
            transition-all
            duration-300
            hover:scale-105
            active:scale-95
            shadow-md
          "
        >
          <ShieldPlus size={26} />
          <span className="font-medium">Add Warranty</span>
        </button>

        <button
          className="
            bg-orange-500
            hover:bg-orange-600
            text-white
            rounded-xl
            p-4
            flex
            flex-col
            items-center
            gap-2
            transition-all
            duration-300
            hover:scale-105
            active:scale-95
            shadow-md
          "
        >
          <Wrench size={26} />
          <span className="font-medium">Book Service</span>
        </button>

        <button
          className="
            bg-red-500
            hover:bg-red-600
            text-white
            rounded-xl
            p-4
            flex
            flex-col
            items-center
            gap-2
            transition-all
            duration-300
            hover:scale-105
            active:scale-95
            shadow-md
          "
        >
          <Bell size={26} />
          <span className="font-medium">View Alerts</span>
        </button>

      </div>
    </div>
  );
};

export default QuickActions;
import {
  Plus,
  ShieldPlus,
  Wrench,
  Bell,
} from "lucide-react";

const QuickActions = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-4 flex flex-col items-center gap-2">
          <Plus size={26} />
          Add Product
        </button>

        <button className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-4 flex flex-col items-center gap-2">
          <ShieldPlus size={26} />
          Add Warranty
        </button>

        <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl p-4 flex flex-col items-center gap-2">
          <Wrench size={26} />
          Book Service
        </button>

        <button className="bg-red-500 hover:bg-red-600 text-white rounded-xl p-4 flex flex-col items-center gap-2">
          <Bell size={26} />
          View Alerts
        </button>

      </div>
    </div>
  );
};

export default QuickActions;
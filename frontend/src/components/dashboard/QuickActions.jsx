import { useNavigate } from "react-router-dom";
import {
  PlusCircle,
  ShieldCheck,
  Wrench,
  User,
} from "lucide-react";

const QuickActions = () => {

  const navigate = useNavigate();

  const actions = [
    {
      title: "Add Product",
      icon: <PlusCircle size={24} />,
      color: "bg-blue-600 hover:bg-blue-700",
      path: "/products/add",
    },
    {
      title: "Add Warranty",
      icon: <ShieldCheck size={24} />,
      color: "bg-green-600 hover:bg-green-700",
      path: "/warranty/add",
    },
    {
      title: "Add Service",
      icon: <Wrench size={24} />,
      color: "bg-orange-500 hover:bg-orange-600",
      path: "/services/add",
    },
    {
      title: "My Profile",
      icon: <User size={24} />,
      color: "bg-purple-600 hover:bg-purple-700",
      path: "/profile",
    },
  ];

  return (

    <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-md p-6 transition-all duration-300">

      <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">

        {actions.map((action) => (

          <button
            key={action.title}
            onClick={() => navigate(action.path)}
            className={`
              ${action.color}
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
            `}
          >
            {action.icon}

            <span className="font-medium">
              {action.title}
            </span>

          </button>

        ))}

      </div>

    </div>

  );

};

export default QuickActions;
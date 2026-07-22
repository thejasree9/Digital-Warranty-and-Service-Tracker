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
      icon: <PlusCircle size={22} />,
      color: "bg-blue-600",
      path: "/products/add",
    },
    {
      title: "Add Warranty",
      icon: <ShieldCheck size={22} />,
      color: "bg-green-600",
      path: "/warranty/add",
    },
    {
      title: "Add Service",
      icon: <Wrench size={22} />,
      color: "bg-orange-500",
      path: "/services/add",
    },
    {
      title: "My Profile",
      icon: <User size={22} />,
      color: "bg-purple-600",
      path: "/profile",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">

        {actions.map((action) => (

          <button
            key={action.title}
            onClick={() => navigate(action.path)}
            className={`${action.color} text-white rounded-xl p-5 hover:scale-105 transition duration-200 flex flex-col items-center gap-3`}
          >
            {action.icon}

            <span className="font-semibold">
              {action.title}
            </span>

          </button>

        ))}

      </div>

    </div>
  );
};

export default QuickActions;
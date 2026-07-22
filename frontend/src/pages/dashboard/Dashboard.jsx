import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import DashboardCard from "../../components/dashboard/DashboardCard";

import {
  Package,
  ShieldCheck,
  Wrench,
  AlertTriangle,
  IndianRupee,
} from "lucide-react";

import WarrantyChart from "../../components/dashboard/WarrantyChart";
import ProductChart from "../../components/dashboard/ProductChart";
import RecentActivity from "../../components/dashboard/RecentActivity";
import QuickActions from "../../components/dashboard/QuickActions";
import UpcomingWarranty from "../../components/dashboard/UpcomingWarranty";
import UpcomingServices from "../../components/dashboard/UpcomingServices";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

import { getDashboard } from "../../services/dashboardService";

const Dashboard = () => {

  const [dashboard, setDashboard] = useState({
    totalProducts: 0,
    activeWarranties: 0,
    expiredWarranties: 0,
    expiringSoon: 0,
    totalServices: 0,
    totalMaintenanceCost: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const response = await getDashboard();

      setDashboard(response.data);

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Unable to load dashboard"
      );

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-xl font-semibold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (

    <div className="space-y-8">

      {/* Header */}

      <DashboardHeader />

      <WelcomeBanner />

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <DashboardCard
          title="Total Products"
          value={dashboard.totalProducts}
          icon={<Package className="text-white" size={30} />}
          color="bg-blue-600"
        />

        <DashboardCard
          title="Active Warranties"
          value={dashboard.activeWarranties}
          icon={<ShieldCheck className="text-white" size={30} />}
          color="bg-green-600"
        />

        <DashboardCard
          title="Expired Warranties"
          value={dashboard.expiredWarranties}
          icon={<AlertTriangle className="text-white" size={30} />}
          color="bg-red-500"
        />

        <DashboardCard
          title="Expiring Soon"
          value={dashboard.expiringSoon}
          icon={<AlertTriangle className="text-white" size={30} />}
          color="bg-yellow-500"
        />

        <DashboardCard
          title="Service Records"
          value={dashboard.totalServices}
          icon={<Wrench className="text-white" size={30} />}
          color="bg-orange-500"
        />

        <DashboardCard
          title="Maintenance Cost"
          value={`₹${dashboard.totalMaintenanceCost}`}
          icon={<IndianRupee className="text-white" size={30} />}
          color="bg-purple-600"
        />

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <WarrantyChart />

        <ProductChart />

      </div>

      {/* Bottom */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <RecentActivity />

        <QuickActions />

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <UpcomingWarranty />

        <UpcomingServices />

      </div>

    </div>

  );

};

export default Dashboard;
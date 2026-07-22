import DashboardCard from "../../components/dashboard/DashboardCard";

import {
  Package,
  ShieldCheck,
  Wrench,
  AlertTriangle,
} from "lucide-react";
import WarrantyChart from "../../components/dashboard/WarrantyChart";
import ProductChart from "../../components/dashboard/ProductChart";
import RecentActivity from "../../components/dashboard/RecentActivity";
import QuickActions from "../../components/dashboard/QuickActions";
import UpcomingWarranty from "../../components/dashboard/UpcomingWarranty";
import UpcomingServices from "../../components/dashboard/UpcomingServices";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
const Dashboard = () => {
  return (
    
    <div className="space-y-8">

      {/* Heading */}

      <DashboardHeader />
      <WelcomeBanner />

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <DashboardCard
          title="Total Products"
          value="58"
          icon={<Package className="text-white" size={30} />}
          color="bg-blue-600"
        />

        <DashboardCard
          title="Active Warranty"
          value="43"
          icon={<ShieldCheck className="text-white" size={30} />}
          color="bg-green-600"
        />

        <DashboardCard
          title="Upcoming Services"
          value="12"
          icon={<Wrench className="text-white" size={30} />}
          color="bg-orange-500"
        />

        <DashboardCard
          title="Expired Warranty"
          value="15"
          icon={<AlertTriangle className="text-white" size={30} />}
          color="bg-red-500"
        />

      </div>

      {/* Charts Placeholder */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
  <WarrantyChart />
  <ProductChart />
</div>
      {/* Bottom Section */}

      

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
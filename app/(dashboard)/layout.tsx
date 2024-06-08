import MenuOptions from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import { Spotlight } from "@/components/ui/spotlight";
import InfoBar from "@/components/dashboard/InfoBar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex overflow-hidden h-screen">
      <MenuOptions />
      <div className="w-full">
        <InfoBar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;

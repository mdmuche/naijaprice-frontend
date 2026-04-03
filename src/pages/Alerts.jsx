import { Settings } from "lucide-react";
import Navigation from "../components/Navigation";
import AlertList from "../components/Alerts";
import Btn from "../components/Btn";
import BtnSecondary from "../components/BtnSecondary";

function Alerts() {
  return (
    <div className="flex h-screen">
      <Navigation />

      <div className="w-full flex flex-col gap-4 p-4 mt-4 lg:mt-0 md:ml-64">
        {/* Header */}
        <div className="w-full flex flex-col gap-2 items-start justify-between lg:items-center lg:flex-row lg:gap-0">
          <div>
            <h1 className="text-2xl font-bold">Market</h1>
            <p className="text-gray-600 text-sm">
              Discover and explore community markets near you
            </p>
          </div>

          <BtnSecondary icon={<Settings size={16} />} text="Settings" />
        </div>
        <div className="w-full flex gap-4">
          <h3 className="w-fit text-[16px] font-semibold border-b-2 border-[#00C950]">
            My Alerts
          </h3>
          <h3 className="text-[16px] text-gray-700 font-semibold">
            My Predictions
          </h3>
        </div>
        <AlertList />
        <Btn btnText={"+ Set New Price Alert"} />
      </div>
    </div>
  );
}

export default Alerts;

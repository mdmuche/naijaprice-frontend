import { Settings } from "lucide-react";
import Navigation from "../components/Navigation";
import AlertList from "../components/Alerts";
import Btn from "../components/Btn";

function Alerts() {
  return (
    <div className="flex h-screen">
      <Navigation />

      <div className="w-full flex flex-col gap-4 p-4 md:ml-64">
        {/* Header */}
        <div className="w-full flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Market</h1>
            <p className="text-gray-600 text-sm">
              Discover and explore community markets near you
            </p>
          </div>

          <button className="flex items-center gap-2 text-gray-700 font-bold text-[16px] cursor-pointer shadow-sm border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100">
            <Settings size={16} />
            Settings
          </button>
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

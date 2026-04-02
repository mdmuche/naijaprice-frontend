import { ArrowUpDown } from "lucide-react";
import NearByMarketList from "./NearByMarketList";

function NearByMarkets() {
  return (
    <div className="w-full flex flex-col lg:h-full">
      <div className="flex items-start justify-between xl:items-center mb-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Nearby Markets</h3>
          <span className="text-sm text-gray-600">
            Sorted by distance for your location
          </span>
        </div>
        <div className="flex items-center gap-4 rounded-lg bg-white text-black font-normal px-4 py-2 cursor-pointer">
          <ArrowUpDown />
          Sort
        </div>
      </div>
      <div className="lg:flex-1 lg:overflow-y-auto">
        <NearByMarketList />
      </div>
    </div>
  );
}

export default NearByMarkets;

import { ArrowUpDown } from "lucide-react";
import NearByMarketList from "./NearByMarketList";

function NearByMarkets() {
  return (
    <div className="w-[43%] h-full">
      <div className="flex justify-between items-center mb-4">
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
      <NearByMarketList />
    </div>
  );
}

export default NearByMarkets;

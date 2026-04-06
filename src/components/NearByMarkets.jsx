import { ArrowUpDown, ChevronDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { sortMarkets } from "../store/slices/marketSlice";
import { useState } from "react";
import NearByMarketList from "./NearByMarketList";

function NearByMarkets() {
  const dispatch = useDispatch();
  const [sortType, setSortType] = useState("distance");

  const handleSort = (type) => {
    setSortType(type);
    dispatch(sortMarkets(type));
  };

  return (
    <div className="w-full flex flex-col lg:h-full">
      <div className="flex items-start justify-between xl:items-center mb-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Nearby Markets</h3>
          <span className="text-sm text-gray-600">
            {sortType === "distance"
              ? "Sorted by distance from you"
              : "Sorted alphabetically"}
          </span>
        </div>

        {/* Sort Button / Dropdown */}
        <div className="relative group">
          <div className="flex items-center gap-2 rounded-lg bg-white border border-gray-200 text-sm font-medium px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors">
            <ArrowUpDown size={16} />
            <span>Sort</span>
            <ChevronDown size={14} className="text-gray-400" />
          </div>

          {/* Simple Hover Dropdown */}
          <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              onClick={() => handleSort("distance")}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${sortType === "distance" ? "font-bold text-[#00C950]" : ""}`}
            >
              Distance
            </button>
            <button
              onClick={() => handleSort("name")}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${sortType === "name" ? "font-bold text-[#00C950]" : ""}`}
            >
              Name
            </button>
          </div>
        </div>
      </div>

      <div className="lg:flex-1 lg:overflow-y-auto">
        <NearByMarketList />
      </div>
    </div>
  );
}

export default NearByMarkets;

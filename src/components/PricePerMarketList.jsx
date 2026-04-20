import PricePerMarketCard from "./PricePerMarketCard";
import { priceHistory } from "../utils/priceHistoryData";
import { useState } from "react";
import Pagination from "./Pagination";
import { initialReports } from "../utils/initialData";

function PricePerMarketList({ activeMarket, onMarketSelect, commodityTitle }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const allItems = [...initialReports, ...priceHistory];
  const filtered = allItems.filter(
    (p) => p.title.toLowerCase() === commodityTitle.toLowerCase(),
  );
  // pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const safePage = currentPage >= totalPages ? 0 : currentPage;

  const startIndex = safePage * itemsPerPage;

  const visibleData = filtered.slice(startIndex, startIndex + itemsPerPage);
  return (
    <div className="w-full xl:w-[38%]">
      <div className="w-full flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800">Price per Market</h3>
        <button className="text-[#00C950] bg-green-50 py-1 px-3 rounded-lg text-xs font-semibold">
          View All
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {/* Mapping DIRECTLY from your data file */}
        {visibleData.map((item) => (
          <PricePerMarketCard
            key={item.id}
            market={item.market}
            price={item.price}
            location={item.location}
            trend={item.trend}
            trendDirection={item.trendDirection}
            source={item.source}
            timeAgo={item.createdAt}
            // Comparison for the active state
            isActive={activeMarket === item.market}
            // Function to change the active state
            onClick={() => onMarketSelect({ market: item.market })}
          />
        ))}
        <Pagination
          page={safePage}
          totalPages={totalPages}
          onNext={() => setCurrentPage((p) => p + 1)}
          onPrev={() => setCurrentPage((p) => p - 1)}
          slider={true}
        />
      </div>
    </div>
  );
}

export default PricePerMarketList;

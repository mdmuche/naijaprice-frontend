import PricePerMarketCard from "./PricePerMarketCard";
import { priceHistory } from "../utils/priceHistoryData";
priceHistory.filter((p) => console.log(p.title));
// .slice(0, 3)
// .map((item) => console.log(item.market));

function PricePerMarketList({ activeMarket, onMarketSelect, commodityTitle }) {
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
        {priceHistory
          .filter(
            (p) =>
              p.market === activeMarket &&
              p.title.toLowerCase() === commodityTitle.toLowerCase(),
          )
          .slice(0, 3)
          .map((item) => (
            <PricePerMarketCard
              key={item.id}
              market={item.market}
              price={item.price}
              location={item.location}
              trend={item.trend}
              trendDirection={item.trendDirection}
              source={item.source}
              // Comparison for the active state
              isActive={activeMarket === item.market}
              // Function to change the active state
              onClick={() => onMarketSelect({ market: item.market })}
            />
          ))}
      </div>
    </div>
  );
}

export default PricePerMarketList;

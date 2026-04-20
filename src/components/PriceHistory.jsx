import { useState, useMemo } from "react";
// import { useSelector } from "react-redux";
import CommodityTrendChart from "./CommodityTrendChart";
import { priceHistory } from "../utils/priceHistoryData";
import EmptyState from "./ui/EmptyState";
import { initialReports } from "../utils/initialData";

const allReports = [...priceHistory, ...initialReports];

function PriceHistory({ selectedCommodity }) {
  const [range, setRange] = useState(30);

  // Select the commodities array from your priceSlice
  const chartData = useMemo(() => {
    if (!selectedCommodity?.title || !selectedCommodity?.market) return [];

    const now = new Date();
    const cutoffDate = new Date();
    cutoffDate.setDate(now.getDate() - range);

    const filtered = allReports.filter((item) => {
      const isTitleMatch =
        item?.title?.toLowerCase() === selectedCommodity.title.toLowerCase();
      const isMarketMatch =
        item?.market?.toLowerCase().trim() ===
        selectedCommodity.market.toLowerCase().trim();

      const itemDate = item.createdAt ? new Date(item.createdAt) : new Date();
      const isWithinRange = itemDate >= cutoffDate;

      return isTitleMatch && isMarketMatch && isWithinRange;
    });

    return filtered
      .map((item) => ({
        date: item.createdAt
          ? new Date(item.createdAt).toLocaleDateString("en-NG", {
              day: "numeric",
              month: "short",
            })
          : "Today",
        price: item.price,
      }))
      .reverse();
  }, [selectedCommodity, range]);

  if (!selectedCommodity) {
    return (
      <div className="w-full xl:w-[60%]">
        <EmptyState
          title="Select a market to view price trends"
          description="Choose a market to compare commodity history over time."
          className="h-64 flex items-center justify-center"
        />
      </div>
    );
  }

  return (
    <div className="w-full xl:w-[60%]">
      <div className="w-full flex justify-end mb-4">
        <div className="w-[70%] sm:w-[40%] grid grid-cols-3 gap-2">
          {[7, 14, 30].map((d) => (
            <button
              key={d}
              onClick={() => setRange(d)}
              className={`text-center py-2 border rounded-2xl text-xs font-bold transition-all ${
                range === d
                  ? "bg-[#00C950] text-white border-[#00C950]"
                  : "bg-white text-gray-500 border-gray-200"
              }`}
            >
              {d}D
            </button>
          ))}
        </div>
      </div>

      <div className="mb-2">
        <h2 className="text-lg font-bold">{range} Day Price History</h2>
        <p className="text-sm text-gray-500">
          Trend for {selectedCommodity.title} in {selectedCommodity.market}
        </p>
      </div>

      <CommodityTrendChart data={chartData} />
    </div>
  );
}

export default PriceHistory;

import { MapPin, ArrowUp, ArrowDown, Check } from "lucide-react";

function PricePerMarketCard({
  market,
  price,
  location,
  trend,
  trendDirection,
  source,
  isActive,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col gap-3 p-4 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
        isActive && trendDirection === "down"
          ? "border-[#00C950] bg-[#00C950]/5 shadow-sm scale-[1.01]"
          : isActive && trendDirection === "up"
            ? "border-red-600 bg-red-50 shadow-sm scale-[1.01]"
            : "border-transparent bg-gray-50 hover:bg-gray-100"
      }`}
    >
      {/* Top Row: Market & Price */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`p-1.5 rounded-lg ${isActive && trendDirection === "down" ? "bg-[#00C950] text-white" : isActive && trendDirection === "up" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-600"}`}
          >
            <MapPin size={16} />
          </div>
          <h3 className="font-bold text-base text-gray-900">{market}</h3>
        </div>
        <div className="font-bold text-lg text-gray-900">
          ₦{price?.toLocaleString()}
        </div>
      </div>

      {/* Middle Row: Location & Trend */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 truncate max-w-[180px]">
          {location || "Lagos, Nigeria"}
        </span>
        <div
          className={`flex items-center gap-1 text-sm font-bold ${
            trendDirection === "up" ? "text-red-500" : "text-[#00C950]"
          }`}
        >
          <span>{trend}%</span>
          {trendDirection === "up" ? (
            <ArrowUp size={14} />
          ) : (
            <ArrowDown size={14} />
          )}
        </div>
      </div>

      {/* Bottom Row: Status */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-100 mt-1">
        <div
          className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
            source === "verified"
              ? "bg-[#00C950]/10 text-[#00C950]"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {source === "verified" && <Check size={12} />}
          {source || "Crowdsourced"}
        </div>
        <span className="text-[11px] text-gray-400 font-medium">
          Updated recently
        </span>
      </div>
    </div>
  );
}

export default PricePerMarketCard;

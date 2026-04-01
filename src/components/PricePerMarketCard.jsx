import { ArrowDown, ArrowUp, Check, MapPin } from "lucide-react";

function PricePerMarketCard({
  market,
  location,
  price,
  trendDirection,
  trendValue,
  status,
  timeAgo,
}) {
  return (
    <div className="flex flex-col gap-1 p-2 rounded-lg shadow-md mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <h3 className="font-semibold text-lg">{market}</h3>
        </div>
        <div className="font-bold text-lg">{price}</div>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-normal text-sm text-gray-600">{location}</span>
        <div
          className={`flex items-center gap-0.5 ${trendDirection === "up" ? "text-red-500" : "text-[#00C950]"}`}
        >
          <span>{trendValue}%</span>
          {trendDirection === "up" ? (
            <ArrowUp size={16} />
          ) : (
            <ArrowDown size={16} />
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div
          className={`flex gap-1 items-center ${status === "crowdsourced" ? "bg-gray-200 text-gray-500" : "bg-[#00C950]/20 text-[#00C950]"} rounded-lg`}
        >
          {status === "verified" ? <Check size={16} /> : ""}
          {status}
        </div>
        <span className="text-sm text-gray-600">Updated {timeAgo}</span>
      </div>
    </div>
  );
}

export default PricePerMarketCard;

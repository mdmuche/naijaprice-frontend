import { TrendingDown, TrendingUp } from "lucide-react";
import { timeAgo } from "../utils/TimeAgo";

function CommodityCard({ item }) {
  const isUp = item.trendDirection === "up";
  return (
    <div>
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-36 object-cover rounded-lg"
      />

      {/* Title */}
      <h3 className="text-lg mt-2">{item.title}</h3>

      {/* Snippet */}
      <p className=" text-xs text-gray-600 mt-1">{item.snippet}</p>

      {/* Meta */}
      <div className="flex items-center justify-between mt-2">
        {/* Source */}
        <span className="text-xs">
          {item.source === "verified" ? "✅ Verified" : "👥 Crowd"}
        </span>

        {/* Trend */}
        <div
          className={`flex items-center gap-1 text-xs font-semibold ${
            isUp ? "text-green-600" : "text-red-600"
          }`}
        >
          {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {item.trend}%
        </div>
      </div>

      {/* Time */}
      <p className="text-[10px] text-gray-400">{timeAgo(item.createdAt)}</p>
    </div>
  );
}

export default CommodityCard;

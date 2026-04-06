import { CircleCheck, TrendingDown, TrendingUp, Users } from "lucide-react";
import { timeAgo } from "../utils/timeAgo";
import { Link } from "react-router-dom";

function CommodityCard({ item }) {
  // Logic: In a market, Price UP is usually Red, Price DOWN is Green
  const isPriceRising = item.trendDirection === "up";

  return (
    <Link
      to={`/commodities/${item.id}`}
      className="relative bg-white rounded-lg shadow-md p-2 lg:p-4 transition-transform hover:scale-[1.02]"
    >
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-36 object-cover rounded-lg"
      />

      {/* Source Badge - Absolute Positioned */}
      <span className="text-xs">
        {item.source === "verified" ? (
          <div className="absolute top-6 right-8 flex items-center gap-1 text-white bg-green-600 px-2 py-1 rounded-lg shadow-sm">
            <CircleCheck size={14} />
            <div className="hidden lg:block">Verified</div>
          </div>
        ) : (
          <div className="absolute top-6 right-8 flex items-center gap-1 text-black bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm border border-gray-200">
            <Users size={14} />
            <div className="hidden lg:block">Crowdsourced</div>
          </div>
        )}
      </span>

      {/* Meta Information */}
      <div className="flex items-center justify-between mt-2 w-full">
        <div className="flex flex-col justify-between items-center w-full lg:flex-row">
          <div>
            {/* Title */}
            <h3 className="text-lg text-center font-semibold mt-2 lg:text-start text-gray-900">
              {item.title}
            </h3>
            {/* Snippet (e.g., "50kg Bag") */}
            <p className="text-xs font-light text-gray-600">{item.snippet}</p>
          </div>

          {/* Trend Indicator */}
          {item.trend !== 0 && (
            <div
              className={`flex items-center gap-1 text-xs font-semibold ${
                isPriceRising ? "text-red-600" : "text-green-600"
              }`}
            >
              {isPriceRising ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}
              {item.trend}%
            </div>
          )}
        </div>
      </div>

      {/* Price and Timestamp */}
      <div className="flex flex-col items-center justify-between mt-1 lg:flex-row border-t border-gray-50 pt-2">
        <span className="text-lg font-bold text-gray-900">
          ₦{Math.round(item.price).toLocaleString()}
        </span>
        {/* Time - using your utility function */}
        <p className="text-[10px] text-gray-400">
          {item.createdAt ? timeAgo(item.createdAt) : "Recently"}
        </p>
      </div>
    </Link>
  );
}

export default CommodityCard;

import { CircleCheck, TrendingDown, TrendingUp, Users } from "lucide-react";
import { timeAgo } from "../utils/timeAgo";
import { Link } from "react-router-dom";

function CommodityCard({ item }) {
  const isUp = item.trendDirection === "up";
  return (
    <Link
      to={`/commodities/${item.id}`}
      className="relative bg-white rounded-lg shadow-md p-2 lg:p-4"
    >
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-36 object-cover rounded-lg"
      />

      {/* Source */}
      <span className="text-xs">
        {item.source === "verified" ? (
          <div className="absolute top-6 right-8 flex items-center gap-1 text-white bg-green-600 px-2 py-1 rounded-lg">
            <CircleCheck size={14} />
            <div className="hidden lg:block">Verified</div>
          </div>
        ) : (
          <div className="absolute top-6 right-8 flex items-center gap-1 text-black bg-white px-2 py-1 rounded-lg">
            <Users size={14} />
            <div className="hidden lg:block">Crowdsourced</div>
          </div>
        )}
      </span>
      {/* Meta */}
      <div className="flex items-center justify-between mt-2 w-full">
        <div className="flex flex-col justify-between items-center w-full lg:flex-row">
          <div>
            {/* Title */}
            <h3 className="text-lg text-center font-semibold mt-2 lg:text-start">
              {item.title}
            </h3>
            {/* Snippet */}
            <p className=" text-xs font-light text-gray-600">{item.snippet}</p>
          </div>

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
      </div>
      <div className="flex flex-col items-center justify-between mt-1 lg:flex-row">
        <span className="text-lg font-bold">₦{Math.round(item.price)}</span>
        {/* Time */}
        <p className="text-[10px] text-gray-400">{timeAgo(item.createdAt)}</p>
      </div>
    </Link>
  );
}

export default CommodityCard;

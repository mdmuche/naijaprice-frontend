import { TrendingDown, TrendingUp } from "lucide-react";

function PriceTrendCard({ priceIcon, title, details, items, bgColor }) {
  return (
    <div
      className={`${bgColor} p-4 rounded-xl shadow-sm transition-all hover:scale-[1.02]`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white/50 w-fit rounded-full shadow-inner">
            {priceIcon === "up" ? (
              <TrendingUp className="text-red-500" size={20} />
            ) : (
              <TrendingDown className="text-green-500" size={20} />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="text-xs text-gray-500">{details}</p>
          </div>
        </div>

        <div
          className={`text-lg font-bold ${priceIcon === "up" ? "text-red-500" : "text-green-500"}`}
        >
          {items}
        </div>
      </div>
    </div>
  );
}

export default PriceTrendCard;

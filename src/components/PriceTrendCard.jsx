import { TrendingDown, TrendingUp } from "lucide-react";

function PriceTrendCard({ priceIcon, title, details, items, bgColor }) {
  return (
    <div className={`${bgColor} p-4 rounded-xl shadow-sm`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-gray-200 w-fit rounded-full">
            {priceIcon === "up" ? (
              <TrendingUp className=" text-red-500" />
            ) : (
              <TrendingDown className="text-green-500" />
            )}
          </div>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className={`text-sm `}>{details}</p>
          </div>
        </div>

        <div
          className={
            priceIcon === "up"
              ? "text-red-500 font-semibold"
              : "text-green-500 font-semibold"
          }
        >
          {items}
        </div>
      </div>
    </div>
  );
}

export default PriceTrendCard;

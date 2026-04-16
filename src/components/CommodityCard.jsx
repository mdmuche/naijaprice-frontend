import { motion } from "framer-motion";
import { CircleCheck, TrendingDown, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { timeAgo } from "../utils/timeAgo";
import Card from "./ui/Card";

function CommodityCard({ item }) {
  const MotionImage = motion.img;
  const isPriceRising = item.trendDirection === "up";
  const priceLabel = `N${Math.round(item.price).toLocaleString()}`;
  console.log(item);
  return (
    <Link to={`/commodities/${item.id}`} className="block">
      <Card
        interactive
        className="relative h-full overflow-hidden"
        padding="sm"
      >
        <MotionImage
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.24 }}
          src={item.image}
          alt={item.title}
          className="h-40 w-full rounded-2xl object-cover"
        />

        <span className="text-xs">
          {item.source === "verified" ? (
            <div className="absolute right-7 top-6 flex items-center gap-1 rounded-xl bg-green-600 px-2.5 py-1 text-white shadow-sm">
              <CircleCheck size={14} />
              <div className="hidden lg:block">Verified</div>
            </div>
          ) : (
            <div className="absolute right-7 top-6 flex items-center gap-1 rounded-xl border border-gray-200 bg-white/90 px-2.5 py-1 text-gray-900 shadow-sm backdrop-blur-sm">
              <Users size={14} />
              <div className="hidden lg:block">Crowdsourced</div>
            </div>
          )}
        </span>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {item.title}
            </h3>
            <p className="text-xs text-gray-500">
              {item.snippet} ~{item.unit}
            </p>
          </div>

          {item.trend !== 0 && (
            <div
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                isPriceRising
                  ? "bg-red-50 text-red-600"
                  : "bg-green-50 text-green-600"
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

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="text-lg font-bold text-gray-900">{priceLabel}</span>
          <p className="text-[11px] text-gray-400">
            {item.createdAt ? timeAgo(item.createdAt) : "Recently"}
          </p>
        </div>
      </Card>
    </Link>
  );
}

export default CommodityCard;

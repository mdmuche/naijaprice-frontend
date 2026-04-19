import { Box, Check, Clock, X } from "lucide-react";
import { newDate } from "../utils/monthDate";

function RecentPriceCard({ title, snippet, price, createdAt, status }) {
  return (
    <div className="mt-4 flex w-full flex-col items-start gap-3 border-gray-200 p-2 shadow-md sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-0 sm:shadow-none">
      <div className="flex w-full items-start gap-3 sm:w-[40%] sm:items-center">
        <div className="mt-1 shrink-0 sm:mt-0">
          <Box size={16} />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-[14px] text-gray-600">{snippet}</p>
        </div>
      </div>

      <div className="flex w-full items-center justify-between gap-3 sm:w-[55%]">
        <div className="mt-2 flex items-center sm:mt-0">
          <span className="text-lg font-bold">₦{price.toLocaleString()}</span>
        </div>

        <p className="mt-2 text-[12px] text-gray-500 sm:mt-0">
          {newDate(createdAt)}
        </p>

        <div className="mt-2 flex items-center gap-2 sm:mt-0">
          <span
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-[12px] font-semibold ${
              status.toLowerCase() === "verified"
                ? " text-[#00C950]"
                : status.toLowerCase() === "pending"
                  ? "text-gray-600"
                  : "text-red-500"
            }`}
          >
            {status.toLowerCase() === "verified" ? (
              <div className="w-fit rounded-full border border-[#00C950]">
                <Check size={16} />
              </div>
            ) : status.toLowerCase() === "pending" ? (
              <div className="w-fit">
                <Clock size={16} />
              </div>
            ) : (
              <X size={16} className="text-red-500" />
            )}{" "}
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RecentPriceCard;

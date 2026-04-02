import { Box, Check, Clock, X } from "lucide-react";

function RecentPriceCard({ title, snippet, price, date, status }) {
  return (
    <div className="w-full flex flex-col gap-2 items-start p-2 shadow-md border-gray-200 sm:flex-row sm:items-center sm:justify-between mt-4 sm:shadow-none sm:p-0">
      <div className="w-full sm:w-[40%] flex items-start justify-between sm:items-center sm:gap-2">
        <Box size={16} />
        <div>
          <h3 className="text-lg font-bold text-end">{title}</h3>
          <p className="text-gray-600 text-[14px]">{snippet}</p>
        </div>
      </div>
      <div className="w-full sm:w-[40%] flex justify-between items-center">
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-bold">₦{price.toLocaleString()}</span>
        </div>
        <p className="text-gray-500 text-[12px] mt-2">{date}</p>
        <div className="flex items-center gap-2 mt-2">
          <span
            className={`px-2 py-1 rounded-full text-[12px] font-semibold flex gap-1 ${
              status === "Verified"
                ? " text-[#00C950]"
                : status === "Pending"
                  ? "text-gray-600"
                  : "text-red-500"
            }`}
          >
            {status === "Verified" ? (
              <div className="w-fit border border-[#00C950] rounded-full">
                <Check size={16} />
              </div>
            ) : status === "Pending" ? (
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

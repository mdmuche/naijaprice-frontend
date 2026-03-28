import { Clock, MapPin, NotebookText, Send } from "lucide-react";

function NearbyMarketCard({
  title,
  location,
  distance,
  status,
  reports,
  timeAgo,
}) {
  return (
    <div
      className={`flex flex-col gap-4 p-4 rounded-lg bg-white shadow-md border-l-4 ${status === "active" ? "border-[#00C950]" : "border-[#CCCCCC]"} `}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="w-full flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`rounded-full w-3 h-3 ${
                status === "active" ? "bg-green-500" : "bg-gray-500"
              }`}
            ></div>
            <div>
              <h3 className="font-bold text-[16px]">{title}</h3>
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin size={16} /> {location}
              </span>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 px-3 py-1 text-gray-700 text-sm font-medium rounded-lg ${
              status === "active" ? "bg-green-200" : "bg-gray-200"
            }`}
          >
            {status}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Send /> {distance}
        </div>
        <div className="flex items-center gap-1">
          <NotebookText /> {reports}
        </div>
        <div className="flex items-center gap-1">
          <Clock /> {timeAgo}
        </div>
      </div>
    </div>
  );
}

export default NearbyMarketCard;

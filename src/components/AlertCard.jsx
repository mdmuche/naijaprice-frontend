import {
  BellOff,
  Eye,
  Flag,
  MoveDownRight,
  MoveUpRight,
  Send,
  Spotlight,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useState } from "react";

function AlertCard({ alertDesc, status, timeAgo }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (status === "anomally") {
      setTimeout(() => {
        setProgress(78); // animate to 78%
      }, 100);
    }
  }, [status]);

  return (
    <div className="flex flex-col gap-4 p-1 sm:p-4 rounded-lg bg-white shadow-md">
      <div className="flex flex-col justify-between items-start lg:items-center gap-4 lg:flex-row">
        <div className="flex items-center gap-2">
          <div
            className={`rounded-full p-3 ${status === "anomally" ? "bg-yellow-400 text-black" : status === "rise" ? "bg-red-500 text-white" : status === "drop" ? "bg-[#00C950] text-white" : status === "best" ? "bg-green-900 text-white" : null}`}
          >
            {status === "drop" ? (
              <div>
                {" "}
                <MoveDownRight size={16} />
              </div>
            ) : status === "rise" ? (
              <div>
                <MoveUpRight size={16} />
              </div>
            ) : status === "anomally" ? (
              <div>
                <TriangleAlert size={16} />
              </div>
            ) : status === "best" ? (
              <div>
                <Spotlight size={16} />
              </div>
            ) : (
              <div>no alert</div>
            )}
          </div>
          <div className="text-[14px] lg:text-[16px] lg:font-normal">
            {alertDesc}
          </div>
        </div>

        <div>
          {status === "drop" ? (
            <button class="bg-gray-300 font-bold text-white px-4 py-2 rounded-md">
              prise drop
            </button>
          ) : status === "rise" ? (
            <button class="bg-gray-300 font-bold text-white px-4 py-2 rounded-md">
              prise rise
            </button>
          ) : status === "anomally" ? (
            <button class="bg-gray-300 font-bold text-white px-4 py-2 rounded-md">
              anomally
            </button>
          ) : status === "best" ? (
            <button class="bg-gray-300 font-bold text-white px-4 py-2 rounded-md">
              best
            </button>
          ) : (
            <button class="bg-gray-300 font-bold text-white px-4 py-2 rounded-md">
              no alert
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>{timeAgo}</div>
        <div className="flex items-center gap-2">
          <div className="cursor-pointer">
            {status === "best" ? <Send size={16} /> : <Eye size={16} />}
          </div>
          <div className="cursor-pointer">
            {status === "anomally" ? <Flag size={16} /> : <BellOff size={16} />}
          </div>
        </div>
      </div>
      {status === "anomally" && (
        <div>
          <div className="flex flex-col items-start gap-2 lg:gap-0 lg:items-center justify-between mt-2 lg:flex-row">
            {/* Bar Container */}
            <div className="w-[78%] h-4 bg-gray-200 rounded-lg overflow-hidden">
              {/* Progress */}
              <div
                className="h-full bg-yellow-500 transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span class="text-sm text-gray-600">AI Confidence 78%</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlertCard;

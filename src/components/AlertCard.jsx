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
import Card from "./ui/Card";
import { handleGeneralShare } from "../utils/share";

const alertConfig = {
  drop: {
    icon: MoveDownRight,
    tone: "bg-[#00C950] text-white",
    label: "Price drop",
  },
  rise: {
    icon: MoveUpRight,
    tone: "bg-red-500 text-white",
    label: "Price rise",
  },
  anomally: {
    icon: TriangleAlert,
    tone: "bg-yellow-400 text-black",
    label: "Anomaly",
  },
  best: {
    icon: Spotlight,
    tone: "bg-green-900 text-white",
    label: "Best deal",
  },
};
function AlertCard({ alertDesc, status, timeAgo, title, market, price, id }) {
  const [progress, setProgress] = useState(0);
  const config = alertConfig[status];
  const Icon = config?.icon;

  useEffect(() => {
    if (status === "anomally") {
      const timeoutId = setTimeout(() => setProgress(78), 120);
      return () => clearTimeout(timeoutId);
    }

    return undefined;
  }, [status]);

  return (
    <Card className="rounded-2xl" padding="md">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-3">
            <div
              className={`rounded-2xl p-3 ${config?.tone || "bg-gray-100 text-gray-500"}`}
            >
              {Icon ? <Icon size={18} /> : null}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-900">
                {config?.label || "Alert"}
              </p>
              <p className="text-sm text-gray-600">{alertDesc}</p>
            </div>
          </div>

          <span className="inline-flex w-fit items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
            {config?.label || "No alert"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-gray-400">{timeAgo}</span>
          <div className="flex items-center gap-2 text-gray-500">
            <button
              type="button"
              className="rounded-full p-2 transition-colors hover:bg-gray-100"
            >
              {status === "best" ? (
                <Send
                  size={16}
                  className="cursor-pointer"
                  onClick={() =>
                    handleGeneralShare({
                      title,
                      market,
                      price,
                      id,
                    })
                  }
                />
              ) : (
                <Eye size={16} />
              )}
            </button>
            <button
              type="button"
              className="rounded-full p-2 transition-colors hover:bg-gray-100"
            >
              {status === "anomally" ? (
                <Flag size={16} />
              ) : (
                <BellOff size={16} />
              )}
            </button>
          </div>
        </div>

        {status === "anomally" && (
          <div className="space-y-2">
            <div className="h-3 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-yellow-500 transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm text-gray-600">AI Confidence 78%</span>
          </div>
        )}
      </div>
    </Card>
  );
}

export default AlertCard;

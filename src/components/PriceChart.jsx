import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTrendTimeframe } from "../store/slices/priceSlice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import Card from "./ui/Card";
import EmptyState from "./ui/EmptyState";

function PriceChart({ className }) {
  const dispatch = useDispatch();
  const { currentLocation, trendTimeframe, marketTrends } = useSelector(
    (state) => state.prices,
  );

  /**
   * 1. FILTER LOGIC
   * Slices the 30-day data points to fit the selected timeframe.
   * 7d: Shows the 1st data point.
   * 14d: Shows the 1st and 2nd data points.
   * 30d: Shows all 4 data points.
   */
  const displayData = useMemo(() => {
    if (!marketTrends || marketTrends.length === 0) return [];

    if (trendTimeframe === "7d") return marketTrends.slice(0, 1);
    if (trendTimeframe === "14d") return marketTrends.slice(0, 2);
    return marketTrends;
  }, [marketTrends, trendTimeframe]);

  /**
   * 2. DYNAMIC ITEM DETECTION
   * Identifies which items (Tomatoes, Rice, etc.) exist in the current market's data.
   */
  const chartItems = useMemo(() => {
    if (displayData.length === 0) return [];
    return Object.keys(displayData[0]).filter((key) => key !== "day");
  }, [displayData]);

  // Color palette for the lines
  const colors = [
    "#22c55e",
    "#f97316",
    "#06b6d4",
    "#8b5cf6",
    "#ec4899",
    "#eab308",
  ];

  if (!marketTrends || marketTrends.length === 0) {
    return (
      <EmptyState
        title="No trend data available"
        description={`There isn't enough reporting history for ${currentLocation.market} yet.`}
        className={className}
      />
    );
  }

  return (
    <Card className={className} padding="md">
      <div className="flex flex-col items-start justify-between gap-4 mb-4 sm:flex-row">
        <div>
          <h2 className="text-lg font-semibold">
            Price Trends - {currentLocation.market}
          </h2>
          <span className="text-sm text-gray-500">
            Current view: {trendTimeframe.toUpperCase()}
          </span>
        </div>

        {/* TIMEFRAME TOGGLE BUTTONS */}
        <ul className="flex items-center gap-2 text-xs font-medium">
          {["7d", "14d", "30d"].map((time) => (
            <li
              key={time}
              onClick={() => dispatch(setTrendTimeframe(time))}
              className={`px-3 py-1 rounded-full cursor-pointer transition-all ${
                trendTimeframe === time
                  ? "bg-[#00C950] text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {time.toUpperCase()}
            </li>
          ))}
        </ul>
      </div>

      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={displayData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              tickFormatter={(tick) => {
                if (trendTimeframe === "7d") return "Week 1";
                return tick;
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              tickFormatter={(value) => `₦${value.toLocaleString()}`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }}
            />

            {/* DYNAMIC LINE GENERATION */}
            {chartItems.map((itemName, index) => (
              <Line
                key={itemName}
                type="monotone"
                dataKey={itemName}
                name={itemName.charAt(0).toUpperCase() + itemName.slice(1)}
                stroke={colors[index % colors.length]}
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={800}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default PriceChart;

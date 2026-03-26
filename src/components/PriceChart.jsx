import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Day 1", tomatoes: 45000, rice: 80000, garri: 3000 },
  { day: "Day 5", tomatoes: 42000, rice: 82000, garri: 3200 },
  { day: "Day 10", tomatoes: 43000, rice: 83000, garri: 3100 },
  { day: "Day 15", tomatoes: 41000, rice: 84000, garri: 3050 },
  { day: "Day 20", tomatoes: 40000, rice: 85000, garri: 3000 },
  { day: "Day 25", tomatoes: 39000, rice: 86000, garri: 2900 },
  { day: "Day 30", tomatoes: 38000, rice: 87000, garri: 2800 },
];

function PriceChart({ className }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm 2xl:p-4 ${className}`}>
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg font-semibold">
            Price Trends - Mile 12 Market
          </h2>
          <span className="text-sm text-gray-500">
            Last 30 days - top commodities
          </span>
        </div>
        <ul className="flex items-center gap-4 text-sm font-medium mt-4 mb-2">
          <li className="bg-[#00C950] text-white px-3 py-1 rounded-full">7D</li>
          <li className="hover:bg-gray-200 px-3 py-1 rounded-full">14D</li>
          <li className="hover:bg-gray-200 px-3 py-1 rounded-full">30D</li>
        </ul>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />

          {/* Lines */}
          <Line
            type="monotone"
            dataKey="rice"
            stroke="#f97316"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="tomatoes"
            stroke="#22c55e"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="garri"
            stroke="#06b6d4"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
export default PriceChart;

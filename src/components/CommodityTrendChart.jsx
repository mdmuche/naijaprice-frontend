import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = Array.from({ length: 15 }, (_, i) => ({
  day: i * 2 + 1,
  price: Math.floor(30000 + Math.random() * 15000),
}));

function CommodityTrendChart() {
  return (
    <div className="w-full h-75 mt-2">
      <ResponsiveContainer>
        <LineChart data={data}>
          {/* Light grid lines */}
          <CartesianGrid
            stroke="#e5e7eb"
            strokeDasharray="3 3"
            vertical={false}
          />

          {/* X Axis */}
          <XAxis
            dataKey="day"
            tickFormatter={(d) => `D${d}`}
            tick={{ fontSize: 12 }}
          />

          {/* Y Axis with prices */}
          <YAxis
            tickFormatter={(value) => `₦${value / 1000}k`}
            tick={{ fontSize: 12 }}
            width={50}
          />

          {/* Tooltip */}
          <Tooltip
            formatter={(value) => `₦${value.toLocaleString()}`}
            labelFormatter={(label) => `Day ${label}`}
          />

          {/* Line */}
          <Line
            type="monotone"
            dataKey="price"
            stroke="#00C950"
            strokeWidth={3}
            dot={false}
            isAnimationActive
            animationDuration={1200}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
export default CommodityTrendChart;

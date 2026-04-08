import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function CommodityTrendChart({ data }) {
  return (
    <div className="w-full h-72 mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00C950" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00C950" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f3f4f6"
          />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            minTickGap={20}
          />

          <YAxis hide domain={["auto", "auto"]} />

          <Tooltip
            contentStyle={{
              borderRadius: "16px",
              border: "none",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
            }}
            formatter={(value) => [`₦${value.toLocaleString()}`, "Price"]}
          />

          <Area
            type="monotone"
            dataKey="price"
            stroke="#00C950"
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#colorPrice)" // Uses the gradient defined above
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CommodityTrendChart;

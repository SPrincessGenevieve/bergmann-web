"use client";
import { TooltipProps } from "recharts";
import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    name?: string;
    value: number;
    dataKey: string;
    color: string;
  }[];
  label?: string;
}

const data = [
  { date: "2025-01-29", uv: 400, bc: 350, pv: 0, px: 23 },
  { date: "2025-02-12", uv: 300, bc: 250, pv: 73, px: 0 },
  { date: "2025-03-07", uv: 200, bc: 150, pv: 42, px: 0 },
  { date: "2025-04-21", uv: 270, bc: 220, pv: 22, px: 0 },
  { date: "2025-05-05", uv: 350, bc: 110, pv: 74, px: 0 },
  { date: "2025-05-19", uv: 320, bc: 198, pv: 35, px: 0 },
  { date: "2025-06-02", uv: 410, bc: 142, pv: 0, px: 78 },
  { date: "2025-06-16", uv: 305, bc: 190, pv: 0, px: 67 },
  { date: "2025-06-30", uv: 298, bc: 178, pv: 73, px: 0 },
  { date: "2025-07-14", uv: 420, bc: 165, pv: 34, px: 0 },
  { date: "2025-07-28", uv: 310, bc: 195, pv: 33, px: 0 },
  { date: "2025-08-11", uv: 375, bc: 110, pv: 0, px: 0 },
  { date: "2025-08-25", uv: 390, bc: 125, pv: 21, px: 0 },
  { date: "2025-09-08", uv: 340, bc: 199, pv: 0, px: 0 },
  { date: "2025-09-22", uv: 410, bc: 150, pv: 45, px: 0 },
  { date: "2025-10-06", uv: 295, bc: 165, pv: 23, px: 0 },
  { date: "2025-10-20", uv: 430, bc: 175, pv: 75, px: 0 },
  { date: "2025-11-03", uv: 380, bc: 140, pv: 43, px: 0 },
  { date: "2025-11-17", uv: 315, bc: 190, pv: 44, px: 0 },
];

export default function ProfitChart() {
  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (!active || !payload || payload.length === 0) return null;

    return (
      <div
        style={{
          background: "white",
          border: "1px solid #ccc",
          borderRadius: "6px",
          padding: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold" }}>
          {format(parseISO(label!), "MMM dd, yyyy")}
        </p>
        {payload.map((entry) => (
          <div
            key={entry.dataKey}
            style={{ color: entry.color, fontSize: "12px", marginTop: 4 }}
          >
            {entry.name ?? entry.dataKey}: {entry.value}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-auto flex flex-col">
      <ResponsiveContainer
        className="border-0 outline-0"
        width="100%"
        height={300}
      >
        <ComposedChart
          className="border-none outline-0"
          data={data}
          margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
        >
          <defs>
            {/* Gradient for uv */}
            <linearGradient id="uvGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E96F52" stopOpacity={2} />
              <stop offset="50%" stopColor="#E96F52" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#ffff" stopOpacity={0} />
            </linearGradient>

            {/* Gradient for bc */}
            <linearGradient id="bcGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#72AA9D" stopOpacity={2} />
              <stop offset="50%" stopColor="#72AA9D" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#ffff" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid className="" stroke="#eee" strokeDasharray="3 3" />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={false}
            label={{
              value: "Total in €",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle", fill: "#333", fontSize: 12}
            }}
          />
          <XAxis
            fontSize={12}
            dataKey="date"
            scale="point"
            tickFormatter={(str) => format(parseISO(str), "MMM dd")}
            padding={{ left: 0, right: 0 }}
          />
          <Tooltip content={<CustomTooltip />} />

          {/* Bar example (optional) */}

          {/* Area with gradient fills */}
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#E96F52"
            fill="url(#uvGradient)"
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="bc"
            stroke="#72AA9D"
            fill="url(#bcGradient)"
            isAnimationActive={false}
          />
          <Bar
            radius={4}
            dataKey="pv"
            barSize={15}
            fill="#E96F52"
            isAnimationActive={false}
          />
          <Bar
            radius={4}
            dataKey="px"
            barSize={15}
            fill="#72AA9D"
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <p className="text-center">Months</p>
    </div>
  );
}

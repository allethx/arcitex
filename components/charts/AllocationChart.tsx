"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type Props = {
  usdc: number;
  eurc: number;
};

const COLORS = [
  "#8B5CF6",
  "#06B6D4",
];

export default function AllocationChart({
  usdc,
  eurc,
}: Props) {
  const total = usdc + eurc;

  const data = [
    {
      name: "USDC",
      value: usdc,
      percent:
        total > 0
          ? (usdc / total) * 100
          : 0,
    },
    {
      name: "EURC",
      value: eurc,
      percent:
        total > 0
          ? (eurc / total) * 100
          : 0,
    },
  ];

  return (
    <div
      className="
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/40
        p-6
      "
    >
      <p className="text-sm text-zinc-500">
        Asset Allocation
      </p>

      <div className="mt-5 h-64">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              innerRadius={48}
              outerRadius={86}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: number) =>
                value.toFixed(4)
              }
              contentStyle={{
                background: "#18181b",
                border: "1px solid #3f3f46",
                borderRadius: 12,
                color: "#fff",
              }}
            />

          </PieChart>
        </ResponsiveContainer>

      </div>

      <div className="mt-4 space-y-4">

        {data.map((item, index) => (

          <div
            key={item.name}
            className="flex items-center justify-between"
          >

            <div className="flex items-center gap-3">

              <div
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor:
                    COLORS[index],
                }}
              />

              <span className="font-medium">
                {item.name}
              </span>

            </div>

            <span className="text-sm text-zinc-400">
              {item.percent.toFixed(0)}%
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}
"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";

const chartData = [
  { date: "May 21", success: 0 },
  { date: "May 23", success: 0 },
  { date: "May 25", success: 0 },
  { date: "May 27", success: 0 },
  { date: "Jun 10", success: 100 },
  { date: "Jun 11", success: 100 },
  { date: "Jun 12", success: 100 },
  { date: "Jun 13", success: 100 },
  { date: "Jun 14", success: 100 },
  { date: "May 29", success: 0 },
  { date: "May 31", success: 0 },
  { date: "Jun 1", success: 0 },
  { date: "Jun 2", success: 0 },
  { date: "Jun 3", success: 0 },

  { date: "Jun 15", success: 5 },
  { date: "Jun 16", success: 100 },
  { date: "Jun 17", success: 100 },
  { date: "Jun 18", success: 100 },
  { date: "Jun 19", success: 100 },
  { date: "Jun 20", success: 100 },
];

const chartConfig = {
  success: {
    label: "Overall Performance",
    color: "oklch(72.3% 0.219 149.579)",
  },
} satisfies ChartConfig;

export function AnalysisChart() {
  return (
    <div className="w-full px-6">
      <div className="mb-8">
        <h2 className="text-black text-lg font-medium mb-2">
          Interview Analysis
        </h2>

        <div className="mt-2">
          <span className="flex flex-row items-center gap-x-1 text-green-500 text-sm font-medium">
            <TrendingUp size={20} />
            overall Performance
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 6)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[0, 100]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="success"
              type="stepAfter"
              fill="var(--color-success)"
              fillOpacity={0.4}
              stroke="var(--color-success)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}

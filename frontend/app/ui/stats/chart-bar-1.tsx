"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface ChartBar1Props {
  data: { day: string; sales: number; price: number }[];
  config: ChartConfig;
}

export default function ChartBar1({ data, config }: ChartBar1Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your activity during this week</CardTitle>
        <CardDescription>Daily activity minutes</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="sales" fill="var(--color-sales)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

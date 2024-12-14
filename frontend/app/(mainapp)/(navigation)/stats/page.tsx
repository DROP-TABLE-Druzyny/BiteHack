import Image from "next/image";
import StatsLineChart from "@/app/ui/stats/chart-line-1";
import ChartBar1 from "@/app/ui/stats/chart-bar-1";
import ChartLine2 from "@/app/ui/stats/chart-line-2";

export default function Page() {
  const lineChartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ];

  const barChartData = [
    { day: "Mon", sales: 186, price: 5.2 },
    { day: "Thu", sales: 245, price: 5.5 },
    { day: "Wed", sales: 208, price: 5.3 },
    { day: "Thu", sales: 273, price: 5.7 },
    { day: "Fri", sales: 309, price: 6.1 },
    { day: "Sat", sales: 334, price: 6.3 },
    { day: "Sun", sales: 290, price: 5.9 },
  ];

  const lineChartConfig = {
    desktop: {
      label: "Visitors",
      color: "hsl(var(--chart-1))",
    },
  };

  const barChartConfig = {
    sales: {
      label: "Activity minutes",
      color: "hsl(var(--chart-1))",
    },
    price: {
      label: "Average activity",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <div className="flex flex-col md:flex-col gap-4 md:overflow-hidden">
      <h1>Stats</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <StatsLineChart data={lineChartData} config={lineChartConfig} />
        <StatsLineChart data={lineChartData} config={lineChartConfig} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ChartBar1 data={barChartData} config={barChartConfig} />
        <ChartLine2 data={barChartData} config={barChartConfig} />
      </div>
    </div>
  );
}
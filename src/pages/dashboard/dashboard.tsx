import { ChartCard, CommonLoader } from "@/components";
import { protectedAxiosInstance } from "@/hooks/axios";
import { useQuery } from "@tanstack/react-query"
import { CircleCheckIcon, CircleDashedIcon, CircleXIcon } from "lucide-react";
import type { DashboardCharts } from "@/lib/types";
import { useMemo } from "react";
import { getCookie } from "@/lib/cookies";

export default function Dashboard() {
  const accessToken = getCookie("accessToken");

  const { data: dashboardCharts, isLoading } = useQuery<DashboardCharts>({
    queryKey: ["get-dashboard-charts", accessToken],
    queryFn: async () => {
      const response = await protectedAxiosInstance.get<DashboardCharts>(
        "/charts/"
      );
      return response as unknown as DashboardCharts;
    },
    gcTime: 1000 * 60 * 10, // 10 minutes - cache time
  });

  // Memoize charts array to prevent recreation on every render
  const charts = useMemo(
    () => [
      {
        title: "Cancelled Tasks",
        value: dashboardCharts?.cancelled_tasks,
        className:
          "bg-gradient-to-br from-orange-500/50 to-orange-500/30 via-80% via-orange-500/20",
        icon: (
          <CircleXIcon className="size-6  sm:size-8 lg:size-10 text-white" />
        ),
      },
      {
        title: "Completed Tasks",
        value: dashboardCharts?.completed_tasks,
        className:
          "bg-gradient-to-br from-green-500/80 to-green-500/50 via-80% via-green-500/40",
        icon: (
          <CircleCheckIcon className="size-6  sm:size-8 lg:size-10 text-white" />
        ),
      },
      {
        title: "In Progress Tasks",
        value: dashboardCharts?.in_progress_tasks,
        className:
          "bg-gradient-to-br from-yellow-500/50 to-yellow-500/30 via-80% via-yellow-500/20",
        icon: (
          <CircleDashedIcon className="size-6  sm:size-8 lg:size-10 text-white" />
        ),
      },
      {
        title: "Pending Tasks",
        value: dashboardCharts?.pending_tasks,
        className:
          "bg-gradient-to-br from-blue-500/50 to-blue-500/30 via-80% via-blue-500/20",
        icon: (
          <CircleDashedIcon className="size-6  sm:size-8 lg:size-10 text-white" />
        ),
      },
      {
        title: "Tasks Due in Three Days",
        value: dashboardCharts?.tasks_due_in_three_days,
        className:
          "bg-gradient-to-br from-purple-500/50 to-purple-500/30 via-80% via-purple-500/20",
        icon: (
          <CircleDashedIcon className="size-6  sm:size-8 lg:size-10 text-white" />
        ),
      },
      {
        title: "Tasks Overdue",
        value: dashboardCharts?.tasks_overdue,
        className:
          "bg-gradient-to-br from-red-500/50 to-red-500/30 via-80% via-red-500/20",
        icon: (
          <CircleXIcon className="size-6  sm:size-8 lg:size-10 text-white" />
        ),
      },
      {
        title: "Total Tasks",
        value: dashboardCharts?.total_tasks,
        className:
          "bg-gradient-to-br from-gray-500/50 to-gray-500/30 via-80% via-gray-500/20",
        icon: (
          <CircleDashedIcon className="size-6  sm:size-8 lg:size-10 text-white" />
        ),
      },
    ],
    [dashboardCharts]
  );

  return (
    <div className="py-5 sm:py-10 max-w-[90%] xl:max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {isLoading
        ? Array.from({ length: 7 }).map((_, index) => (
            <CommonLoader
              key={index}
              className="w-full h-32 sm:h-36 rounded-lg sm:rounded-3xl bg-linear-to-br from-tertiary/30 via-50% via-transparent to-tertiary/5"
            />
          ))
        : charts.map((chart) => (
            <ChartCard
              key={chart.title}
              title={chart.title}
              value={chart.value ?? 0}
              className={chart.className}
              icon={chart.icon}
            />
          ))}
    </div>
  );
}

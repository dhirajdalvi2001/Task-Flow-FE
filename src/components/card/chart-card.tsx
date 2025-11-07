import { Typography } from "..";
import { cn } from "@/lib/utils";

type ChartCardProps = {
  title: string;
  value: number;
  className: string;
  icon: React.ReactNode;
}

export default function ChartCard({ title, value, className, icon }: ChartCardProps) {
  return (
    <div className={cn('h-32 sm:h-36 bg-tertiary/60 p-4 sm:p-7 flex flex-col justify-between rounded-lg sm:rounded-2xl relative hover:scale-[101%] sm:hover:scale-105 transition-all duration-300', className)}     >
        <Typography variant='h5' className="text-white/80">{title}</Typography>
        <Typography variant='h1' className="text-white">{value}</Typography>
        <span className="absolute top-2 right-2 sm:top-4 sm:right-4">
      {icon}
    </span>
  </div>
);
}

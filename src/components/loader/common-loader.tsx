import { cn } from '@/lib/utils';

type CommonLoaderProps = {
  className?: string;
}

export default function CommonLoader({ className }: CommonLoaderProps) {
  return <div className={cn("h-7 min-w-10 animate-pulse bg-primary/30 rounded-sm sm:rounded-lg", className)}></div>;
}

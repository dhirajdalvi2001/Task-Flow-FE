import { cn } from '@/lib/utils';
import { Tooltip } from '..';

type BadgeProps = {
  variant: string;
  className?: string;
  size?: 'sm' | 'md';
  tooltipContent?: string;
  children?: React.ReactNode;
}

export default function Badge({ variant, className, size = 'md', children, tooltipContent }: BadgeProps) {
  const variants: Record<string, string> = {
    PENDING: "bg-yellow-500/50 text-text",
    IN_PROGRESS: "bg-blue-500/50 text-text",
    COMPLETED: "bg-green-500/50 text-text",
    CANCELLED: "bg-red-500/50 text-white",
    OVERDUE: "bg-red-500/50 text-text",
    DUE_DATE: "bg-white/30 text-text",
    TOTAL: "bg-gray-500/50 text-text",
  }

  const upperCaseVariant = variant === 'DUE_DATE' || !children ? variant?.toUpperCase()?.replaceAll(" ", "_"):children && children.toString() ? children.toString().toUpperCase()?.replaceAll(" ", "_") :''

  return (
    <Tooltip content={tooltipContent ? tooltipContent : undefined}>
      <div
        className={cn(
          "rounded-md font-medium",
          variants[upperCaseVariant],
          size === "sm"
            ? "px-1 py-0.5 text-[8px] sm:text-[10px]"
            : "px-2 py-1 text-[10px] sm:text-xs",
          className
        )}
      >
        {children ? children : variant.charAt(0).toUpperCase() + variant.slice(1)?.toLowerCase()}
      </div>
    </Tooltip>
  );
}

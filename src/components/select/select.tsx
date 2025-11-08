import { Select as SelectComponent, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Tooltip, Typography } from "..";
import { cn } from "@/lib/utils";
import type React from "react";

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  isCustomSelector?: boolean;
  tooltipContent?: string;
  children?: React.ReactNode;
  label?: string;
  required?: boolean;
  id?: string;
  parentClassName?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
};

export default function Select({
  options,
  value,
  onChange,
  isCustomSelector = false,
  tooltipContent,
  children,
  label,
  required,
  id,
  parentClassName,
  error,
  className,
  disabled,
}: SelectProps) {
  const selectedOption = options.find((option) => option.value === value);
  return (
    <div className={parentClassName}>
      {label && (
        <Typography
          variant="small"
          htmlFor={id}
          className="block text-white/80"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </Typography>
      )}
      <SelectComponent
        value={selectedOption ? selectedOption.value : undefined}
        onValueChange={onChange}
      >
        <SelectTrigger
          className={cn(
            "min-w-20 w-fit bg-background placeholder:text-black border-none",
            className
          )}
          isBadge={isCustomSelector}
          disabled={disabled}
        >
          {isCustomSelector ? children : null}
          {!isCustomSelector ? (
            <Tooltip content={tooltipContent ? tooltipContent : undefined}>
              <SelectValue placeholder="Select an option" />
            </Tooltip>
          ) : null}
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectComponent>
      {error && (
        <Typography variant="small" className="absolute text-red-500">
          {error}
        </Typography>
      )}
    </div>
  );
}

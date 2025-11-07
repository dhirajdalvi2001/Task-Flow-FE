import { Select as SelectComponent, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import {  Tooltip } from '..';
import { cn } from '@/lib/utils';
import type React from 'react';

type Option = {
  label: string;
  value: string;
}

type SelectProps = {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  isCustomSelector?: boolean;
  tooltipContent?: string;
  children?: React.ReactNode;
};

export default function Select({
  options,
  value,
  onChange,
  isCustomSelector = false,
  tooltipContent,
  children,
}: SelectProps) {
  const selectedOption = options.find((option) => option.value === value);
  return (
    <SelectComponent
      value={selectedOption ? selectedOption.value : undefined}
      onValueChange={onChange}
    >
      <SelectTrigger
        className={cn("min-w-20 w-fit placeholder:text-black")}
        isBadge={isCustomSelector}
      >
        {isCustomSelector ? (
          children
        ) : null}
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
  );
}

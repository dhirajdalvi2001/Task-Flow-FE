import React from 'react'
import { Textarea as TextareaComponent } from '@/components/ui/textarea';
import { Typography } from '..';
import { cn } from '@/lib/utils';

type TextareaProps = React.ComponentProps<typeof TextareaComponent> & {
  label?: string;
  error?: string;
  variant?: "colored" | "default";
  required?: boolean;
  parentClassName?: string;
};  

export default function Textarea({
  label,
  error,
  required = false,
  parentClassName,
  variant = "default",
  ...props
}: TextareaProps) {
  const variants = {
    default: "bg-transparent/40",
    colored:
      "bg-background/70 border-background/50 hover:ring-[1px] ring-ring/50 focus-visible:ring-[2px] focus-visible:ring-ring/50",
  };
  return (
    <div className={parentClassName}>
      {label && (
        <Typography
          variant="small"
          htmlFor={props.id}
          className="text-white/80"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </Typography>
      )}
      <TextareaComponent
        {...props}
        className={cn(
          "text-xs md:text-sm bg-transparent/40 border-background/20 focus-visible:border-background/20",
          variants[variant],
          props.className
        )}
      />
      {error && (
        <Typography variant="small" className="absolute text-red-500">
          {error}
        </Typography>
      )}
    </div>
  );
}

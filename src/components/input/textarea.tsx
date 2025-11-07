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
  ...props
}: TextareaProps) {
  return (
    <div className={parentClassName}>
      {label && (
        <Typography
          variant="small"
          htmlFor={props.id}
          className="text-background"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </Typography>
      )}
      <TextareaComponent
        {...props}
        className={cn("text-xs md:text-sm bg-transparent/40 border-background/20 focus-visible:border-background/20 text-white font-medium lg:text-lg", props.className)}
      />
      {error && (
        <Typography variant="small" className="text-red-500">
          {error}
        </Typography>
      )}
    </div>
  )
}

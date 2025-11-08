import React from "react";
import { Input as InputComponent } from "@/components/ui/input";
import Typography from "../typography/typography";
import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<typeof InputComponent> & {
  label?: string;
  error?: string;
  variant?: "colored" | "default";
  required?: boolean;
  parentClassName?: string;
};

export default function Input({
  label,
  error,
  variant = "default",
  required = false,
  parentClassName,
  ...props
}: InputProps) {
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
      <InputComponent
        {...props}
        className={cn("text-xs md:text-sm", variants[variant], props.className)}
      />
      {error && (
        <Typography variant="small" className="absolute text-red-500">
          {error}
        </Typography>
      )}
    </div>
  );
}

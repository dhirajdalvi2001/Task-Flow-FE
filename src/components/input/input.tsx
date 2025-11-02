import React from "react";
import { Input as InputComponent } from "@/components/ui/input";
import Typography from "../typography/typography";
import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<typeof InputComponent> & {
  label?: string;
  error?: string;
  variant?: "colored" | "default";
  required?: boolean;
};

export default function Input({
  label,
  error,
  variant = "default",
  required = false,
  ...props
}: InputProps) {
  const variants = {
    default: "bg-transparent",
    colored: "bg-background opacity-50",
  };
  return (
    <div>
      {label && (
        <Typography
          variant="small"
          htmlFor={props.id}
          className="text-background"
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

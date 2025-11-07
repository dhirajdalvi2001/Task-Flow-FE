import React from "react";
import { Button as ButtonComponent } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Button({
  ...props
}: React.ComponentProps<typeof ButtonComponent>) {
  const styles: Record<string, string> = {
    destructive:
      "bg-linear-to-br from-red-600 via-red-700 to-red-800 text-white hover:bg-red-700 focus-visible:ring-red-200 dark:focus-visible:ring-red-400 dark:bg-red-600",
  };
  return (
    <ButtonComponent
      {...props}
      className={cn(
        "cursor-pointer",
        styles[props.variant as keyof typeof styles],
        props.className
      )}
    />
  );
}

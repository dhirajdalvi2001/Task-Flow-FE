import React from "react";
import { Button as ButtonComponent } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Button({
  ...props
}: React.ComponentProps<typeof ButtonComponent>) {
  return (
    <ButtonComponent
      {...props}
      className={cn("cursor-pointer", props.className)}
    />
  );
}

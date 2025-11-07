import React from "react";
import { cn } from "@/lib/utils";
import { Tooltip } from "..";

type TypographyProps = {
  children: React.ReactNode;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "span"
    | "small"
    | "tiny";
  className?: string;
  htmlFor?: string;
  tooltipContent?: string;
  onClick?: () => void;
};

const variants = {
  h1: "text-2xl md:text-4xl font-bold text-text",
  h2: "text-xl md:text-3xl font-bold text-text",
  h3: "text-lg md:text-2xl font-bold text-text",
  h4: "text-base md:text-xl font-bold text-text",
  h5: "text-sm md:text-base lg:text-lg font-bold text-text",
  h6: "text-xs md:text-base font-bold text-text",
  p: "text-sm md:text-base font-normal text-text",
  span: "text-sm md:text-base font-normal text-text",
  small: "text-xs md:text-sm font-normal text-text",
  tiny: "text-xs md:text-xs font-normal text-text",
  text: "text-sm md:text-base font-normal text-text",
} as const;

export default function Typography({
  children,
  variant = "p",
  htmlFor,
  className,
  tooltipContent,
  onClick,
}: TypographyProps) {
  const Component = htmlFor ? "label" : "div";
  return (
    <Tooltip content={tooltipContent ? tooltipContent : undefined}>
      <Component
        className={cn(variants[variant], className)}
        htmlFor={htmlFor}
        onClick={onClick}
      >
        {children}
      </Component>
    </Tooltip>
  );
}

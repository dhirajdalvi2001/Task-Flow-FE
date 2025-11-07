import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { queryClient } from "@/main";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  if (!date) return "";

  const dateObj = new Date(date);

  if (dateObj.getFullYear() === new Date().getFullYear()) {
    return dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } else {
    return dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
}

export function formatFullDate(date: string) {
  if (!date) return "";

  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function invalidateQueries(queryKeys?: string[]) {
  if (queryKeys && queryKeys.length > 0) {
    // Invalidate queries - React Query will deduplicate multiple calls
    queryKeys.forEach((queryKey) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    });
  }
}
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// For Framer Motion variants
export const staggerContainer = (staggerChildren: number) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
    },
  },
});

// Date formatting helper
import { format } from "date-fns";
export const formatDate = (date: Date) => format(date, "PPP");

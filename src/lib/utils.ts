import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const res = Array.from(list);
  const [removed] = res.splice(startIndex, 1);
  res.splice(endIndex, 0, removed);

  return res;
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAge(birthYear: number): number {
  return new Date().getFullYear() - birthYear + 1;
}

export function formatHeight(cm: number): string {
  return `${cm}cm`;
}

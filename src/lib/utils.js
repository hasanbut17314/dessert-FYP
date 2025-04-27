import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

//export const baseURL = "http://localhost:8000/api";
export const baseURL = "https://kaspas-backend.vercel.app/api";

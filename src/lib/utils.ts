import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const applyDiscount = (price: number, discount: number) =>
  price - (price * discount) / 100;

export function formatPrice(price: number): string {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function calculatePriceAfterDiscount(
  price: number,
  discount: number,
): number {
  return price - (price * discount) / 100;
}

const VERCEL_PROJECT_NAME = "vinheria-agnello";
const PRODUCTION_URL = `https://vinheria-agnello.vercel.app/`;
export const getBaseUrl = () => {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) {
    if (
      process.env.VERCEL_URL.includes(`${VERCEL_PROJECT_NAME}-`) &&
      process.env.VERCEL_ENV === "production"
    )
      return PRODUCTION_URL;
    return `https://${process.env.VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

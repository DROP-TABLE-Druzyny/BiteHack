import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { jwtDecode } from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface jwtPayload {
  exp: number;
}

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) {
    return true;
  }
  const { exp } = jwtDecode<jwtPayload>(token);

  if (exp * 1000 < Date.now()) {
    return true;
  }
  return false;
};
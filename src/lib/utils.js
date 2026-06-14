import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind class strings with proper precedence (shadcn helper). */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

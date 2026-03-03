import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Base path para assets (ex: subpath em GitHub Pages). Vazio quando o site está na raiz. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

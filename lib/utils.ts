import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Base path para assets no GitHub Pages (ex: /rodobras-rebranding). Vazio em dev. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

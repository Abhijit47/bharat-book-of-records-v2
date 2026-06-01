import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { formatDistanceToNow, isValid, parseISO } from 'date-fns';

export function formatTimeAgo(dateString: string): string {
  const date = parseISO(dateString);
  if (!isValid(date)) return 'Recently';
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  if (!isValid(date)) return 'Unknown date';
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

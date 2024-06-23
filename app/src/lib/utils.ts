import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type DataFormats = {
  hex: string[];
  dec: number[];
  text: string[];
};

export function formatTimestamp(timestamp: number): string {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const now = Date.now();
  const diffInSeconds = Math.floor((now - timestamp) / 1000); // timestamp is in milliseconds

  const times = [
    { unit: "year", value: 60 * 60 * 24 * 365 },
    { unit: "month", value: 60 * 60 * 24 * 30 },
    { unit: "week", value: 60 * 60 * 24 * 7 },
    { unit: "day", value: 60 * 60 * 24 },
    { unit: "hour", value: 60 * 60 },
    { unit: "minute", value: 60 },
    { unit: "second", value: 1 },
  ];

  for (const { unit, value } of times) {
    const diff = Math.floor(diffInSeconds / value);
    if (diff >= 1) {
      return rtf.format(-diff, unit as Intl.RelativeTimeFormatUnit);
    }
  }

  return "just now";
}

export function formatTimestampToDate(timestamp: number): string {
  const date = new Date(timestamp * 1000); // Convert to milliseconds

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${month} ${day} ${year} ${hours}:${minutes}:${seconds}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 0) {
      const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
      return rtf.format(-count, interval.label as Intl.RelativeTimeFormatUnit);
    }
  }

  return "just now";
}

/**
 * Truncate a hash to a shorter format.
 * @param hash - The hash string to truncate.
 * @param startLength - The number of characters to keep at the start.
 * @param endLength - The number of characters to keep at the end.
 * @returns The truncated hash string.
 */
export function truncateHash(
  hash: string,
  startLength: number = 4,
  endLength: number = 4
): string {
  if (hash.length <= startLength + endLength) {
    return hash;
  }
  return `${hash.slice(0, startLength)}...${hash.slice(-endLength)}`;
}

export const separateDataFormats = (dataArray: string[]): DataFormats => {
  const result: DataFormats = {
    hex: [],
    dec: [],
    text: [],
  };

  dataArray.forEach((data) => {
    // Check if the data is hexadecimal
    if (/^0x[0-9a-fA-F]+$/.test(data)) {
      result.hex.push(data);
    }
    // Check if the data is decimal
    else if (/^\d+$/.test(data)) {
      result.dec.push(parseInt(data, 10));
    }
    // Assume the data is text
    else {
      result.text.push(data);
    }
  });

  return result;
};

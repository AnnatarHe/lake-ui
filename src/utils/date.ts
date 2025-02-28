/**
 * Date utility functions using native Date API
 */

/**
 * Adds a specified number of days to a given date
 * @param date The date to add days to
 * @param days The number of days to add
 * @returns A new Date with the added days
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setUTCDate(date.getUTCDate() + days);
  return result;
}

/**
 * Gets the start of the day for a given date
 * @param date The date to get the start of day for
 * @returns A new Date set to the start of the day (00:00:00.000)
 */
export function startOfDay(date: Date): Date {
  const result = new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  ));
  return result;
}

/**
 * Converts a Unix timestamp to a Date object
 * @param timestamp Unix timestamp in seconds
 * @returns Date object
 */
export function fromUnixTime(timestamp: number): Date {
  return new Date(timestamp * 1000);
}

/**
 * Converts a Date object to a Unix timestamp
 * @param date Date object
 * @returns Unix timestamp in seconds
 */
export function toUnixTime(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

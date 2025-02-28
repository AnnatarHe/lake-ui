import { describe, expect, it } from 'vitest'
import { addDays, fromUnixTime, startOfDay, toUnixTime } from './date'

describe('Date utilities', () => {
  describe('addDays', () => {
    it('should add days to a date', () => {
      const date = new Date('2025-02-27T10:30:00Z')
      const result = addDays(date, 5)

      expect(result.getUTCDate()).toBe(4) // 27 + 5 = 32, which becomes 4 in March
      expect(result.getUTCMonth()).toBe(2) // March (0-indexed)
      expect(result.getUTCFullYear()).toBe(2025)

      // Original date should remain unchanged
      expect(date.getUTCDate()).toBe(27)
    })

    it('should handle negative days', () => {
      const date = new Date('2025-03-05T10:30:00Z')
      const result = addDays(date, -5)

      expect(result.getUTCDate()).toBe(28) // February 28, 2025
      expect(result.getUTCMonth()).toBe(1) // February (0-indexed)
      expect(result.getUTCFullYear()).toBe(2025)
    })

    it('should handle month transitions', () => {
      const date = new Date('2025-01-30T10:30:00Z')
      const result = addDays(date, 5)

      expect(result.getUTCDate()).toBe(4)
      expect(result.getUTCMonth()).toBe(1) // February (0-indexed)
      expect(result.getUTCFullYear()).toBe(2025)
    })

    it('should handle year transitions', () => {
      const date = new Date('2025-12-30T10:30:00Z')
      const result = addDays(date, 5)

      expect(result.getUTCDate()).toBe(4)
      expect(result.getUTCMonth()).toBe(0) // January (0-indexed)
      expect(result.getUTCFullYear()).toBe(2026)
    })
  })

  describe('startOfDay', () => {
    it('should set time to 00:00:00.000', () => {
      const date = new Date('2025-02-27T10:30:45.123Z')
      const result = startOfDay(date)

      expect(result.getUTCHours()).toBe(0)
      expect(result.getUTCMinutes()).toBe(0)
      expect(result.getUTCSeconds()).toBe(0)
      expect(result.getUTCMilliseconds()).toBe(0)

      // Date parts should remain unchanged
      expect(result.getUTCDate()).toBe(27)
      expect(result.getUTCMonth()).toBe(1) // February (0-indexed)
      expect(result.getUTCFullYear()).toBe(2025)

      // Original date should remain unchanged
      expect(date.getUTCHours()).toBe(10)
    })

    it('should handle dates at midnight', () => {
      const date = new Date('2025-02-27T00:00:00.000Z')
      const result = startOfDay(date)

      expect(result.getUTCHours()).toBe(0)
      expect(result.getUTCMinutes()).toBe(0)
      expect(result.getUTCSeconds()).toBe(0)
      expect(result.getUTCMilliseconds()).toBe(0)

      // Date parts should remain unchanged
      expect(result.getUTCDate()).toBe(27)
      expect(result.getUTCMonth()).toBe(1) // February (0-indexed)
      expect(result.getUTCFullYear()).toBe(2025)
    })
  })

  describe('fromUnixTime', () => {
    it('should convert Unix timestamp to Date object', () => {
      // Unix timestamp for 2025-02-26T15:10:00Z (in seconds)
      const timestamp = 1740582600
      const result = fromUnixTime(timestamp)

      expect(result.getUTCFullYear()).toBe(2025)
      expect(result.getUTCMonth()).toBe(1) // February (0-indexed)
      expect(result.getUTCDate()).toBe(26)
      expect(result.getUTCHours()).toBe(15)
      expect(result.getUTCMinutes()).toBe(10)
      expect(result.getUTCSeconds()).toBe(0)
    })

    it('should handle Unix timestamp 0', () => {
      const timestamp = 0
      const result = fromUnixTime(timestamp)

      // Unix epoch: 1970-01-01T00:00:00Z
      expect(result.getUTCFullYear()).toBe(1970)
      expect(result.getUTCMonth()).toBe(0) // January (0-indexed)
      expect(result.getUTCDate()).toBe(1)
      expect(result.getUTCHours()).toBe(0)
      expect(result.getUTCMinutes()).toBe(0)
      expect(result.getUTCSeconds()).toBe(0)
    })
  })

  describe('toUnixTime', () => {
    it('should convert Date object to Unix timestamp', () => {
      const date = new Date('2025-02-27T10:30:00Z')
      const result = toUnixTime(date)

      // Expected Unix timestamp for 2025-02-27T10:30:00Z (in seconds)
      expect(result).toBe(1740652200)
    })

    it('should handle Unix epoch', () => {
      const date = new Date('1970-01-01T00:00:00Z')
      const result = toUnixTime(date)

      expect(result).toBe(0)
    })

    it('should truncate milliseconds', () => {
      const date = new Date('2025-02-27T10:30:00.999Z')
      const result = toUnixTime(date)

      // Should be the same as without milliseconds
      expect(result).toBe(1740652200)
    })
  })

  describe('Integration tests', () => {
    it('should round-trip from Date to Unix timestamp and back', () => {
      const originalDate = new Date('2025-02-27T10:30:00Z')
      const timestamp = toUnixTime(originalDate)
      const roundTrippedDate = fromUnixTime(timestamp)

      expect(roundTrippedDate.getUTCFullYear()).toBe(
        originalDate.getUTCFullYear(),
      )
      expect(roundTrippedDate.getUTCMonth()).toBe(originalDate.getUTCMonth())
      expect(roundTrippedDate.getUTCDate()).toBe(originalDate.getUTCDate())
      expect(roundTrippedDate.getUTCHours()).toBe(originalDate.getUTCHours())
      expect(roundTrippedDate.getUTCMinutes()).toBe(
        originalDate.getUTCMinutes(),
      )
      expect(roundTrippedDate.getUTCSeconds()).toBe(
        originalDate.getUTCSeconds(),
      )
    })

    it('should combine addDays and startOfDay correctly', () => {
      const date = new Date('2025-02-27T10:30:00Z')
      const nextDay = addDays(date, 1)
      const startOfNextDay = startOfDay(nextDay)

      expect(startOfNextDay.getUTCFullYear()).toBe(2025)
      expect(startOfNextDay.getUTCMonth()).toBe(1) // February (0-indexed)
      expect(startOfNextDay.getUTCDate()).toBe(28)
      expect(startOfNextDay.getUTCHours()).toBe(0)
      expect(startOfNextDay.getUTCMinutes()).toBe(0)
      expect(startOfNextDay.getUTCSeconds()).toBe(0)
      expect(startOfNextDay.getUTCMilliseconds()).toBe(0)
    })
  })
})

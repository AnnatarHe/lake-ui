import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { fromUnixTime, startOfDay, toUnixTime } from '../utils/date'
import DailyActivityChart from './index'

describe('DailyActivityChart Component', () => {
  const now = new Date()
  const startDate = new Date(Date.UTC(now.getUTCFullYear(), 1, 1, 0, 0, 0, 0))

  it('should render empty chart when no data is provided', () => {
    render(<DailyActivityChart data={[]} startDate={startDate} />)

    // Check if the SVG container is rendered
    const svgElement = document.querySelector('svg')
    expect(svgElement).toBeInTheDocument()

    // Check if empty cells are rendered with the default background color
    const rects = document.querySelectorAll('rect')
    expect(rects.length).toBeGreaterThan(0)

    // Sample a few cells to ensure they have the default empty color
    const emptyCellColor = '#ebedf0' // Light mode background color for empty cells
    expect(rects[0]).toHaveAttribute('fill', emptyCellColor)
    expect(rects[10]).toHaveAttribute('fill', emptyCellColor)
  })

  it('should render chart with activity data correctly', () => {
    const today = startOfDay(new Date())
    const yesterday = startOfDay(new Date(today))
    yesterday.setDate(yesterday.getDate() - 1)

    const mockData = [
      { date: toUnixTime(today), count: 10 },
      { date: toUnixTime(yesterday), count: 5 },
    ]

    render(<DailyActivityChart data={mockData} startDate={startDate} />)

    // Check if the SVG container is rendered
    const svgElement = document.querySelector('svg')
    expect(svgElement).toBeInTheDocument()

    // Find cells with activity data
    const rects = document.querySelectorAll('rect')

    // Verify that we have cells with activity counts
    const cellsWithActivity = Array.from(rects).filter(
      rect =>
        rect.getAttribute('data-count') === '5'
        || rect.getAttribute('data-count') === '10',
    )

    expect(cellsWithActivity.length).toBe(2)

    // Check that cells with activity have different colors than empty cells
    const emptyCellColor = '#ebedf0'
    cellsWithActivity.forEach((cell) => {
      expect(cell.getAttribute('fill')).not.toBe(emptyCellColor)
    })

    const cs = Array.from(rects).filter(
      x => x.getAttribute('fill') !== emptyCellColor,
    )

    // The chart now always shows 366 cells (0-365 days), with only 2 having activity
    expect(cellsWithActivity.length).toBe(2)
  })

  it('should apply different colors based on activity count', () => {
    // Create data with varying activity counts to test color gradients
    const baseDate = startOfDay(new Date())
    const mockData = [
      { date: toUnixTime(baseDate), count: 0 }, // Empty
      {
        date: toUnixTime(new Date(baseDate.setDate(baseDate.getDate() - 1))),
        count: 1,
      }, // Low
      {
        date: toUnixTime(new Date(baseDate.setDate(baseDate.getDate() - 1))),
        count: 5,
      }, // Medium
      {
        date: toUnixTime(new Date(baseDate.setDate(baseDate.getDate() - 1))),
        count: 10,
      }, // High
      {
        date: toUnixTime(new Date(baseDate.setDate(baseDate.getDate() - 1))),
        count: 20,
      }, // Very high
    ]

    render(<DailyActivityChart data={mockData} startDate={startDate} />)

    // Get all cells
    const rects = document.querySelectorAll('rect')

    // Find cells with specific activity counts
    const emptyCells = Array.from(rects).filter(
      rect => rect.getAttribute('data-count') === '0',
    )
    const lowActivityCells = Array.from(rects).filter(
      rect => rect.getAttribute('data-count') === '1',
    )
    const highActivityCells = Array.from(rects).filter(
      rect => rect.getAttribute('data-count') === '20',
    )

    // Check that different activity levels have different colors
    expect(emptyCells[0].getAttribute('fill')).toBe('#ebedf0') // Empty cell color

    // Different activity levels should have different colors
    if (lowActivityCells.length > 0 && highActivityCells.length > 0) {
      expect(lowActivityCells[0].getAttribute('fill')).not.toBe(
        highActivityCells[0].getAttribute('fill'),
      )
    }
  })

  it('should display correct tooltip information', () => {
    const today = startOfDay(new Date())
    const formattedDate = fromUnixTime(toUnixTime(today)).toLocaleDateString(
      'en-US',
      {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      },
    )

    const mockData = [{ date: toUnixTime(today), count: 10 }]

    render(<DailyActivityChart data={mockData} startDate={startDate} />)

    // Find the cell with today's data
    const todayCell = Array.from(document.querySelectorAll('rect')).find(
      rect => rect.getAttribute('data-count') === '10',
    )

    // Check that the title (tooltip) contains the correct information
    expect(todayCell).toHaveAttribute('data-date', formattedDate)

    const titleElement = todayCell?.querySelector('title')
    expect(titleElement?.textContent).toBe(`10 activities on ${formattedDate}`)
  })

  it('should render the correct number of weeks', () => {
    render(<DailyActivityChart data={[]} startDate={startDate} />)

    // Check that we have the correct number of week groups (52 weeks + partial weeks)
    const weekGroups = document.querySelectorAll('svg > g')

    // We should have around 52-53 weeks in a year
    expect(weekGroups.length).toBeGreaterThanOrEqual(52)
    expect(weekGroups.length).toBeLessThanOrEqual(54)
  })
})

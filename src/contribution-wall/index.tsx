import React, { useMemo } from 'react'
import { addDays, fromUnixTime, startOfDay, toUnixTime } from '../utils/date'

import { percentilesOf } from '../utils/percentiles'

interface Props {
  data: readonly {
    date: number
    count: number
  }[]
  startDate: Date
}

function getColor(
  count: number,
  percentiles: ReturnType<typeof percentilesOf>,
): string {
  if (count === 0) return '#2d333b' // Dark mode background
  if (count < percentiles.p25) return '#0e4429' // Darker shade of green
  if (count < percentiles.p50) return '#006d32' // Dark green
  if (count < percentiles.p75) return '#26a641' // Medium green
  return '#39d353'
}

function DailyActivityChart(props: Props) {
  const { data, startDate } = props

  const percentiles = percentilesOf(data.map((d) => d.count))

  const processedData = useMemo(() => {
    // Create an array for the last 365 days
    const days: { date: number; count: number }[] = []
    // Fill the array with the last 365 days
    for (let i = 0; i <= 365; i++) {
      const date = addDays(startDate, i)
      days.push({
        date: toUnixTime(date),
        count: 0,
      })
    }
    // Map the actual data to the days array
    const dataMap = new Map(
      data.map((item) => [
        toUnixTime(startOfDay(fromUnixTime(item.date))),
        item.count,
      ]),
    )
    return days.map((day) => ({
      ...day,
      count: dataMap.get(day.date) || 0,
    }))
  }, [data, startDate])

  const weeks = useMemo(() => {
    const result = []
    for (let i = 0; i < processedData.length; i += 7) {
      result.push(processedData.slice(i, i + 7))
    }
    return result
  }, [processedData])

  const formatDate = (timestamp: number): string => {
    const date = fromUnixTime(timestamp)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className='shadow-xl w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6'>
      <div className='overflow-x-auto'>
        <div className='min-w-full w-fit'>
          <svg
            width='100%'
            height='100%'
            viewBox='0 0 740 88'
            preserveAspectRatio='xMinYMin meet'
            className='text-xs max-w-full'
          >
            {weeks.map((week, weekIndex) => (
              <g key={weekIndex} transform={`translate(${weekIndex * 14}, 0)`}>
                {week.map((day, dayIndex) => (
                  <rect
                    key={day.date}
                    x='0'
                    y={dayIndex * 13}
                    width='10'
                    height='10'
                    fill={getColor(day.count, percentiles)}
                    rx='2'
                    ry='2'
                    data-count={day.count}
                    data-date={formatDate(day.date)}
                    className='transition-colors duration-200 hover:stroke-gray-400 hover:stroke-1'
                  >
                    <title>
                      {`${day.count} activities on ${formatDate(day.date)}`}
                    </title>
                  </rect>
                ))}
              </g>
            ))}
          </svg>
        </div>
      </div>

      <div className='mt-4 flex items-center justify-start text-xs text-gray-400 flex-wrap gap-2'>
        <div className='flex items-center'>
          <span className='mr-2'>Less</span>
          {[0, 5, 10, 20, 30].map((level) => (
            <div
              key={level}
              className='w-3 h-3 mr-1 rounded-sm'
              style={{ backgroundColor: getColor(level, percentiles) }}
            />
          ))}
          <span className='ml-1'>More</span>
        </div>

        <div className='ml-auto text-gray-500 text-xs'>
          {processedData[0] && processedData[processedData.length - 1] && (
            <span>
              {formatDate(processedData[0].date)} -{' '}
              {formatDate(processedData[processedData.length - 1].date)}
              <span className='ml-1 text-gray-700 text-xs'>(UTC)</span>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default DailyActivityChart

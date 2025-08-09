import { useMemo } from 'react'
import { addDays, fromUnixTime, startOfDay, toUnixTime } from '../utils/date'
import { cn } from '@/utils/cn'
import { percentilesOf } from '../utils/percentiles'

interface Props {
  data: readonly {
    date: number
    count: number
  }[]
  startDate: Date
  colorScheme?: 'green' | 'blue' | 'purple' | 'orange'
  className?: string
}

function getColor(
  count: number,
  percentiles: ReturnType<typeof percentilesOf>,
  colorScheme: string = 'green',
  isDark: boolean = false
): string {
  const schemes = {
    green: {
      light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
      dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
    },
    blue: {
      light: ['#ebedf0', '#c1e0ff', '#79b8ff', '#2188ff', '#0366d6'],
      dark: ['#161b22', '#0c2d6b', '#0860ca', '#1f6feb', '#58a6ff']
    },
    purple: {
      light: ['#ebedf0', '#e1bee7', '#ba68c8', '#9c27b0', '#6a1b9a'],
      dark: ['#161b22', '#4a148c', '#6a1b9a', '#8e24aa', '#ab47bc']
    },
    orange: {
      light: ['#ebedf0', '#ffcc80', '#ffb74d', '#ff9800', '#f57c00'],
      dark: ['#161b22', '#e65100', '#ef6c00', '#f57c00', '#ff9800']
    }
  }
  
  const colors = isDark ? schemes[colorScheme as keyof typeof schemes].dark : schemes[colorScheme as keyof typeof schemes].light
  
  if (count === 0) return colors[0]
  if (count < percentiles.p25) return colors[1]
  if (count < percentiles.p50) return colors[2]
  if (count < percentiles.p75) return colors[3]
  return colors[4]
}

function DailyActivityChart(props: Props) {
  const { data, startDate, colorScheme = 'green', className } = props

  const percentiles = percentilesOf(data.map(d => d.count))

  const processedData = useMemo(() => {
    // Create an array for the last 365 days
    const days: { date: number, count: number }[] = []
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
      data.map(item => [
        toUnixTime(startOfDay(fromUnixTime(item.date))),
        item.count,
      ]),
    )
    return days.map(day => ({
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
    <div className={cn(
      'w-full rounded-xl p-4 sm:p-6',
      'bg-white dark:bg-gray-900',
      'border border-gray-200 dark:border-gray-700',
      'shadow-sm hover:shadow-md transition-shadow duration-200',
      className
    )}>
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
                    fill={getColor(day.count, percentiles, colorScheme, typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches)}
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

      <div className='mt-4 flex items-center justify-start text-xs text-gray-600 dark:text-gray-400 flex-wrap gap-2'>
        <div className='flex items-center'>
          <span className='mr-2'>Less</span>
          {[0, 5, 10, 20, 30].map(level => (
            <div
              key={level}
              className='w-3 h-3 mr-1 rounded-sm'
              style={{ backgroundColor: getColor(level, percentiles, colorScheme, typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) }}
            />
          ))}
          <span className='ml-1'>More</span>
        </div>

        <div className='ml-auto text-gray-500 dark:text-gray-400 text-xs'>
          {processedData[0] && processedData[processedData.length - 1] && (
            <span>
              {formatDate(processedData[0].date)}
              {' '}
              -
              {' '}
              {formatDate(processedData[processedData.length - 1].date)}
              <span className='ml-1 text-gray-400 dark:text-gray-500 text-xs'>(UTC)</span>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default DailyActivityChart

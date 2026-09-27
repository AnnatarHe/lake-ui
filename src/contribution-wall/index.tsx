import { useMemo } from 'react'
import { addDays, fromUnixTime, startOfDay, toUnixTime } from '../utils/date'
import { cn } from '@/utils/cn'
import { percentilesOf } from '../utils/percentiles'

export type ContributionWallColorScheme = 'accent' | 'green' | 'blue' | 'purple' | 'orange'

export interface ContributionWallProps {
  data: readonly {
    date: number
    count: number
  }[]
  startDate: Date
  /** `accent` follows the theme tokens; the named palettes follow theme.css variables. */
  colorScheme?: ContributionWallColorScheme
  className?: string
  labels?: { less?: string, more?: string, utc?: string }
  /** Title of each day cell. Defaults to "{count} activities on {date}". */
  formatTooltip?: (date: Date, count: number) => string
  /** BCP 47 locale for dates. Defaults to `en-US`. */
  locale?: string
}

type Level = 0 | 1 | 2 | 3 | 4

// Class names are spelled out so Tailwind can find them in the built files.
const levelClasses: Record<ContributionWallColorScheme, string[]> = {
  accent: ['fill-lake-line', 'fill-lake-accent/25', 'fill-lake-accent/50', 'fill-lake-accent/75', 'fill-lake-accent'],
  green: ['fill-(--lake-wall-green-0)', 'fill-(--lake-wall-green-1)', 'fill-(--lake-wall-green-2)', 'fill-(--lake-wall-green-3)', 'fill-(--lake-wall-green-4)'],
  blue: ['fill-(--lake-wall-blue-0)', 'fill-(--lake-wall-blue-1)', 'fill-(--lake-wall-blue-2)', 'fill-(--lake-wall-blue-3)', 'fill-(--lake-wall-blue-4)'],
  purple: ['fill-(--lake-wall-purple-0)', 'fill-(--lake-wall-purple-1)', 'fill-(--lake-wall-purple-2)', 'fill-(--lake-wall-purple-3)', 'fill-(--lake-wall-purple-4)'],
  orange: ['fill-(--lake-wall-orange-0)', 'fill-(--lake-wall-orange-1)', 'fill-(--lake-wall-orange-2)', 'fill-(--lake-wall-orange-3)', 'fill-(--lake-wall-orange-4)'],
}

// Light palettes as presentation attributes; the classes above override them.
const fallbackFills: Record<ContributionWallColorScheme, string[]> = {
  accent: ['#ebedf0', '#c1e0ff', '#79b8ff', '#2188ff', '#0366d6'],
  green: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  blue: ['#ebedf0', '#c1e0ff', '#79b8ff', '#2188ff', '#0366d6'],
  purple: ['#ebedf0', '#e1bee7', '#ba68c8', '#9c27b0', '#6a1b9a'],
  orange: ['#ebedf0', '#ffcc80', '#ffb74d', '#ff9800', '#f57c00'],
}

function levelOf(count: number, percentiles: ReturnType<typeof percentilesOf>): Level {
  if (count === 0) return 0
  if (count < percentiles.p25) return 1
  if (count < percentiles.p50) return 2
  if (count < percentiles.p75) return 3
  return 4
}

function DailyActivityChart(props: ContributionWallProps) {
  const {
    data,
    startDate,
    colorScheme = 'green',
    className,
    labels,
    formatTooltip,
    locale = 'en-US',
  } = props

  const percentiles = percentilesOf(data.map(d => d.count))

  const processedData = useMemo(() => {
    const dataMap = new Map(
      data.map(item => [
        toUnixTime(startOfDay(fromUnixTime(item.date))),
        item.count,
      ]),
    )
    // One cell per day for the 366 days from startDate.
    const days: { date: number, count: number }[] = []
    for (let i = 0; i <= 365; i++) {
      const date = toUnixTime(addDays(startDate, i))
      days.push({ date, count: dataMap.get(date) || 0 })
    }
    return days
  }, [data, startDate])

  const weeks = useMemo(() => {
    const result = []
    for (let i = 0; i < processedData.length; i += 7) {
      result.push(processedData.slice(i, i + 7))
    }
    return result
  }, [processedData])

  // Days are UTC midnights; formatting in UTC keeps server and client output identical.
  const formatDate = (timestamp: number): string => fromUnixTime(timestamp).toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
  const tooltip = (day: { date: number, count: number }) => formatTooltip
    ? formatTooltip(fromUnixTime(day.date), day.count)
    : `${day.count} activities on ${formatDate(day.date)}`

  const classes = levelClasses[colorScheme] ?? levelClasses.green
  const fills = fallbackFills[colorScheme] ?? fallbackFills.green

  return (
    <div className={cn(
      'w-full rounded-lake-panel p-4 sm:p-6',
      'bg-lake-surface border border-lake-line',
      'shadow-lake-card hover:shadow-md transition-shadow duration-200',
      className,
    )}
    >
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
                {week.map((day, dayIndex) => {
                  const level = levelOf(day.count, percentiles)
                  return (
                    <rect
                      key={day.date}
                      x='0'
                      y={dayIndex * 13}
                      width='10'
                      height='10'
                      fill={fills[level]}
                      rx='2'
                      ry='2'
                      data-count={day.count}
                      data-level={level}
                      data-date={formatDate(day.date)}
                      className={cn(classes[level], 'transition-colors duration-200 hover:stroke-lake-fg-subtle hover:stroke-1')}
                    >
                      <title>{tooltip(day)}</title>
                    </rect>
                  )
                })}
              </g>
            ))}
          </svg>
        </div>
      </div>

      <div className='mt-4 flex items-center justify-start text-xs text-lake-fg-subtle flex-wrap gap-2'>
        <div className='flex items-center'>
          <span className='mr-2'>{labels?.less ?? 'Less'}</span>
          <svg width='76' height='12' viewBox='0 0 76 12' aria-hidden='true'>
            {classes.map((levelClass, level) => (
              <rect key={level} x={level * 16} y='0' width='12' height='12' rx='2' fill={fills[level]} className={levelClass} />
            ))}
          </svg>
          <span className='ml-1'>{labels?.more ?? 'More'}</span>
        </div>

        <div className='ml-auto text-xs'>
          {processedData[0] && processedData[processedData.length - 1] && (
            <span>
              {formatDate(processedData[0].date)}
              {' '}
              -
              {' '}
              {formatDate(processedData[processedData.length - 1].date)}
              <span className='ml-1 text-lake-fg-subtle/80'>{labels?.utc ?? '(UTC)'}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default DailyActivityChart

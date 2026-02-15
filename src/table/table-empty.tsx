import { cn } from '@/utils/cn'
import type { TableEmptyProps } from './types'

function TableEmpty({
  message = 'No data available',
  className,
  colSpan,
}: TableEmptyProps) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className={cn(
          'px-3 py-4 sm:px-4 sm:py-8 text-center text-gray-500 dark:text-gray-400',
          className,
        )}
      >
        {message}
      </td>
    </tr>
  )
}

export default TableEmpty

import { cn } from '@/utils/cn'
import type { TableEndProps } from './types'

function TableEnd({ message, className, total }: TableEndProps) {
  const defaultMessage = total != null
    ? `All ${total} items loaded`
    : 'No more data'

  return (
    <div
      className={cn(
        'py-3 sm:py-4 text-center text-xs sm:text-sm text-lake-fg-subtle',
        className,
      )}
    >
      {message ?? defaultMessage}
    </div>
  )
}

export default TableEnd

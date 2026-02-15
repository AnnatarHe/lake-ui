import { cn } from '@/utils/cn'
import type { TableEndProps } from './types'

function TableEnd({ message, className, total }: TableEndProps) {
  const defaultMessage = total != null
    ? `All ${total} items loaded`
    : 'No more data'

  return (
    <div
      className={cn(
        'py-4 text-center text-sm text-gray-400 dark:text-gray-500',
        className,
      )}
    >
      {message ?? defaultMessage}
    </div>
  )
}

export default TableEnd

import { cn } from '@/utils/cn'

type Props = React.InputHTMLAttributes<HTMLInputElement>

function InputField(props: Props) {
  const { className, value, onChange, ...rest } = props

  return (
    <input
      type='text'
      value={value}
      onChange={onChange}
      className={cn(
        'w-full rounded-lg border border-gray-700 bg-gray-800/50 py-2 pl-10 pr-10',
        'text-gray-200 placeholder-gray-500',
        'focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-700/50',
        className,
      )}
      {...rest}
    />
  )
}

export default InputField

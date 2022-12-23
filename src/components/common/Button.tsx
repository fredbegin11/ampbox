import classNames from 'classnames'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: 'outlined' | 'default'
}

const Button = ({ variant = 'default', className, children, ...rest }: Props) => {
  return (
    <button
      className={classNames(
        'bg-transparent py-1 px-4 rounded-lg font-medium border-4',
        {
          'bg-transparent text-gray-800 hover:border-gray-900': variant === 'outlined',
          'border-gray-800 bg-gray-800 text-white hover:border-gray-900': variant === 'default',
        },
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button

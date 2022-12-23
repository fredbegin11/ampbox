import classNames from 'classnames'

interface Option {
  value: string
  label: string
}

interface Props extends React.HTMLAttributes<HTMLSelectElement> {
  label?: string
  name: string
  options?: Option[]
}

const Select = ({ name, options, placeholder, ...rest }: Props) => {
  return (
    <div className='flex flex-col min-w-[200px]'>
      <select
        id={name}
        name={name}
        className={classNames('bg-gray-50 border-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2')}
        {...rest}
      >
        <option value='' disabled hidden>
          {placeholder}
        </option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select

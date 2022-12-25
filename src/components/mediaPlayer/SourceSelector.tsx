import { FormEvent, useEffect } from 'react'
import { useSource } from 'src/hooks'
import { Select } from 'src/components/common'
import classNames from 'classnames'

const SourceSelector = () => {
  const { init, inputs, hasPermission, checkPermissions } = useSource()

  useEffect(() => {
    if (!hasPermission) {
      checkPermissions()
    }
  }, [])

  const options = inputs.map((input) => ({ label: input.name, value: input.id }))

  const handleChange = (e: FormEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement
    const selectedInput = inputs.find((input) => input.id === target.value)
    if (selectedInput) {
      init(selectedInput)
    }
  }

  return (
    <div className='flex flex-col space-y-2 items-center'>
      <h2 className='text-xl font-bold'>Current source</h2>
      <div className='flex space-x-3'>
        <Select
          defaultValue=''
          name='Source'
          label='Input Source'
          placeholder='Select your source (input or sample)'
          options={options}
          onChange={handleChange}
        />
      </div>

      <span>
        Microphone permission:
        <span className={classNames('ml-1', { 'text-red-600': !hasPermission, 'text-green-600': hasPermission })}>
          {hasPermission ? 'Okay' : 'Denied'}
        </span>
      </span>
    </div>
  )
}

export default SourceSelector

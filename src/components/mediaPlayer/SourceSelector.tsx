import { useSource } from 'src/hooks'
import { Select } from 'src/components/common'

const SourceSelector = () => {
  const { init, inputs } = useSource()

  const options = inputs.map((input) => ({ label: input.name, value: input.id }))

  const handleChange = (e: any) => {
    const selectedValue = e.target.value as string
    const selectedInput = inputs.find((input) => input.id === selectedValue)
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
    </div>
  )
}

export default SourceSelector

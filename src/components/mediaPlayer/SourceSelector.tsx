import { FormEvent, useEffect } from 'react'
import { useRecorder, useSource } from 'src/hooks'
import { Select } from 'src/components/common'
import { MicrophoneIcon, StopIcon } from '@heroicons/react/24/solid'

const SourceSelector = () => {
  const { init, inputs, hasPermission, checkPermissions, isActive } = useSource()
  const recorder = useRecorder()

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
    <div className='flex space-y-2 items-center flex-col'>
      <h2 className='text-xl font-bold'>Audio source</h2>
      <div className='flex space-x-3 items-center'>
        <Select
          defaultValue=''
          name='Source'
          label='Input Source'
          placeholder='Select your source (input or sample)'
          options={options}
          onChange={handleChange}
        />
        {isActive && (
          <button
            className='bg-neutral-800 text-white font-medium rounded-full p-3'
            disabled={!isActive}
            onClick={recorder.isRecording ? recorder.stopRecording : recorder.startRecording}
          >
            {recorder.isRecording ? <StopIcon className='w-5 h-5' /> : <MicrophoneIcon className='w-5 h-5' />}
          </button>
        )}
      </div>

      {!hasPermission && (
        <span>
          Microphone permission: <span className='ml-1 text-red-600'>Denied</span>
        </span>
      )}
    </div>
  )
}

export default SourceSelector

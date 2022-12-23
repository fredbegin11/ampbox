import { useState } from 'react'
import classNames from 'classnames'
import Knob from './Knob'
import { useReverb } from 'src/hooks'

type Props = {
  disabled?: boolean
}

const ReverbPedal = ({ disabled }: Props) => {
  const reverb = useReverb()
  const [isActive, setIsActive] = useState(false)

  const handleToggle = () => {
    if (isActive) reverb.deactivate()
    else reverb.activate()

    setIsActive((value) => !value)
  }

  return (
    <div className='flex flex-col p-6 rounded-xl items-center space-y-8 shadow-pedal bg-slate-700 text-white'>
      <span className='text-3xl'>Reverb</span>

      <div className='h-60'>
        <div className='w-full pb-12 flex items-center'>
          <Knob label='Room Size' set={reverb.setRoomSize} disabled={disabled} />
          <Knob label='Blend' set={reverb.setBlend} disabled={disabled} />
        </div>
      </div>

      <div className={classNames('rounded-full', { 'bg-red-500': isActive, 'bg-neutral-300  p-3': !isActive })}>
        {isActive && <div className='rounded-full blur-md p-3 bg-red-600' />}
      </div>

      <button disabled={disabled} className='relative h-16 scale-150' onClick={handleToggle} type='button'>
        <div className='absolute h-[2.125em] w-[2.125em]  rounded-full bottom-[1.25em] left-[-1.067em] shadow-pedal bg-gray-400'>
          <div className='absolute h-6 w-6 bg-gray-200 rounded-full left-1/2 top-1/2 -mt-3 -ml-3'></div>
        </div>
      </button>
    </div>
  )
}

export default ReverbPedal

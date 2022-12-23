import { useState } from 'react'
import classNames from 'classnames'
import Knob from './Knob'
import { useChorus } from 'src/hooks'

type Props = {
  disabled?: boolean
}

const ChorusPedal = ({ disabled }: Props) => {
  const chorus = useChorus()
  const [isActive, setIsActive] = useState(false)

  const handleToggle = () => {
    if (isActive) chorus.deactivate()
    else chorus.activate()

    setIsActive((value) => !value)
  }

  return (
    <div className='flex flex-col p-6 w-72 rounded-xl items-center space-y-8 shadow-pedal bg-blue-300'>
      <span className='text-3xl'>Chorus</span>

      <div className='h-60'>
        <div className='w-full flex items-center'>
          <Knob label='Depth' set={chorus.setDepth} disabled={disabled} />
          <Knob label='Spread' set={chorus.setSpread} disabled={disabled} />
        </div>
        <div className='w-full pb-12 flex items-center justify-center'>
          <Knob label='Delay Time' set={chorus.setDelayTime} disabled={disabled} />
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

export default ChorusPedal

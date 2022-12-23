import { useState } from 'react'
import classNames from 'classnames'
import { useChorus } from 'src/hooks'
import { Knob } from 'src/components/common'

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
    <div className='flex flex-col w-48 max-w-[16rem] h-[500px] p-6 rounded-xl items-center justify-between space-y-8 shadow-pedal bg-blue-300'>
      <div className='flex flex-col items-center space-y-6'>
        <span className='text-3xl'>Chorus</span>
        <div className='flex flex-col items-center'>
          <div className='w-full flex items-center justify-center'>
            <Knob label='Depth' set={chorus.setDepth} disabled={disabled} />
            <Knob label='Spread' set={chorus.setSpread} disabled={disabled} />
          </div>
          <div className='w-full flex items-center justify-center'>
            <Knob label='Rate' set={chorus.setDelayTime} disabled={disabled} />
            <Knob label='Blend' set={chorus.setBlend} disabled={disabled} />
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center space-y-6'>
        <div className={classNames('rounded-full', { 'bg-red-500': isActive, 'bg-neutral-300  p-3': !isActive })}>
          {isActive && <div className='rounded-full blur-md p-3 bg-red-600' />}
        </div>

        <button disabled={disabled} className='relative h-16 scale-150' onClick={handleToggle} type='button'>
          <div className='absolute h-[2.125em] w-[2.125em]  rounded-full bottom-[1.25em] left-[-1.067em] shadow-pedal bg-gray-400'>
            <div className='absolute h-6 w-6 bg-gray-200 rounded-full left-1/2 top-1/2 -mt-3 -ml-3'></div>
          </div>
        </button>
      </div>
    </div>
  )
}

export default ChorusPedal

import { useState } from 'react'
import classNames from 'classnames'
import { Knob } from 'src/components/common'
import { useReverb } from 'src/hooks'

type Props = {
  disabled?: boolean
}

const ReverbPedal = ({ disabled }: Props) => {
  const reverb = useReverb({ orderWeight: 90 })
  const [isActive, setIsActive] = useState(false)

  const handleToggle = () => {
    if (isActive) reverb.deactivate()
    else reverb.activate()

    setIsActive((value) => !value)
  }

  return (
    <div className='flex flex-col w-48 max-w-[16rem] h-[450px] p-6 rounded-xl items-center justify-between shadow-pedal bg-slate-700 text-white'>
      <div className='flex flex-col items-center space-y-6'>
        <span className='text-3xl'>Reverb</span>

        <div className='w-full flex items-center justify-center'>
          <Knob label='Room' set={reverb.setRoomSize} disabled={disabled} />
          <Knob label='Blend' set={reverb.setBlend} disabled={disabled} />
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

export default ReverbPedal

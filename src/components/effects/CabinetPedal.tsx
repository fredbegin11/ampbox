import { useState } from 'react'
import classNames from 'classnames'
import { useCabinet } from 'src/hooks'
import switchOnOff from 'src/assets/images/knobs/switch_offon.png'
import Radio from './Radio'

type Props = {
  disabled?: boolean
}

const CabinetPedal = ({ disabled }: Props) => {
  const [isActive, setIsActive] = useState(false)
  const cabinet = useCabinet(isActive)

  const handleToggle = () => {
    if (isActive) cabinet.deactivate()
    else cabinet.activate()

    setIsActive((value) => !value)
  }

  return (
    <div className='flex flex-col p-6 w-72 rounded-xl items-center space-y-8 shadow-pedal bg-red-300'>
      <span className='text-3xl'>CabSim</span>

      <div className='h-60 flex'>
        <div className='flex flex-col items-center'>
          <Radio disabled={disabled} label='Cab #1' onChange={() => cabinet.changeCab(1)} checked={cabinet.activeCab === 1} name='cab' />
        </div>
        <div className='flex flex-col items-center'>
          <Radio disabled={disabled} label='Cab #2' onChange={() => cabinet.changeCab(2)} checked={cabinet.activeCab === 2} name='cab' />
        </div>
        <div className='flex flex-col items-center'>
          <Radio disabled={disabled} label='Cab #3' onChange={() => cabinet.changeCab(3)} checked={cabinet.activeCab === 3} name='cab' />
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

export default CabinetPedal

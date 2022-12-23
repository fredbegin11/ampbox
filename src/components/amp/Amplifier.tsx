import classNames from 'classnames'
import { useState } from 'react'
import grid from 'src/assets/images/grid.jpg'
import { useEq3, useGain, useVolume } from 'src/hooks'
import { Checkbox, Knob } from '../common'

interface Props {
  disabled?: boolean
}

const Amplifier = ({ disabled }: Props) => {
  const [isActive, setIsActive] = useState(false)

  const eq = useEq3()
  const volume = useVolume()
  const gain = useGain()

  const handleToggle = () => {
    if (isActive) {
      gain.deactivate()
      volume.deactivate()
      eq.deactivate()
    } else {
      volume.activate()
      gain.activate()
      eq.activate()
    }

    setIsActive((value) => !value)
  }

  return (
    <>
      <div className='bg-black rounded-3xl overflow-hidden h-56 w-[500px] shadow-pedal'>
        <div className='h-32 p-8 pb-4'>
          <img src={grid} className='w-full h-full object-cover rounded-lg border-4 border-white opacity-25' />
        </div>
        <div className='mx-8 text-white flex justify-between'>
          <Knob diameter='60' label='Volume' set={volume.setVolume} disabled={disabled} />
          <Knob diameter='60' label='Gain' set={gain.setGain} disabled={disabled} />
          <Knob diameter='60' label='Low' set={eq.setLow} disabled={disabled} />
          <Knob diameter='60' label='Mid' set={eq.setMid} disabled={disabled} />
          <Knob diameter='60' label='High' set={eq.setHigh} disabled={disabled} />

          <div className='flex flex-col items-center h-full'>
            <div className={classNames('rounded-full', { 'bg-red-500': isActive, 'bg-neutral-300 p-3': !isActive })}>
              {isActive && <div className='rounded-full blur-md p-3 bg-red-600' />}
            </div>
            <Checkbox diameter='60' name='On' checked={isActive} onChange={handleToggle} disabled={disabled} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Amplifier

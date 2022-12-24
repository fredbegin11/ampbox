import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import grid from 'src/assets/images/grid.jpg'
import { SourceContext } from 'src/context'
import { useCabinet, useEq3, useGain, useVolume } from 'src/hooks'
import { Checkbox, Knob } from '../common'

interface Props {
  disabled?: boolean
}

const Amplifier = ({ disabled }: Props) => {
  const [isActive, setIsActive] = useState(false)
  const { source } = useContext(SourceContext)
  useCabinet()
  const eq = useEq3()
  const volume = useVolume()
  const gain = useGain()

  const activate = () => {
    volume.activate()
    gain.activate()
    eq.activate()
  }

  useEffect(() => {
    if (source && !isActive) {
      setIsActive(true)
      activate()
    }
  }, [source, isActive])

  return (
    <div className='carbon flex flex-col justify-center rounded-3xl items-center shadow-pedal relative p-8'>
      <div className='p-4 rounded bg-slate-200 flex justify-between items-center'>
        <Knob diameter='60' label='Volume' set={volume.setVolume} disabled={disabled} />
        <Knob diameter='60' label='Gain' set={gain.setGain} disabled={disabled} />
        <Knob diameter='60' label='Low' set={eq.setLow} disabled={disabled} />
        <Knob diameter='60' label='Mid' set={eq.setMid} disabled={disabled} />
        <Knob diameter='60' label='High' set={eq.setHigh} disabled={disabled} />

        <div className='flex flex-col items-center'>
          <span className='block'>Power</span>

          <div className='h-[60px] w-[60px] flex items-center justify-center'>
            <div className='rounded-full h-6 aspect-square bg-red-800 bottom-0 '>
              <div className='rounded-full blur-sm h-6 aspect-square bg-red-600' />
            </div>
          </div>
        </div>
      </div>

      <div className='h-full relative pt-8 text-white'>
        <img src={grid} className='rounded-xl object-cover h-[300px] w-[400px] border-4 border-white' />

        <div className='flex flex-col items-center justify-center absolute top-8 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.8)] rounded-xl'>
          <span className='text-3xl'>AmpBox</span>
        </div>
      </div>
    </div>
  )
}

export default Amplifier

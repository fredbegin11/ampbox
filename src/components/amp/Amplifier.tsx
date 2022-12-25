import { useContext, useEffect, useState } from 'react'
import grid from 'src/assets/images/grid.jpg'
import { SourceContext } from 'src/context'
import { useCabinet, useEq3, useGain, useVolume } from 'src/hooks'
import { Knob } from '../common'

interface Props {
  disabled?: boolean
}

const Amplifier = ({ disabled }: Props) => {
  const [isActive, setIsActive] = useState(false)
  const { source } = useContext(SourceContext)
  useCabinet()
  const volume = useVolume({ orderWeight: 10 })
  const gain = useGain({ orderWeight: 11 })
  const eq = useEq3({ orderWeight: 12 })

  useEffect(() => {
    if (source && !isActive) {
      setIsActive(true)
      activate()
    }
  }, [source, isActive])

  const activate = () => {
    volume.activate()
    gain.activate()
    eq.activate()
  }

  const changeVolume = (value: number) => {
    volume.setVolume(value)
    gain.setGain(value)
  }

  return (
    <div className='carbon flex flex-col justify-center rounded-3xl items-center shadow-pedal relative p-8'>
      <div className='p-4 rounded bg-slate-200 flex justify-between items-center'>
        <Knob diameter='50' label='Volume' set={changeVolume} disabled={disabled} />
        <Knob diameter='50' label='Low' set={eq.setLow} disabled={disabled} />
        <Knob diameter='50' label='Mid' set={eq.setMid} disabled={disabled} />
        <Knob diameter='50' label='High' set={eq.setHigh} disabled={disabled} />

        <div className='flex flex-col items-center'>
          <span className='block'>Power</span>

          <div className='h-[50px] w-[50px] flex items-center justify-center'>
            <div className='rounded-full h-6 aspect-square bg-red-800 bottom-0 '>
              <div className='rounded-full blur-sm h-6 aspect-square bg-red-600' />
            </div>
          </div>
        </div>
      </div>

      <div className='h-full relative pt-8 text-white'>
        <img src={grid} className='rounded-xl object-cover h-[300px] w-[290px] border-4 border-white' />

        <div className='flex flex-col items-center justify-center absolute top-8 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.8)] rounded-xl'>
          <span className='text-3xl'>AmpBox</span>
        </div>
      </div>
    </div>
  )
}

export default Amplifier

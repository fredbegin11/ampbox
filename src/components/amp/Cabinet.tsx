import grid from 'src/assets/images/grid.jpg'
import { useCabinet } from 'src/hooks'
import { Radio } from 'src/components/common'
import { CabinetType } from 'src/hooks/useCabinet'

type Props = {
  disabled?: boolean
}

const Cabinet = ({ disabled }: Props) => {
  const cabinet = useCabinet()

  return (
    <div className='flex flex-col justify-center h-[500px] w-[550px] p-8 rounded-3xl items-center shadow-pedal bg-black text-white relative'>
      <img src={grid} className='w-full rounded-xl object-cover h-[450px] border-4 border-white' />

      <div className='flex flex-col items-center justify-center space-y-6 absolute bg-[rgba(0,0,0,0.8)] rounded-3xl h-[500px] w-[550px]'>
        <span className='text-3xl'>Cabinet</span>
        <div className='flex items-center space-x-6'>
          <Radio
            disabled={disabled}
            label='Default'
            onChange={() => cabinet.changeCab(CabinetType.default)}
            checked={cabinet.isCabActive(CabinetType.default)}
            name='cab'
          />
          <Radio
            disabled={disabled}
            label='Deep'
            onChange={() => cabinet.changeCab(CabinetType.deep)}
            checked={cabinet.isCabActive(CabinetType.deep)}
            name='cab'
          />
          <Radio
            disabled={disabled}
            label='Bright'
            onChange={() => cabinet.changeCab(CabinetType.bright)}
            checked={cabinet.isCabActive(CabinetType.bright)}
            name='cab'
          />
        </div>
      </div>
    </div>
  )
}

export default Cabinet

import grid from 'src/assets/images/grid.jpg'
import { useCabinet } from 'src/hooks'
import { Radio } from 'src/components/common'

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
          <Radio disabled={disabled} label='Default' onChange={() => cabinet.changeCab(1)} checked={cabinet.isCabActive(1)} name='cab' />
          <Radio disabled={disabled} label='Modern' onChange={() => cabinet.changeCab(4)} checked={cabinet.isCabActive(4)} name='cab' />
          <Radio disabled={disabled} label='Vintage' onChange={() => cabinet.changeCab(3)} checked={cabinet.isCabActive(3)} name='cab' />
        </div>
        <div className='flex items-center space-x-6'>
          <Radio disabled={disabled} label='Maytal #1' onChange={() => cabinet.changeCab(2)} checked={cabinet.isCabActive(2)} name='cab' />
          <Radio disabled={disabled} label='Maytal #2' onChange={() => cabinet.changeCab(5)} checked={cabinet.isCabActive(5)} name='cab' />
          <Radio disabled={disabled} label='Maytal #3' onChange={() => cabinet.changeCab(6)} checked={cabinet.isCabActive(6)} name='cab' />
        </div>
      </div>
    </div>
  )
}

export default Cabinet

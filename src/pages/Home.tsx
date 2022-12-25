import { Amplifier, Header, SourceSelector, Recorder, DistortionPedal, ChorusPedal, ReverbPedal, DelayPedal } from 'src/components'
import PhaserPedal from 'src/components/effects/PhaserPedal'
import VolumePedal from 'src/components/effects/VolumePedal'

const Home = () => {
  return (
    <div>
      <Header />
      <div className='h-full bg-neutral-50 flex flex-col p-8 space-y-8'>
        <SourceSelector />
        <Recorder />

        <div className='flex flex-col gap-16 items-center'>
          <Amplifier />

          <div className='flex flex-wrap gap-8 justify-center'>
            <DistortionPedal />
            <PhaserPedal />
            <ChorusPedal />
            <DelayPedal />
            <ReverbPedal />
            <VolumePedal />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

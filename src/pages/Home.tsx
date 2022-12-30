import { Amplifier, Header, SourceSelector, DistortionPedal, ChorusPedal, ReverbPedal, DelayPedal, PhaserPedal, VolumePedal } from 'src/components'

const Home = () => {
  return (
    <div>
      <Header />
      <div className='h-full bg-neutral-50 flex flex-col p-8 space-y-16'>
        <SourceSelector />

        <div className='flex justify-center'>
          <Amplifier />
        </div>

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
  )
}

export default Home

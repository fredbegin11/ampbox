import classNames from 'classnames'
import { Amplifier, Header, InputSelector, Cabinet, DistortionPedal, ChorusPedal, ReverbPedal, DelayPedal } from 'src/components'
import PhaserPedal from 'src/components/effects/PhaserPedal'
import VolumePedal from 'src/components/effects/VolumePedal'
import { useSource } from 'src/hooks'

const Home = () => {
  const { isActive } = useSource()

  return (
    <>
      <Header />
      <div className='h-full bg-neutral-50 flex flex-col p-8 space-y-8'>
        <InputSelector />

        <div className={classNames('flex flex-col gap-16 items-center', { 'opacity-50': !isActive })}>
          <div className='flex flex-col space-y-0.5 items-center'>
            <Amplifier disabled={!isActive} />
            <Cabinet disabled={!isActive} />
          </div>

          <div className='flex flex-wrap gap-8 justify-center' onClick={(e) => e.stopPropagation()}>
            <ReverbPedal disabled={!isActive} />
            <PhaserPedal disabled={!isActive} />
            <DistortionPedal disabled={!isActive} />
            <ChorusPedal disabled={!isActive} />
            <DelayPedal disabled={!isActive} />
            <VolumePedal disabled={!isActive} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home

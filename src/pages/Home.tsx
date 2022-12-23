import classNames from 'classnames'
import { Header, MediaPlayer, CabinetPedal, DistortionPedal, ChorusPedal, ReverbPedal, DrivePedal } from 'src/components'
import VolumePedal from 'src/components/effects/VolumePedal'
import { useSourceInput } from 'src/hooks'

const Home = () => {
  const { isActive } = useSourceInput()

  return (
    <>
      <Header />
      <div className='h-screen bg-neutral-50 flex flex-col p-8 space-y-8'>
        <MediaPlayer />

        <span>
          Pedalboard status:{' '}
          <span className={classNames({ 'text-red-500': !isActive, 'text-green-500': isActive })}>{isActive ? 'Enabled' : 'Disabled'}</span>
        </span>

        <div className={classNames('flex space-x-6', { 'opacity-50': !isActive })} onClick={(e) => e.stopPropagation()}>
          <DrivePedal disabled={!isActive} />
          <ReverbPedal disabled={!isActive} />
          <DistortionPedal disabled={!isActive} />
          <ChorusPedal disabled={!isActive} />
          <VolumePedal disabled={!isActive} />
          <CabinetPedal disabled={!isActive} />
        </div>
      </div>
    </>
  )
}

export default Home

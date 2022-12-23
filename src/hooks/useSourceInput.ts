import { useContext } from 'react'
import Dry1 from '../assets/samples/dry.mp3'
import { Destination, Mono, Player, UserMedia } from 'tone'
import { SourceContext } from 'src/context'

const useSourceInput = () => {
  const { source, setSource, selectedDevice, setSelectedDevice, devices } = useContext(SourceContext)

  const initSample = () => {
    if (!source) {
      const musicPlayer = new Player({ url: Dry1, loop: true, autostart: true })
      musicPlayer.chain(Destination)
      setSource(musicPlayer)
    }
  }

  const initUserMedia = async (device: MediaDeviceInfo) => {
    const userMedia = new UserMedia()
    await userMedia.open(device.deviceId)
    userMedia.chain(new Mono(), Destination)
    setSource(userMedia)
  }

  return { source, isActive: !!source, initSample, initUserMedia, selectedDevice, setSelectedDevice, devices }
}

export default useSourceInput

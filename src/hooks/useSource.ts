import { useContext } from 'react'
import { Destination, Player, UserMedia } from 'tone'
import { SourceContext } from 'src/context'
import { Input } from 'src/types/Input'

const useSource = () => {
  const { source, setSource, inputs } = useContext(SourceContext)

  const init = async (input: Input) => {
    source?.dispose()

    if (typeof input.media === 'string') {
      const musicPlayer = new Player({ url: input.media, loop: true, autostart: true })
      musicPlayer.chain(Destination)
      setSource(musicPlayer)
    } else {
      const userMedia = new UserMedia()
      await userMedia.open(input.media.deviceId)
      userMedia.chain(Destination)
      setSource(userMedia)
    }
  }

  return { source, isActive: !!source, init, inputs }
}

export default useSource

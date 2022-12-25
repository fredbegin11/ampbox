import { useContext } from 'react'
import { getDestination, Player, UserMedia, setContext, Context } from 'tone'
import { SourceContext } from 'src/context'
import { Input } from 'src/types/Input'

const useSource = () => {
  const { source, setSource, inputs, setHasPermissions, hasPermission } = useContext(SourceContext)

  const init = async (input: Input) => {
    const context = new Context(new AudioContext({ latencyHint: 0, sampleRate: 44100 }))
    setContext(context)
    source?.dispose()

    if (typeof input.media === 'string') {
      const musicPlayer = new Player({ url: input.media, loop: true, autostart: true })
      musicPlayer.chain(getDestination())
      setSource(musicPlayer)
    } else {
      const userMedia = new UserMedia({ context: context })
      await userMedia.open(input.media.deviceId)
      userMedia.chain(getDestination())
      setSource(userMedia)
    }
  }

  const checkPermissions = async () => {
    try {
      const medias = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      medias.getTracks().forEach((x) => x.stop())
      setHasPermissions(true)
    } catch (_e) {
      setHasPermissions(false)
    }
  }

  return { source, isActive: !!source, init, inputs, setHasPermissions, hasPermission, checkPermissions }
}

export default useSource

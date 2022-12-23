import { useRef, useState } from 'react'
import { Volume } from 'tone'
import useChain from './useChain'

const useBoost = () => {
  const [volumeAmount, setVolumeAmount] = useState(0)
  const chain = useChain()

  const volumeRef = useRef<Volume>()

  const setVolume = (value: number) => {
    setVolumeAmount(value - 50)
    volumeRef.current?.volume.set({ value: value - 50 })
  }

  const activate = () => {
    volumeRef.current = new Volume(volumeAmount)
    chain.add(volumeRef.current)
  }

  const deactivate = () => {
    if (volumeRef.current) {
      volumeRef.current.dispose()
      chain.remove(volumeRef.current)
    }
  }

  return { setVolume, activate, deactivate }
}

export default useBoost

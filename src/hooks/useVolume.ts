import { useRef, useState } from 'react'
import { Effect } from 'src/types'
import { Volume } from 'tone'
import useFxChain from './useFxChain'

const useVolume = () => {
  const [volumeAmount, setVolumeAmount] = useState(0)
  const fxChain = useFxChain()

  const volumeRef = useRef<Effect<Volume>>()

  const setVolume = (value: number) => {
    setVolumeAmount(value / 10 - 5)
    volumeRef.current?.node.volume.set({ value: value / 10 - 5 })
  }

  const activate = () => {
    volumeRef.current = new Effect(new Volume(volumeAmount))
    fxChain.add(volumeRef.current)
  }

  const deactivate = () => {
    fxChain.remove(volumeRef.current)
  }

  return { setVolume, activate, deactivate }
}

export default useVolume

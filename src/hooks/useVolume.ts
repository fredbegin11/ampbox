import { useRef, useState } from 'react'
import { Effect } from 'src/types'
import { Volume } from 'tone'
import useChain from './useChain'

const useVolume = () => {
  const [volumeAmount, setVolumeAmount] = useState(0)
  const chain = useChain()

  const volumeRef = useRef<Effect<Volume>>()

  const setVolume = (value: number) => {
    setVolumeAmount(value - 50)
    volumeRef.current?.node.volume.set({ value: value - 50 })
  }

  const activate = () => {
    volumeRef.current = new Effect(new Volume(volumeAmount))
    chain.add(volumeRef.current)
  }

  const deactivate = () => {
    chain.remove(volumeRef.current)
  }

  return { setVolume, activate, deactivate }
}

export default useVolume

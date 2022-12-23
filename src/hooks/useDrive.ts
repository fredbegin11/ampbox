import { useRef, useState } from 'react'
import { Gain, Volume } from 'tone'
import useChain from './useChain'

const useDrive = () => {
  const [gainAmount, setGainAmount] = useState(60)
  const [volumeAmount, setVolumeAmount] = useState(0)

  const chain = useChain()
  const gainRef = useRef<Gain>()
  const volumeRef = useRef<Volume>()

  const setGain = (value: number) => {
    setGainAmount(value + 10)
    gainRef.current?.gain.set({ value: value + 10 })
  }

  const setVolume = (value: number) => {
    setVolumeAmount(value - 50)
    volumeRef.current?.volume.set({ value: value - 50 })
  }

  const activate = () => {
    gainRef.current = new Gain(gainAmount)
    volumeRef.current = new Volume(volumeAmount)

    chain.add(volumeRef.current)
    chain.add(gainRef.current)
  }

  const deactivate = () => {
    if (volumeRef.current) {
      volumeRef.current.dispose()
      chain.remove(volumeRef.current)
    }

    if (gainRef.current) {
      gainRef.current.dispose()
      chain.remove(gainRef.current)
    }
  }

  return { setGain, setVolume, activate, deactivate }
}

export default useDrive

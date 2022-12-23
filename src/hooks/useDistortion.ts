import { useRef, useState } from 'react'
import { Distortion, Volume } from 'tone'
import useChain from './useChain'

const useDistortion = () => {
  const [distortionAmount, setDistortionAmount] = useState(1)
  const [volumeAmount, setVolumeAmount] = useState(0)

  const chain = useChain()

  const distortionRef = useRef<Distortion>()
  const volumeRef = useRef<Volume>()

  const setDistortion = (value: number) => {
    setDistortionAmount(value / 100)
    if (distortionRef.current) distortionRef.current.distortion = value / 50
  }

  const setVolume = (value: number) => {
    setVolumeAmount(value - 50)
    volumeRef.current?.volume.set({ value: value - 50 })
  }

  const activate = () => {
    distortionRef.current = new Distortion(distortionAmount)
    volumeRef.current = new Volume(volumeAmount)

    chain.add(volumeRef.current)
    chain.add(distortionRef.current)
  }

  const deactivate = () => {
    if (volumeRef.current) {
      volumeRef.current.dispose()
      chain.remove(volumeRef.current)
    }

    if (distortionRef.current) {
      distortionRef.current.dispose()
      chain.remove(distortionRef.current)
    }
  }

  return { setDistortion, setVolume, activate, deactivate }
}

export default useDistortion

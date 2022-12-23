import { useRef, useState } from 'react'
import { Effect } from 'src/types'
import { Distortion } from 'tone'
import useFxChain from './useFxChain'

const useDistortion = () => {
  const [distortionAmount, setDistortionAmount] = useState(1)
  const [blendAmount, setBlendAmount] = useState(0.5)

  const fxChain = useFxChain()

  const distortionRef = useRef<Effect<Distortion>>()

  const setDistortion = (value: number) => {
    setDistortionAmount(value / 100)
    if (distortionRef.current) distortionRef.current.node.distortion = value / 50
  }

  const setBlend = (value: number) => {
    setBlendAmount(value / 100)
    distortionRef.current?.node.wet.set({ value: value / 100 })
  }

  const activate = () => {
    distortionRef.current = new Effect(new Distortion(distortionAmount))
    distortionRef.current.node.wet.set({ value: blendAmount })
    fxChain.add(distortionRef.current)
  }

  const deactivate = () => fxChain.remove(distortionRef.current)

  return { setDistortion, setBlend, activate, deactivate }
}

export default useDistortion

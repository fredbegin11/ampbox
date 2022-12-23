import { useRef, useState } from 'react'
import { Effect } from 'src/types'
import { Distortion } from 'tone'
import useChain from './useChain'

const useDistortion = () => {
  const [distortionAmount, setDistortionAmount] = useState(1)

  const chain = useChain()

  const distortionRef = useRef<Effect<Distortion>>()

  const setDistortion = (value: number) => {
    setDistortionAmount(value / 100)
    if (distortionRef.current) distortionRef.current.node.distortion = value / 50
  }

  const activate = () => {
    distortionRef.current = new Effect(new Distortion(distortionAmount))
    chain.add(distortionRef.current)
  }

  const deactivate = () => chain.remove(distortionRef.current)

  return { setDistortion, activate, deactivate }
}

export default useDistortion

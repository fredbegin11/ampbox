import { useRef, useState } from 'react'
import { Effect } from 'src/types'
import { Phaser } from 'tone'
import useFxChain from './useFxChain'

const usePhaser = () => {
  const [depthAmount, setDepthAmount] = useState(2.5)
  const [frequency, setFrequency] = useState(500)
  const [blendAmount, setBlendAmount] = useState(0.5)
  const fxChain = useFxChain()

  const reverbRef = useRef<Effect<Phaser>>()

  const setDepth = (value: number) => {
    setDepthAmount(value / 100)
    if (reverbRef.current) {
      reverbRef.current.node.octaves = value / 100
    }
  }

  const setSpeed = (value: number) => {
    setFrequency(value / 25)
    reverbRef.current?.node.frequency.set({ value: value / 25 })
  }

  const setBlend = (value: number) => {
    setBlendAmount(value / 100)
    reverbRef.current?.node.wet.set({ value: value / 100 })
  }

  const activate = () => {
    reverbRef.current = new Effect(new Phaser(frequency, depthAmount))
    reverbRef.current.node.wet.set({ value: blendAmount })
    fxChain.add(reverbRef.current)
  }

  const deactivate = () => {
    fxChain.remove(reverbRef.current)
  }

  return { setBlend, setDepth, setSpeed, activate, deactivate }
}

export default usePhaser

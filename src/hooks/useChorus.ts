import { useRef, useState } from 'react'
import { Effect } from 'src/types'
import { Chorus } from 'tone'
import useFxChain from './useFxChain'

const useChorus = () => {
  const [spreadAmount, setSpreadAmount] = useState(90)
  const [depthAmount, setDepthAmount] = useState(100)
  const [delayAmount, setDelayAmount] = useState(5)
  const [blendAmount, setBlendAmount] = useState(0.5)

  const fxChain = useFxChain()
  const chorusRef = useRef<Effect<Chorus>>()

  const setDepth = (value: number) => {
    setDepthAmount(value * 2)
    if (chorusRef.current) {
      chorusRef.current.node.depth = value * 2
    }
  }

  const setSpread = (value: number) => {
    setSpreadAmount(value * 1.8)
    if (chorusRef.current) {
      chorusRef.current.node.spread = value * 1.8
    }
  }

  const setDelayTime = (value: number) => {
    setDelayAmount(10 - value / 10)
    if (chorusRef.current) {
      chorusRef.current.node.delayTime = 10 - value / 10
    }
  }

  const setBlend = (value: number) => {
    setBlendAmount(value / 100)
    chorusRef.current?.node.wet.set({ value: value / 100 })
  }

  const activate = () => {
    chorusRef.current = new Effect(new Chorus(spreadAmount, depthAmount, delayAmount))
    chorusRef.current.node.type = 'sine'
    chorusRef.current.node.wet.set({ value: blendAmount })
    fxChain.add(chorusRef.current)
  }

  const deactivate = () => fxChain.remove(chorusRef.current)

  return { setBlend, setDepth, setSpread, setDelayTime, activate, deactivate }
}

export default useChorus

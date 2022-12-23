import { useRef, useState } from 'react'
import { Effect } from 'src/types'
import { Chorus } from 'tone'
import useChain from './useChain'

const useChorus = () => {
  const [spreadAmount, setSpreadAmount] = useState(90)
  const [depthAmount, setDepthAmount] = useState(100)
  const [delayAmount, setDelayAmount] = useState(10)

  const chain = useChain()
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
    setDelayAmount(value / 5)
    if (chorusRef.current) {
      chorusRef.current.node.delayTime = value / 5
    }
  }

  const activate = () => {
    chorusRef.current = new Effect(new Chorus(spreadAmount, depthAmount, delayAmount))
    chorusRef.current.node.type = 'sine'
    chain.add(chorusRef.current)
  }

  const deactivate = () => chain.remove(chorusRef.current)

  return { setDepth, setSpread, setDelayTime, activate, deactivate }
}

export default useChorus

import { useRef, useState } from 'react'
import { Effect } from 'src/types'
import { Gain } from 'tone'
import useChain from './useChain'

const useGain = () => {
  const [gainAmount, setGainAmount] = useState(60)

  const chain = useChain()
  const gainRef = useRef<Effect<Gain>>()

  const setGain = (value: number) => {
    setGainAmount(value + 10)
    gainRef.current?.node.gain.set({ value: value + 10 })
  }

  const activate = () => {
    gainRef.current = new Effect(new Gain(gainAmount))
    chain.add(gainRef.current)
  }

  const deactivate = () => chain.remove(gainRef.current)

  return { setGain, activate, deactivate }
}

export default useGain

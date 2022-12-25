import { useRef, useState } from 'react'
import { Effect } from 'src/types'
import { Gain } from 'tone'
import useFxChain from './useFxChain'

const useGain = () => {
  const [gainAmount, setGainAmount] = useState(25)

  const fxChain = useFxChain()
  const gainRef = useRef<Effect<Gain>>()

  const setGain = (value: number) => {
    setGainAmount(value / 2)
    gainRef.current?.node.gain.set({ value: value / 2 })
  }

  const activate = () => {
    gainRef.current = new Effect(new Gain(gainAmount))
    fxChain.add(gainRef.current)
  }

  const deactivate = () => fxChain.remove(gainRef.current)

  return { setGain, activate, deactivate }
}

export default useGain

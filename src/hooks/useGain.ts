import { useRef, useState } from 'react'
import { Effect } from 'src/types'
import { Gain } from 'tone'
import useFxChain from './useFxChain'

const useGain = () => {
  const [gainAmount, setGainAmount] = useState(5)

  const fxChain = useFxChain()
  const gainRef = useRef<Effect<Gain>>()

  const setGain = (value: number) => {
    console.log(value / 5 - 5)
    setGainAmount(value / 5 - 5)
    gainRef.current?.node.gain.set({ value: value / 5 - 5 })
  }

  const activate = () => {
    gainRef.current = new Effect(new Gain(gainAmount))
    fxChain.add(gainRef.current)
  }

  const deactivate = () => fxChain.remove(gainRef.current)

  return { setGain, activate, deactivate }
}

export default useGain

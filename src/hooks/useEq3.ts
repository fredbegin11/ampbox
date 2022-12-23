import { useRef, useState } from 'react'
import { Effect } from 'src/types'
import { EQ3 } from 'tone'
import useFxChain from './useFxChain'

const useEq3 = () => {
  const [lowAmount, setLowAmount] = useState(0)
  const [midAmount, setMidAmount] = useState(0)
  const [highAmount, setHighAmount] = useState(0)

  const fxChain = useFxChain()
  const eqRef = useRef<Effect<EQ3>>()

  const setLow = (value: number) => {
    setLowAmount(value / 4 - 12.5)
    eqRef.current?.node.low.set({ value: value / 4 - 12.5 })
  }

  const setMid = (value: number) => {
    setMidAmount(value / 4 - 12.5)
    eqRef.current?.node.mid.set({ value: value / 4 - 12.5 })
  }

  const setHigh = (value: number) => {
    setHighAmount(value / 4 - 12.5)
    eqRef.current?.node.high.set({ value: value / 4 - 12.5 })
  }

  const activate = () => {
    eqRef.current = new Effect(new EQ3(lowAmount, midAmount, highAmount))
    eqRef.current?.node.lowFrequency.set({ value: 100 })
    eqRef.current?.node.highFrequency.set({ value: 1200 })
    fxChain.add(eqRef.current)
  }

  const deactivate = () => fxChain.remove(eqRef.current)

  return { setLow, setHigh, setMid, activate, deactivate }
}

export default useEq3

import { useRef, useState } from 'react'
import { Effect } from 'src/types'
import { Chebyshev } from 'tone'
import useChain from './useChain'

const useChebyshev = () => {
  const [chebyshevAmount, setChebyshevAmount] = useState(50)
  const [blendAmount, setBlendAmount] = useState(0.5)

  const chain = useChain()

  const chebyshevRef = useRef<Effect<Chebyshev>>()

  const setChebyshev = (value: number) => {
    setChebyshevAmount(value / 100)
    if (chebyshevRef.current) chebyshevRef.current.node.order = value
  }

  const setBlend = (value: number) => {
    setBlendAmount(value)
    chebyshevRef.current?.node.wet.set({ value: value / 100 })
  }

  const activate = () => {
    chebyshevRef.current = new Effect(new Chebyshev(chebyshevAmount))
    chebyshevRef.current.node.wet.set({ value: blendAmount })
    chain.add(chebyshevRef.current)
  }

  const deactivate = () => chain.remove(chebyshevRef.current)

  return { setChebyshev, setBlend, activate, deactivate }
}

export default useChebyshev

import { useRef, useState } from 'react'
import { Effect } from 'src/types'
import { JCReverb } from 'tone'
import useChain from './useChain'

const useReverb = () => {
  const [roomSizeAmount, setRoomSizeAmount] = useState(0.5)
  const chain = useChain()

  const reverbRef = useRef<Effect<JCReverb>>()

  const setRoomSize = (value: number) => {
    setRoomSizeAmount(value / 100)
    reverbRef.current?.node.roomSize.set({ value: value / 100 })
  }

  const activate = () => {
    reverbRef.current = new Effect(new JCReverb(roomSizeAmount))
    chain.add(reverbRef.current)
  }

  const deactivate = () => {
    chain.remove(reverbRef.current)
  }

  return { setRoomSize, activate, deactivate }
}

export default useReverb

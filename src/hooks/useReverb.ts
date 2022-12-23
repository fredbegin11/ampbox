import { useRef, useState } from 'react'
import { JCReverb } from 'tone'
import useChain from './useChain'

const useReverb = () => {
  const [roomSizeAmount, setRoomSizeAmount] = useState(0.5)
  const chain = useChain()

  const reverbRef = useRef<JCReverb>()

  const setRoomSize = (value: number) => {
    setRoomSizeAmount(value / 100)
    reverbRef.current?.roomSize.set({ value: value / 100 })
  }

  const activate = () => {
    reverbRef.current = new JCReverb(roomSizeAmount)
    chain.add(reverbRef.current)
  }

  const deactivate = () => {
    if (reverbRef.current) {
      reverbRef.current.dispose()
      chain.remove(reverbRef.current)
    }
  }

  return { setRoomSize, activate, deactivate }
}

export default useReverb

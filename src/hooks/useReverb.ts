import { useRef, useState } from 'react'
import { Effect } from 'src/types'
import { JCReverb } from 'tone'
import useFxChain from './useFxChain'

const useReverb = () => {
  const [roomSizeAmount, setRoomSizeAmount] = useState(0.5)
  const [blendAmount, setBlendAmount] = useState(0.5)
  const fxChain = useFxChain()

  const reverbRef = useRef<Effect<JCReverb>>()

  const setRoomSize = (value: number) => {
    setRoomSizeAmount(value / 100)
    reverbRef.current?.node.roomSize.set({ value: value / 100 })
  }

  const setBlend = (value: number) => {
    setBlendAmount(value / 100)
    reverbRef.current?.node.wet.set({ value: value / 100 })
  }

  const activate = () => {
    reverbRef.current = new Effect(new JCReverb(roomSizeAmount))
    reverbRef.current.node.wet.set({ value: blendAmount })
    fxChain.add(reverbRef.current)
  }

  const deactivate = () => {
    fxChain.remove(reverbRef.current)
  }

  return { setBlend, setRoomSize, activate, deactivate }
}

export default useReverb

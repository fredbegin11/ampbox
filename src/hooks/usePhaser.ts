import { useRef, useState } from 'react'
import { Effect } from 'src/types'
import { Phaser } from 'tone'
import useFxChain from './useFxChain'

interface Props {
  orderWeight: number
}

const usePhaser = ({ orderWeight }: Props) => {
  const [depthAmount, setDepthAmount] = useState(2.5)
  const [frequency, setFrequency] = useState(2)
  const [blendAmount, setBlendAmount] = useState(0.5)
  const fxChain = useFxChain()

  const phaserRef = useRef<Effect<Phaser>>()

  const setDepth = (value: number) => {
    setDepthAmount(value / 100)
    if (phaserRef.current) {
      phaserRef.current.node.octaves = value / 100
    }
  }

  const setSpeed = (value: number) => {
    setFrequency(value / 25)
    phaserRef.current?.node.frequency.set({ value: value / 25 })
  }

  const setBlend = (value: number) => {
    setBlendAmount(value / 100)
    phaserRef.current?.node.wet.set({ value: value / 100 })
  }

  const activate = () => {
    phaserRef.current = new Effect({ node: new Phaser(frequency, depthAmount), orderWeight })
    phaserRef.current.node.wet.set({ value: blendAmount })
    fxChain.add(phaserRef.current)
  }

  const deactivate = () => {
    fxChain.remove(phaserRef.current)
  }

  return { setBlend, setDepth, setSpeed, activate, deactivate }
}

export default usePhaser

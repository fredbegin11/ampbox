import { useEffect, useRef, useState } from 'react'
import { Convolver } from 'tone'
import ir1 from 'src/assets/ir/ir1.wav'
import ir2 from 'src/assets/ir/ir2.wav'
import ir3 from 'src/assets/ir/ir3.wav'
import ir4 from 'src/assets/ir/ir4.wav'
import ir5 from 'src/assets/ir/ir5.wav'
import ir6 from 'src/assets/ir/ir6.wav'
import { Effect } from 'src/types'
import useFxChain from './useFxChain'
import useSource from './useSource'

const getCab = (value: number) => {
  switch (value) {
    case 1:
      return ir1
    case 2:
      return ir2
    case 3:
      return ir3
    case 4:
      return ir4
    case 5:
      return ir5
    default:
      return ir6
  }
}

const useCabinet = () => {
  const { isActive } = useSource()
  const [activeCab, setActiveCab] = useState(1)

  const fxChain = useFxChain()

  const cabinetRef = useRef<Effect<Convolver>>()

  const changeCab = (value: number) => {
    setActiveCab(value)
    cabinetRef.current?.node.load(getCab(value))
  }

  const activate = (cab?: number) => {
    cabinetRef.current = new Effect(new Convolver(getCab(cab || activeCab)))
    fxChain.add(cabinetRef.current, true)
  }

  const deactivate = () => fxChain.remove(cabinetRef.current)

  useEffect(() => {
    if (isActive && !cabinetRef.current) {
      activate()
    }
  }, [isActive])

  const isCabActive = (cab: number) => activeCab === cab

  return { activate, changeCab, activeCab, deactivate, toneAudioNode: cabinetRef.current, isCabActive }
}

export default useCabinet

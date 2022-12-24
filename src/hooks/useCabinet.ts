import { useEffect, useRef, useState } from 'react'
import { Convolver } from 'tone'
import bright from 'src/assets/ir/bright.wav'
import deep from 'src/assets/ir/deep.wav'
import defaultIr from 'src/assets/ir/default.wav'
import { Effect } from 'src/types'
import useFxChain from './useFxChain'
import useSource from './useSource'

export enum CabinetType {
  deep = 'Deep',
  bright = 'Bright',
  default = 'Default',
}

const getCab = (value: CabinetType) => {
  switch (value) {
    case CabinetType.default:
      return defaultIr
    case CabinetType.bright:
      return bright
    case CabinetType.deep:
      return deep
  }
}

const useCabinet = () => {
  const { isActive } = useSource()
  const [activeCab, setActiveCab] = useState<CabinetType>(CabinetType.default)

  const fxChain = useFxChain()

  const cabinetRef = useRef<Effect<Convolver>>()

  const changeCab = (value: CabinetType) => {
    setActiveCab(value)
    cabinetRef.current?.node.load(getCab(value))
  }

  const activate = (cab?: CabinetType) => {
    cabinetRef.current = new Effect(new Convolver(getCab(cab || activeCab)))
    fxChain.add(cabinetRef.current, true)
  }

  const deactivate = () => fxChain.remove(cabinetRef.current)

  useEffect(() => {
    if (isActive && !cabinetRef.current) {
      activate()
    }
  }, [isActive])

  const isCabActive = (cab: CabinetType) => activeCab === cab

  return { activate, changeCab, activeCab, deactivate, toneAudioNode: cabinetRef.current, isCabActive }
}

export default useCabinet

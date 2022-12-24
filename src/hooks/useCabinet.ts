import { useEffect, useRef } from 'react'
import { Convolver } from 'tone'
import defaultIr from 'src/assets/ir/default.wav'
import { Effect } from 'src/types'
import useFxChain from './useFxChain'
import useSource from './useSource'

const useCabinet = () => {
  const { isActive } = useSource()

  const fxChain = useFxChain()

  const cabinetRef = useRef<Effect<Convolver>>()

  const activate = () => {
    cabinetRef.current = new Effect(new Convolver(defaultIr))
    fxChain.add(cabinetRef.current, true)
  }

  const deactivate = () => fxChain.remove(cabinetRef.current)

  useEffect(() => {
    if (isActive && !cabinetRef.current) {
      activate()
    }
  }, [isActive])

  return { activate, deactivate, toneAudioNode: cabinetRef.current }
}

export default useCabinet

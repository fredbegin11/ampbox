import { useEffect, useRef } from 'react'
import { Convolver, Mono, StereoWidener } from 'tone'
import defaultIr from 'src/assets/ir/default.wav'
import { Effect } from 'src/types'
import useFxChain from './useFxChain'
import useSource from './useSource'

const useCabinet = () => {
  const { isActive } = useSource()

  const fxChain = useFxChain()

  const cabinetRef = useRef<Effect<Convolver>>()
  const monoRef = useRef<Effect<Mono>>()
  const stereoRef = useRef<Effect<StereoWidener>>()

  const activate = () => {
    cabinetRef.current = new Effect(new Convolver(defaultIr))
    monoRef.current = new Effect(new Mono())
    fxChain.add(cabinetRef.current, true)
    fxChain.add(monoRef.current, true)
  }

  const deactivate = () => {
    fxChain.remove(cabinetRef.current)
    fxChain.remove(monoRef.current)
    fxChain.remove(stereoRef.current)
  }

  useEffect(() => {
    if (isActive && !cabinetRef.current) {
      activate()
    }
  }, [isActive])

  return { activate, deactivate, toneAudioNode: cabinetRef.current }
}

export default useCabinet

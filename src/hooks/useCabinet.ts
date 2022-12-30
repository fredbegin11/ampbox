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
    cabinetRef.current = new Effect({ node: new Convolver(defaultIr), orderWeight: 2 })
    monoRef.current = new Effect({ node: new Mono(), orderWeight: 1 })
    fxChain.add(cabinetRef.current)
    fxChain.add(monoRef.current)
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

  return { activate, deactivate }
}

export default useCabinet

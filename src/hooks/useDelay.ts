import { useRef, useState } from 'react'
import { Effect } from 'src/types'
import { FeedbackDelay } from 'tone'
import useChain from './useChain'

const useDelay = () => {
  const [delayTime, setDelayTime] = useState(0.5)
  const [feedbackAmount, setFeedbackAmount] = useState(0.5)
  const [blendAmount, setBlendAmount] = useState(0.5)
  const chain = useChain()

  const delayRef = useRef<Effect<FeedbackDelay>>()

  const setDelay = (value: number) => {
    setDelayTime(value)
    delayRef.current?.node.delayTime.set({ value: value / 100 })
  }

  const setFeedback = (value: number) => {
    setFeedbackAmount(value)
    delayRef.current?.node.feedback.set({ value: value / 100 })
  }

  const setBlend = (value: number) => {
    setBlendAmount(value)
    delayRef.current?.node.wet.set({ value: value / 100 })
  }

  const activate = () => {
    delayRef.current = new Effect(new FeedbackDelay(delayTime, feedbackAmount))
    delayRef.current?.node.wet.set({ value: blendAmount / 100 })
    chain.add(delayRef.current)
  }

  const deactivate = () => {
    chain.remove(delayRef.current)
  }

  return { setDelay, setFeedback, setBlend, activate, deactivate }
}

export default useDelay

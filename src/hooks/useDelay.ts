import { useRef, useState } from 'react'
import { Effect } from 'src/types'
import { FeedbackDelay } from 'tone'
import useFxChain from './useFxChain'

interface Props {
  orderWeight: number
}

const useDelay = ({ orderWeight }: Props) => {
  const [delayTime, setDelayTime] = useState(0.5)
  const [feedbackAmount, setFeedbackAmount] = useState(0.5)
  const [blendAmount, setBlendAmount] = useState(0.5)
  const fxChain = useFxChain()

  const delayRef = useRef<Effect<FeedbackDelay>>()

  const setDelay = (value: number) => {
    setDelayTime(value / 100)
    delayRef.current?.node.delayTime.set({ value: value / 100 })
  }

  const setFeedback = (value: number) => {
    setFeedbackAmount(value / 100)
    delayRef.current?.node.feedback.set({ value: value / 100 })
  }

  const setBlend = (value: number) => {
    setBlendAmount(value / 100)
    delayRef.current?.node.wet.set({ value: value / 100 })
  }

  const activate = () => {
    delayRef.current = new Effect({ node: new FeedbackDelay(delayTime, feedbackAmount), orderWeight })
    delayRef.current?.node.wet.set({ value: blendAmount })
    fxChain.add(delayRef.current)
  }

  const deactivate = () => {
    fxChain.remove(delayRef.current)
  }

  return { setDelay, setFeedback, setBlend, activate, deactivate }
}

export default useDelay

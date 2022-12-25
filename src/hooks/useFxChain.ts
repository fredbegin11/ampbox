import { useContext, useEffect } from 'react'
import { FxChainContext } from 'src/context'
import { Effect } from 'src/types/Effect'
import { getDestination, ToneAudioNode } from 'tone'

const useFxChain = () => {
  const { fxChain, setChain } = useContext(FxChainContext)

  const add = (effect: Effect<ToneAudioNode>) => {
    setChain((value) => [...value, effect].sort((a, b) => (a.orderWeight < b.orderWeight ? -1 : 1)))
  }

  const remove = (effect?: Effect<ToneAudioNode>) => {
    effect?.node.dispose()
    setChain((value) => value.filter((item) => item.id !== effect?.id))
  }

  useEffect(() => {
    getDestination().chain(...fxChain.map((item) => item.node))
  }, [fxChain])

  return { fxChain, add, remove }
}

export default useFxChain

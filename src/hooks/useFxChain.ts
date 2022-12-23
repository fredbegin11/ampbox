import { useContext, useEffect } from 'react'
import { FxChainContext } from 'src/context'
import { Effect } from 'src/types/Effect'
import { Destination, ToneAudioNode } from 'tone'

const useFxChain = () => {
  const { fxChain, setChain } = useContext(FxChainContext)

  const add = (effect: Effect<ToneAudioNode>, first?: boolean) => {
    setChain((value) => (first ? [effect, ...value] : [...value, effect]))
  }

  const remove = (effect?: Effect<ToneAudioNode>) => {
    effect?.node.dispose()
    setChain((value) => value.filter((item) => item.id !== effect?.id))
  }

  useEffect(() => {
    Destination.chain(...fxChain.map((item) => item.node))
  }, [fxChain])

  return { fxChain, add, remove }
}

export default useFxChain

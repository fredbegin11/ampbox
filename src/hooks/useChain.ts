import { useContext, useEffect } from 'react'
import { FxChainContext, SourceContext } from 'src/context'
import { Effect } from 'src/types/Effect'
import { Destination, ToneAudioNode } from 'tone'

const useChain = () => {
  const { source } = useContext(SourceContext)
  const { chain, setChain } = useContext(FxChainContext)

  const add = (effect: Effect<ToneAudioNode>) => {
    setChain((value) => [...value, effect])
  }

  const remove = (effect?: Effect<ToneAudioNode>) => {
    effect?.node.dispose()
    setChain((value) => value.filter((item) => item.id !== effect?.id))
  }

  useEffect(() => {
    source?.disconnect()
    source?.chain(...chain.map((item) => item.node), Destination)
  }, [chain])

  return { chain, add, remove }
}

export default useChain

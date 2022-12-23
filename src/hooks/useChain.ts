import { useContext, useEffect } from 'react'
import { FxChainContext, SourceContext } from 'src/context'
import { Destination, ToneAudioNode } from 'tone'

const useChain = () => {
  const { source } = useContext(SourceContext)
  const { chain, setChain } = useContext(FxChainContext)

  const add = (node: ToneAudioNode) => setChain((value) => [...value, node])

  // TODO: Fix this (name is not unique)
  const remove = (node: ToneAudioNode) => setChain((value) => value.filter((item) => item.name !== node.name))

  useEffect(() => {
    source?.disconnect()
    source?.chain(...chain, Destination)
  }, [chain])

  return { chain, add, remove }
}

export default useChain

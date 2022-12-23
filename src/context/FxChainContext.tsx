import React, { useState } from 'react'
import { Effect } from 'src/types/Effect'
import { ToneAudioNode } from 'tone'

interface FxChainContextProps {
  chain: Effect<ToneAudioNode>[]
  setChain: React.Dispatch<React.SetStateAction<Effect<ToneAudioNode>[]>>
}

export const FxChainContext = React.createContext<FxChainContextProps>({ chain: [], setChain: () => {} })

interface Props {
  children: React.ReactNode
}

export const FxChainProvider = ({ children }: Props) => {
  const [chain, setChain] = useState<Effect<ToneAudioNode>[]>([])

  return <FxChainContext.Provider value={{ chain, setChain }}>{children}</FxChainContext.Provider>
}

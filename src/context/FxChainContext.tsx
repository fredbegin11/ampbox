import React, { useState } from 'react'
import { Effect } from 'src/types/Effect'
import { ToneAudioNode } from 'tone'

interface FxChainContextProps {
  fxChain: Effect<ToneAudioNode>[]
  setChain: React.Dispatch<React.SetStateAction<Effect<ToneAudioNode>[]>>
}

export const FxChainContext = React.createContext<FxChainContextProps>({ fxChain: [], setChain: () => {} })

interface Props {
  children: React.ReactNode
}

export const FxChainProvider = ({ children }: Props) => {
  const [fxChain, setChain] = useState<Effect<ToneAudioNode>[]>([])

  return <FxChainContext.Provider value={{ fxChain, setChain }}>{children}</FxChainContext.Provider>
}

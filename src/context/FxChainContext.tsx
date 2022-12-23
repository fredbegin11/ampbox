import React, { useState } from 'react'
import { ToneAudioNode } from 'tone'
import { ToneWithContextOptions } from 'tone/build/esm/core/context/ToneWithContext'

interface FxChainContextProps {
  chain: ToneAudioNode<ToneWithContextOptions>[]
  setChain: React.Dispatch<React.SetStateAction<ToneAudioNode<ToneWithContextOptions>[]>>
}

export const FxChainContext = React.createContext<FxChainContextProps>({ chain: [], setChain: () => {} })

interface Props {
  children: React.ReactNode
}

export const FxChainProvider = ({ children }: Props) => {
  const [chain, setChain] = useState<ToneAudioNode[]>([])

  return <FxChainContext.Provider value={{ chain, setChain }}>{children}</FxChainContext.Provider>
}

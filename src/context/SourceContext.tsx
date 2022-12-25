import React, { useEffect, useState } from 'react'
import { Player, UserMedia } from 'tone'
import dry1 from 'src/assets/samples/dry-1.mp3'
import dry2 from 'src/assets/samples/dry-2.mp3'
import dry3 from 'src/assets/samples/dry-3.mp3'
import { Input } from 'src/types/Input'

interface SourceContextProps {
  source?: Player | UserMedia
  setSource: React.Dispatch<React.SetStateAction<Player | UserMedia | undefined>>
  hasPermission?: boolean
  setHasPermissions: React.Dispatch<React.SetStateAction<boolean>>
  inputs: Input[]
}

export const SourceContext = React.createContext<SourceContextProps>({ setSource: () => {}, inputs: [], setHasPermissions: () => {} })

interface Props {
  children: React.ReactNode
}

export const SourceProvider = ({ children }: Props) => {
  const [hasPermission, setHasPermissions] = useState(false)
  const [source, setSource] = useState<Player | UserMedia>()
  const [inputs, setInputs] = useState<Input[]>([])

  const addInput = (input: Input) => setInputs((values) => [...values, input])

  const addSamples = () => {
    addInput(new Input(dry1, 'Sample #1 - Dry Electric Guitar'))
    addInput(new Input(dry2, 'Sample #2 - Dry Electric Guitar'))
    addInput(new Input(dry3, 'Sample #3 - Dry Accoustic Guitar'))
  }

  const addInputs = () => {
    UserMedia.enumerateDevices().then((devices) => {
      devices.forEach((device) => {
        addInput(new Input(device, `Input - ${device.label}`))
      })
    })
  }

  useEffect(() => {
    addSamples()
  }, [])

  useEffect(() => {
    if (hasPermission) addInputs()
  }, [hasPermission])

  return <SourceContext.Provider value={{ source, setSource, inputs, setHasPermissions, hasPermission }}>{children}</SourceContext.Provider>
}

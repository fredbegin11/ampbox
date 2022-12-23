import React, { useEffect, useState } from 'react'
import { Player, UserMedia } from 'tone'

interface SourceContextProps {
  source?: Player | UserMedia
  setSource: React.Dispatch<React.SetStateAction<Player | UserMedia | undefined>>
  devices?: MediaDeviceInfo[]
  selectedDevice?: MediaDeviceInfo
  setSelectedDevice: React.Dispatch<React.SetStateAction<MediaDeviceInfo | undefined>>
}

export const SourceContext = React.createContext<SourceContextProps>({ setSource: () => {}, setSelectedDevice: () => {} })

interface Props {
  children: React.ReactNode
}

export const SourceProvider = ({ children }: Props) => {
  const [source, setSource] = useState<Player | UserMedia>()
  const [devices, setDevices] = useState<MediaDeviceInfo[]>()
  const [selectedDevice, setSelectedDevice] = useState<MediaDeviceInfo>()

  useEffect(() => {
    UserMedia.enumerateDevices().then((devices) => {
      setDevices(devices)
      setSelectedDevice(devices[0])
    })
  }, [])

  return <SourceContext.Provider value={{ source, setSource, devices, selectedDevice, setSelectedDevice }}>{children}</SourceContext.Provider>
}

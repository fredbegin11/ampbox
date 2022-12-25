import { useRef, useState } from 'react'
import { Effect } from 'src/types'
import { Recorder, getDestination } from 'tone'
import useFxChain from './useFxChain'
import { webmBlobToWavBlob } from 'src/utils'

const useRecorder = () => {
  const [isRecording, setIsRecording] = useState(false)
  const fxChain = useFxChain()

  const recorderRef = useRef<Effect<Recorder>>()

  const startRecording = () => {
    recorderRef.current = new Effect({ node: new Recorder(), orderWeight: 1000 })
    setIsRecording(true)
    getDestination().connect(recorderRef.current.node)
    recorderRef.current?.node.start()
  }

  const stopRecording = async () => {
    const recording = await recorderRef.current?.node.stop()
    fxChain.remove(recorderRef.current)
    setIsRecording(false)

    if (recording) {
      const wavBlob = await webmBlobToWavBlob(recording)
      const url = URL.createObjectURL(wavBlob)
      const anchor = document.createElement('a')
      anchor.download = 'recording.wav'
      anchor.href = url
      anchor.click()
    }
  }

  return { startRecording, stopRecording, isRecording }
}

export default useRecorder

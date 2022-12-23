import { useRef, useState } from 'react'
import { Convolver, Destination } from 'tone'
import ir1 from 'src/assets/ir/ir1.wav'
import ir2 from 'src/assets/ir/ir2.wav'
import ir3 from 'src/assets/ir/ir3.wav'

const getCab = (value: number) => {
  switch (value) {
    case 1:
      return ir1
    case 2:
      return ir2
    default:
      return ir3
  }
}

const useCabinet = (isActive = false) => {
  const [activeCab, setActiveCab] = useState(1)
  const cabinetRef = useRef<Convolver>()

  const changeCab = (value: number) => {
    setActiveCab(value)
    deactivate()

    if (isActive) {
      activate(value)
    }
  }

  const activate = (cab?: number) => {
    cabinetRef.current = new Convolver(cab ? getCab(cab) : getCab(activeCab))
    Destination.chain(cabinetRef.current)
  }

  const deactivate = () => {
    if (cabinetRef.current) {
      Destination.chain()
      cabinetRef.current.dispose()
    }
  }

  return { setAmount: () => {}, activate, changeCab, activeCab, deactivate, toneAudioNode: cabinetRef.current }
}

export default useCabinet

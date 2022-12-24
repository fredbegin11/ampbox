import { useCallback, useEffect, useRef, useState } from 'react'
import knob from 'src/assets/images/knobs/knob70.png'

type Props = {
  set: (value: number) => void
  disabled?: boolean
  label: string
  diameter?: string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Knob = ({ diameter, set, disabled, label, ...rest }: Props) => {
  const [amount, setAmount] = useState(50)
  const knobRef = useRef<HTMLInputElement>(null)

  const handleChange = useCallback((e: any) => {
    setAmount(Number(e.target.value))
    set(Number(e.target.value))
  }, [])

  useEffect(() => {
    knobRef.current?.addEventListener('input', handleChange)
    return () => knobRef.current?.removeEventListener('input', handleChange)
  }, [])

  return (
    <div className='flex flex-col items-center'>
      <label className='block'>{label}</label>
      <input
        disabled={disabled}
        ref={knobRef}
        type='range'
        min={0}
        max={100}
        defaultValue={amount}
        className='input-knob'
        data-diameter={diameter || '80'}
        data-src={knob}
        data-sprites='100'
        {...rest}
      />
    </div>
  )
}

export default Knob

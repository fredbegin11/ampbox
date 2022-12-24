import switchOnOff from 'src/assets/images/knobs/switch_offon.png'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string
  checked?: boolean
  disabled?: boolean
  name: string
}

const Radio = ({ label, ...rest }: Props) => {
  return (
    <div className='flex flex-col items-center'>
      {label && <label>{label}</label>}
      <input type='radio' className='input-switch' data-src={switchOnOff} data-diameter='60' {...rest} />
    </div>
  )
}

export default Radio

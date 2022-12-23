import switchOnOff from 'src/assets/images/knobs/switch_offon.png'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string
  checked?: boolean
  disabled?: boolean
  name: string
  diameter?: string
}

const Checkbox = ({ label, diameter, ...rest }: Props) => {
  return (
    <div className='flex flex-col items-center'>
      {label && <label>{label}</label>}
      <input type='checkbox' className='input-switch' data-src={switchOnOff} data-diameter={diameter || '80'} {...rest} />
    </div>
  )
}

export default Checkbox

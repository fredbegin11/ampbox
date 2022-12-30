import classNames from 'classnames'

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Card = ({ children, className }: Props) => {
  return <div className={classNames('flex border p-8 rounded-lg shadow-md bg-neutral-50', className)}>{children}</div>
}

export default Card

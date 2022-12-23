import classNames from 'classnames'
import { Link } from 'react-router-dom'

const Header = ({ className, ...rest }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <header>
      <nav className={classNames(' border-gray-200 px-8 py-2.5 bg-gray-800', className)} {...rest}>
        <div className='flex flex-wrap justify-between items-center'>
          <Link to='/' className='flex items-center'>
            <span className='self-center text-xl font-semibold whitespace-nowrap text-white'>AmpBox</span>
          </Link>

          <div className='justify-between items-center flex w-auto'>
            <ul className='flex flex-row space-x-8'>
              <li className='text-white'>
                <Link to='/' className='rounded'>
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

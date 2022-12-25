import classNames from 'classnames'
import { Link } from 'react-router-dom'
import logo from 'src/assets/images/logo.png'
import github from 'src/assets/images/github.png'
import beer from 'src/assets/images/beer.png'

const Header = ({ className, ...rest }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <header>
      <nav className={classNames('px-8 py-4 bg-neutral-900', className)} {...rest}>
        <div className='flex flex-wrap justify-between items-center'>
          <Link to='/' className='flex items-center space-x-4'>
            <img src={logo} className='w-6 h-6 invert' />
            <span className='self-center text-xl font-semibold whitespace-nowrap text-white'>AmpBox</span>
          </Link>

          <div className='justify-between items-center flex text-white space-x-8'>
            <a target='_blank' rel='noreferrer noopener' href='https://www.paypal.me/fredbegin11' title='Buy me a beer!'>
              <img src={beer} className='w-8 h-8 invert' />
            </a>
            <a target='_blank' rel='noreferrer noopener' href='https://github.com/fredbegin11/ampbox' title='View the repo!'>
              <img src={github} className='w-8 h-8 invert' />
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

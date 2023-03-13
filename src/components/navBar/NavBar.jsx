import { Link } from 'react-router-dom'
import './NavBar.css'

function NavBar ({ posts }) {
  return (
    <div className='navBar'>
      <ul className='navBarList'>
        <li>
          <Link to='/' className='navLink'>
            Lista de posts
          </Link>
        </li>
        <li>
          <Link to='/create' state={{ posts }} className='navLink'>
            Crear posts
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default NavBar

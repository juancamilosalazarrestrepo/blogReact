//import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function NavBar ({ posts }) {
  return (
    <div>
      <ul>
        <li>
          <Link to='/'>Lista de posts</Link>
        </li>
        <li>
          <Link to='/create' state={{ posts: posts }}>
            Crear posts
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default NavBar

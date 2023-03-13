import { useEffect } from 'react'
import FormPosts from '../../components/formPosts/FormPosts'
import NavBar from '../../components/navBar/NavBar'
import { useLocation, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'

function CreatePost ({ posts }) {
  useEffect(() => {
    if (!state) {
      navigate('/')
      swal('error', 'no puede entrar por medio de la ruta a crear un post', 'error')
    }
  }, [])
  const { state } = useLocation()
  const navigate = useNavigate()

  const postsSaved = JSON.parse(window.localStorage.getItem('POSTS'))
  return (
    <div>
      {state
        ? (
          <>
            <NavBar posts={postsSaved || state ? state.posts : null} />
            <FormPosts posts={state ? state.posts : null} />
          </>
          )
        : null}
    </div>
  )
}

export default CreatePost

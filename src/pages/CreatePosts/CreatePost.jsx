import { useForm } from 'react-hook-form'
import { _post, _put } from '../../lib/axios'
import swal from 'sweetalert'
import './CreatePost.css'
import { useLocation, useNavigate } from 'react-router-dom'

function CreatePost() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()
  const onSubmit = (data) => {
    state.postToEdit ? updatePost(data) : createPost(data)
  }
  const navigate = useNavigate()
  const { state } = useLocation()

  const createPost = (data) => {
    console.log("state",state)
    data.userId = 1
    const post = data
    post.id = state.posts.at(-1).id + 1
    state.posts.push(post)
    console.log(state.posts)
    _post(
      '/posts',
      data,
      (res) => {
        if (res) {
          console.log('respuesta', res)
          swal('Posts Creado', 'Post creado con exito', 'success')
          navigate('/', { state: { posts: state.posts } })
        }
      },
      (error) => {
        console.log('error', error)
      }
    )
  }

  const updatePost = (data) => {
    state.postToEdit.title = data.title
    state.postToEdit.body = data.body
    const postToEdit = state.posts.filter(
      (post) => post.id === state.postToEdit.id
    )
    postToEdit[0].title = data.title
    postToEdit[0].body = data.body
    console.log('posts editados', state.posts)
    data = state.postToEdit

    _put(
      `/posts/${state.postToEdit.id}`,
      data,
      (res) => {
        if (res) {
          console.log('respuesta', res)
          swal('Post Editado', 'Post editado con exito', 'success')
          navigate('/', { state: { posts: state.posts } })
        }
      },
      (error) => {
        console.log('error', error)
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <input
        {...register('title', { required: true, maxLength: 30 })}
        defaultValue={state.postToEdit ? state.postToEdit.title : null}
      />
      <input
        {...register('body', { required: true, maxLength: 500 })}
        defaultValue={state.postToEdit ? state.postToEdit.body : null}
      />
      <input
        type='submit'
        value={state.postToEdit ? 'Editar post' : 'Crear post'}
      />
    </form>
  )
}

export default CreatePost

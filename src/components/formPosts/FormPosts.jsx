import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { _post, _put } from '../../lib/axios'
import swal from 'sweetalert'
import { TextField, Backdrop, CircularProgress } from '@mui/material'
import { useLocation } from 'react-router-dom'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import './FormPosts.css'

function FormPosts ({ posts }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const onSubmit = (data) => {
    state.postToEdit ? updatePost(data) : createPost(data)
  }
  const { state } = useLocation()
  const [loading, setLoading] = useState(false)

  const createPost = (data) => {
    setLoading(true)
    data.userId = 1
    const post = data
    post.id = state.posts.at(-1).id + 1
    posts.push(post)
    _post(
      '/posts',
      data,
      (res) => {
        if (res) {
          swal('Posts Creado', 'Post creado con exito', 'success')
          window.localStorage.setItem('POSTS', JSON.stringify(posts))
          setLoading(false)
        }
      },
      (error) => {
        swal('error', error, 'error')
        setLoading(false)
      }
    )
  }

  const updatePost = (data) => {
    setLoading(true)
    posts.title = data.title
    posts.body = data.body
    const postToEdit = posts.filter((post) => post.id === state.postToEdit.id)
    postToEdit[0].title = data.title
    postToEdit[0].body = data.body
    window.localStorage.setItem('POSTS', JSON.stringify(posts))
    data = state.postToEdit
    if (state.postToEdit.id <= 100) {
      _put(
        `/posts/${state.postToEdit.id}`,
        data,
        (res) => {
          if (res) {
            swal('Post Editado', 'Post editado con exito', 'success')
            setLoading(false)
          }
        },
        (error) => {
          swal('error', error, 'error')
          setLoading(false)
        }
      )
    } else {
      swal('Post Editado', 'Post editado con exito', 'success')
      setLoading(false)
    }
  }
  return (
    <div className='formContainer'>
      <form onSubmit={handleSubmit(onSubmit)} className='form'>
        <label className='formTitle'>
          {state.postToEdit ? 'Editar post' : 'Crear Posts'}
        </label>
        <TextField
          label='Titulo'
          {...register('title', { required: true, maxLength: 30 })}
          defaultValue={state.postToEdit ? state.postToEdit.title : null}
          className='inputForm'
        />
        {errors.title?.type === 'required' && (
          <p role='alert' className='errorForm'>
            <ErrorOutlineIcon fontSize='small' />
            El titulo es Requerido
          </p>
        )}
        {errors.title?.type === 'maxLength' && (
          <p role='alert' className='errorForm'>
            <ErrorOutlineIcon fontSize='small' />
            El titulo supera los 30 caracteres
          </p>
        )}
        <TextField
          label='Contenido'
          multiline
          {...register('body', { required: true, maxLength: 500 })}
          defaultValue={state.postToEdit ? state.postToEdit.body : null}
          className='inputForm'
        />
        {errors.body?.type === 'required' && (
          <p role='alert' className='errorForm'>
            <ErrorOutlineIcon fontSize='small' />
            El contenido es Requerido
          </p>
        )}
        {errors.body?.type === 'maxLength' && (
          <p role='alert' className='errorForm'>
            <ErrorOutlineIcon fontSize='small' />
            El contenido supera los 500 caracteres
          </p>
        )}

        <input
          type='submit'
          className='inputSubmit'
          value={state.postToEdit ? 'Editar post' : 'Crear post'}
        />
      </form>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  )
}

export default FormPosts

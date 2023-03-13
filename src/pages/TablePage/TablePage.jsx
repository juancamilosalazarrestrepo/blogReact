import TablePosts from '../../components/tablePosts/TablePosts'
import { useLocation } from 'react-router-dom'
import './TablePage.css'
import NavBar from '../../components/navBar/NavBar'
import { usePosts } from '../../hooks/usePosts/usePosts'
import { Backdrop, CircularProgress } from '@mui/material'

function TablePage () {
  const { posts, loading } = usePosts()
  const { state } = useLocation()
  const postsSaved = JSON.parse(window.localStorage.getItem('POSTS'))
  return (
    <div className='mainContainer'>
      <NavBar posts={state ? state.posts : postsSaved || posts} />
      <div className='tableContainer'>
        <TablePosts posts={state ? state.posts : posts} />
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  )
}

export default TablePage

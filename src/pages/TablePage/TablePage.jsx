import CustomPaginationActionsTable from '../../components/tablePosts/TablePosts'
import { useLocation } from 'react-router-dom'
import './TablePage.css'
import NavBar from '../../components/navBar/NavBar'
import { usePosts } from '../../hooks/usePosts/usePosts'

function TablePage() {
  const { posts } = usePosts()
  const { state } = useLocation()
  return (
    <div className='mainContainer'>
      <NavBar posts={state ? state.posts : posts} />
      <div className='tableContainer'>
        {state
          ? console.log('statePosts', state.posts)
          : console.log('no hay state')}
        <CustomPaginationActionsTable posts={state ? state.posts : posts} />
      </div>
    </div>
  )
}

export default TablePage

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TablePage from '../pages/TablePage/TablePage'
import CreatePost from '../pages/CreatePosts/CreatePost'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'

export const routes = (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<TablePage />} exact />
      <Route path='/create' element={<CreatePost />} exact />
      <Route path='/*' element={<NotFoundPage />} exact />
    </Routes>
  </BrowserRouter>
)

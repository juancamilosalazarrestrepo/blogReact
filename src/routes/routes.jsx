import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import TablePage from '../pages/TablePage/TablePage'
import CreatePost from '../pages/CreatePosts/CreatePost'

export const routes = (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<TablePage />} exact />
      <Route path='/create' element={<CreatePost />} exact />
    </Routes>
  </BrowserRouter>
)

import { useEffect, useState } from 'react'
import { _delete } from '../../lib/axios'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import './TablePosts.css'
import swal from 'sweetalert'
function TablePaginationActions (props) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl'
          ? (
            <KeyboardArrowRight />
            )
          : (
            <KeyboardArrowLeft />
            )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl'
          ? (
            <KeyboardArrowLeft />
            )
          : (
            <KeyboardArrowRight />
            )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
}

export default function TablePosts ({ posts }) {
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [rows, setRows] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const postsSaved = JSON.parse(window.localStorage.getItem('POSTS'))
    if (postsSaved) {
      setRows(postsSaved)
    } else {
      setRows(posts)
    }
  }, [posts])

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const editPost = (post) => {
    navigate('/create', { state: { posts: rows, postToEdit: post } })
  }

  const deletePost = (postId) => {
    setLoading(true)
    window.localStorage.setItem(
      'POSTS',
      JSON.stringify(rows.filter((row) => row.id !== postId))
    )
    setRows(rows.filter((row) => row.id !== postId))
    if (postId <= 100) {
      _delete(
        `/posts/${postId}`,
        (res) => {
          if (res.data) {
            swal('Posts Eliminado', 'Post eliminado con exito', 'success')
            setLoading(false)
          }
        },
        (error) => swal('error', error.message, 'error')
      )
    } else {
      swal('Posts Eliminado', 'Post eliminado con Exito', 'success')
      setLoading(false)
    }
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label='custom pagination table'>
          <TableHead>
            <TableRow>
              <TableCell className='titleCell'>Title</TableCell>
              <TableCell className='bodyCell'>Content</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              ? (rowsPerPage > 0
                  ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  : rows
                ).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className='titleCell'>{row.title}</TableCell>
                    <TableCell align='left' className='bodyCell'>
                      {row.body}
                    </TableCell>
                    <TableCell>
                      <button onClick={() => editPost(row)}>
                        <EditIcon className='icon' />
                      </button>
                    </TableCell>
                    <TableCell align='center'>
                      <button onClick={() => deletePost(row.id)}>
                        <DeleteForeverIcon className='icon' />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              : null}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows ? rows.length : 100}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page'
                  },
                  native: true
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  )
}

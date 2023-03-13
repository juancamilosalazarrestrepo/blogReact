import { useEffect, useState } from 'react'
import { _get } from '../../lib/axios'
import swal from 'sweetalert'

export function usePosts () {
  const [posts, setPosts] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    _get(
      '/posts',
      (res) => {
        if (res.data) {
          setPosts(res.data)
          setLoading(false)
        }
      },
      (error) => {
        swal('error', error.message, 'error')
        setLoading(false)
      }
    )
  }, [])

  return { posts, loading }
}

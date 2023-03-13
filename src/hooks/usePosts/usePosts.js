import { useEffect, useState } from 'react'
import { _get } from '../../lib/axios'

export function usePosts() {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    _get(
      '/posts',
      (res) => {
        console.log(res)
        if (res.data) {
          console.log(res.data)
          setPosts(res.data)
        }
      },
      (error) => console.log(error.message)
    )
  }, [])

  return { posts }
}

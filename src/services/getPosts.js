import { _get } from '../lib/axios'

export const getPosts = async () => {
  let posts = null
  await _get(
    '/posts',
    (res) => {
      console.log(res)
      if (res.data) {
        console.log(res.data)
        posts = res.data
      }
    },
    (error) => (posts = error.message)
  )
  return posts
}

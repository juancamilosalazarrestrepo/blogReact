import axios from 'axios'

export const postApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/'
})

export const _get = async (end, callback, callbackError) => {
  try {
    await axios
      .get(`https://jsonplaceholder.typicode.com${end}`)
      .then((res) => callback(res))
      .catch((e) => {
        callbackError(e)
      })
  } catch (error) {
    callbackError(error)
  }
}

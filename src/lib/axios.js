import axios from 'axios'

export const postApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
})

const baseURL = 'https://jsonplaceholder.typicode.com'

export const _get = async (end, callback, callbackError) => {
  try {
    await axios
      .get(`${baseURL}${end}`)
      .then((res) => callback(res))
      .catch((e) => {
        callbackError(e)
      })
  } catch (error) {
    callbackError(error)
  }
}

export const _post = async (end, data, callback, callbackError) => {
  await axios
    .post(`${baseURL}${end}`, data)
    .then((res) => callback(res))
    .catch((e) => {
      callbackError(e)
    })
}

export const _delete = async (end, callback, callbackError) => {
  await axios
    .delete(`${baseURL}${end}`)
    .then((res) => callback(res))
    .catch((e) => {
      callbackError(e)
    })
}

export const _put = async (end, data, callback, callbackError) => {
  await axios
    .put(`${baseURL}${end}`, data)
    .then((res) => {
      callback(res)
    })
    .catch((e) => {
      callbackError(e)
    })
}

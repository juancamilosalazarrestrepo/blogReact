import { useEffect } from 'react'
import { postApi, _get } from './lib/axios'

function App () {
  useEffect(() => {
    _get(
      '/posts',
      (res) => {
        console.log(res)
        if (res.data.ok) {
          console.log(res)
        }
      },
      (error) => console.log(error.message)
    )
  }, [])

  return (
    <div className='App'>
      <>
        <p>hola</p>
      </>
    </div>
  )
}

export default App

import { useState } from 'react'
import Game from './Game'


function App() {
  const [count, setCount] = useState(0)

  return (

    <div className='bg-black flex justify-center items-center h-screen text-white'>
      <div className='flex flex-col justify-center items-center p-4 border border-white'>
        <h1 className='text-8xl'>APPLE GRAB</h1>
        <Game />
      </div>
    </div>
  )
}

export default App

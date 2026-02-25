import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <>
      <div className='min-h-screen bg-purple-100'>
        <h1 className='text-3xl font-semibold text-cyan-800 pt-20 pb-10 text-center'>Welcome to the Home page</h1>
        <div className='w-96 flex gap-3 m-auto justify-center'>
          <Link to="/login">
            <button className='w-32 bg-cyan-700 text-white font-medium text-xl p-2'>Login</button>
          </Link>
          <Link to="/signup">
            <button className='w-32 bg-cyan-700 text-white font-medium text-xl p-2'>Signup</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home

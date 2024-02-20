import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className='p-8'>
        <h1 className='font-bold text-3xl'>Error 404</h1>
        <h2 className='font-semibold text-2xl'>Invalid Credentials or Account doesn't exist</h2>
        <p className='mt-5 font-semibold text-xl'><Link className='underline' to={'/signup'}>Click Here</Link> to create one!</p>
    </div>
  )
}

export default ErrorPage
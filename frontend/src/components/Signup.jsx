import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Signup() {
    const[firstName,setFirstName]=useState('')
    const[lastName,setLastName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')

    const navigate=useNavigate()

    async function onclickHandler(){
        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
              email,
              firstName,
              lastName,
              password
            });
            navigate("/dashboard")
        }

  return (
    <div className='flex justify-center'>

        <div className='border-4 mt-14 p-4'>
            <h1 className='font-bold text-3xl text-center'>Signup</h1>
            <p className='text-gray-700 text-xl'>Enter Your Information to create an account</p>

        
            <h1 className='font-bold text-xl mt-7'>First Name</h1>  
            <input className='block bg-white w-full border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mt-2' type="text" placeholder='John' onChange={(e)=>{setFirstName(e.target.value)}}/>  

            <h1 className='font-bold text-xl mt-7'>Last Name</h1>  
            <input className='block bg-white w-full border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mt-2' type="text" placeholder='Doe' onChange={(e)=>{setLastName(e.target.value)}}/>  

            <h1 className='font-bold text-xl mt-7'>Email</h1>  
            <input className='block bg-white w-full border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mt-2' type="email" placeholder='johndoe@gmail.com' onChange={(e)=>{setEmail(e.target.value)}}/>  

            <h1 className='font-bold text-xl mt-7'>Password</h1>  
            <input className='block bg-white w-full border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mt-2' type="password" onChange={(e)=>{setPassword(e.target.value)}}/>   <br />

            <button className='bg-slate-800 text-white p-2 w-full rounded-md hover:bg-black' onClick={onclickHandler}>Signup</button>

            <div className='flex justify-center mt-2'>
                <p className='font-semibold'>Already have an account ? <Link className='underline' to={'/signin'}>Login</Link></p>
            </div>

        </div>

    </div>
  )
}

export default Signup
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Signup() {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')

    const navigate=useNavigate()

    async function onclickHandler(){
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                email,
                password
            });
    
            const authToken = response.data.token;
            localStorage.setItem("token",authToken);
            navigate('/dashboard');
        } catch (error) {
            // Handle errors, e.g., display an error message or log the error
            console.error("Error during sign-in:", error);
            navigate('/error');
        }
    }

  return (
    <div className='flex justify-center'>

        <div className='border-4 mt-14 p-4'>
            <h1 className='font-bold text-3xl text-center'>Sign In</h1>
            <p className='text-gray-700 text-xl text-center'>Enter Your Credentials</p> 

            <h1 className='font-bold text-xl mt-7'>Email</h1>  
            <input className='block bg-white w-full border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mt-2' type="email" placeholder='johndoe@gmail.com' onChange={(e)=>{setEmail(e.target.value)}}/>  

            <h1 className='font-bold text-xl mt-7'>Password</h1>  
            <input className='block bg-white w-full border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mt-2' type="password" onChange={(e)=>{setPassword(e.target.value)}}/>   <br />

            <button className='bg-slate-800 text-white p-2 w-full rounded-md hover:bg-black' onClick={onclickHandler}>Sign in</button>

            <div className='flex justify-center mt-2'>
                <p className='font-semibold'>Don't have an account ? <Link className='underline' to={'/signup'}>Signup</Link></p>
            </div>

        </div>

    </div>
  )
}

export default Signup
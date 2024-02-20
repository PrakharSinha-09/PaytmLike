import React, { useState,useEffect } from 'react'
import axios from 'axios';
import User from './User';
import { useNavigate } from 'react-router-dom';
function Dashboard() {
    const [users, setUsers]=useState([]);
    const [filter, setFilter]=useState("");
    const [balance,setBalance]=useState(0)
    const navigate=useNavigate()
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user)
            })
    }, [filter])

    useEffect(()=>{
        
        getBalance()
    })

    async function getBalance() {
        try {
            const token = localStorage.getItem('token');
    
            const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
    
            setBalance(response.data.balance);
        } catch (error) {
            console.error("Axios error:", error);
            // Handle the error, e.g., show an error message to the user
        }
    }
    

  return (
    <div className='p-6'>
      <div className='flex justify-between mt-3'>
        <div>
            <h1 className='text-2xl font-bold'>PaytmKro</h1>
        </div>
        <div className='flex items-center'>
            <h2 className='mr-2 font-semibold'>Hello, User</h2>
            <p className='p-2 rounded-full bg-slate-200'>U</p>
        </div>
      </div>
      <hr className='mt-3'/>

      <h1 className='text-2xl font-bold mt-5'>Your Balance: <span className='font-semibold'>₹{balance.toFixed(2)}</span></h1>

      <h1 className='text-2xl font-bold mt-5'>Users</h1>

      <input className='block bg-white w-full border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mt-5' type="text" placeholder='Search users...' onChange={(e) => {setFilter(e.target.value)}} />

      <div>
        {users.map((user, ind) => (
            <User key={ind} user={user} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard
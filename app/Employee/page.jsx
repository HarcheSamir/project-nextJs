//////////////////Employee
'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios';

export default function page() {
    const router = useRouter();
  const [isLoading, setLoading] = useState(true)

  ////////protecting Route
  useEffect(() => {
    setLoading(true)
   const token = localStorage.getItem('token');
   const headers = { Authorization: `Bearer ${token}` };
 axios.get('https://server-social-benefits.vercel.app/verify', { headers, withCredentials: true })
     .then((response) => { if(response.data.email==="admin@com") {router.push('/Admin/Employees') } else { console.log(response?.data?.email) ;setLoading(false) } 
     })
     .catch((error) => {console.error(error?.response?.data) ; router.push('/')
     });
}, []);




/////loading state
 if (isLoading) return <p>Loading...</p>
 

 //////////actual page
  return (
    <div className='h-screen w-screen bg-red-500'>
        Employeee
    <button className='bg-blue-500' onClick={()=>{localStorage.removeItem('token') ;localStorage.removeItem('id') ;router.push('/')} }>
        Logout</button>
  
    </div>
  )
}

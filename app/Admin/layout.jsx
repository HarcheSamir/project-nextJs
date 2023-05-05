
'use client'
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Link from 'next/link';
import {BsFillPeopleFill ,BsFillCollectionFill ,BsStars, BsStar } from 'react-icons/bs'
import {GoSignOut ,GoSettings} from 'react-icons/go'


export default function Admin({ children }) {

    const router = useRouter();
    const [isLoading, setLoading] = useState(true)
    const [isLoadingButton, setLoadingButton] = useState(false)

    ///////protecting route
    useEffect(() => {
        setLoading(true)
       const token = localStorage.getItem('token');
       const headers = { Authorization: `Bearer ${token}` };
     axios.get('https://server-social-benefits.vercel.app/verify', { headers, withCredentials: true })
         .then((response) => { if(response.data.email==="admin@com") {setLoading(false)} else { router.push('/Employee') ; console.log(response?.data?.email)  } 
        })
         .catch((error) => {console.error(error?.response?.data) ; router.push('/')
         });
    }, []);





////////loading state 
    if (isLoading) return <p>Loading...</p>

  return (
   
    <section className='flex    w-screen flex-row'>

    <div className=' flex-none relative justify-between   pt-4 pb-12 h-screen  overflow-hidden flex-col items-center flex bg-[#2c3a51]'>
    <div className="flex items-center flex-col w-full">





    <div className="flex w-full px-4 mt-4 flex-row justify-between">
      <GoSettings className='w-5 h-5 cursor-pointer hover:text-neutral-100 hover:scale-125 text-neutral-400' />
    <GoSignOut onClick={()=>{ setLoadingButton(true) ; localStorage.removeItem('token') ;localStorage.removeItem('id') ;router.push('/') } } className={`${isLoadingButton && 'hidden'} w-5 cursor-pointer h-5 hover:text-neutral-100 hover:scale-125 text-neutral-400`} />
    {isLoadingButton ? (
        <svg
          className="animate-spin mr-2 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : null}
    </div>













    <div className=' mt-8 rounded-full border-2 border-neutral-500 hover:scale-110 aspect-square p-1 w-[30%]'><div className='relative  w-full h-full  rounded-full bg-white '><Image fill className='p-2' alt='/' src='https://www.esi-sba.dz/fr/wp-content/uploads/2020/10/Logo-Complet-ESI-SBA-200mm-x-200mm_couleur-1024x1024.png'/></div></div> 
    <p className='font-bold mt-2 text-xs font text-neutral-200'>Administration</p>
  
 
  <div className="flex flex-col w-full bg-[#35465e]   mt-4 ">
      <Link href='/Admin/Employees'><div className='py-4 hover:bg-[#4b6485]  px-2 flex hover:scale-105  gap-2 items-center font-bold text-xs text-neutral-300'><BsFillPeopleFill className='h-3 w-3'/> Employees</div></Link>
      <Link href='/Admin'><div className='py-4 hover:bg-[#4b6485]  px-2 flex hover:scale-105 gap-2 items-center font-bold text-xs text-neutral-300'><BsFillCollectionFill className='h-3 w-3'/> Programs</div></Link>
      <Link href='/Admin'><div className='py-4 hover:bg-[#4b6485] px-2 flex hover:scale-105 gap-2 items-center font-bold text-xs text-neutral-300'><BsStars className='h-3 w-3'/> Ads</div></Link>

    </div>
   
     
    </div>
    
    <p className='text-2xl font-mono font-bold mx-[4rem] cursor-default   text-neutral-500  whitespace-nowrap'>ESI SBA.</p>
    </div>

    <section className='grow  min-w-[60rem] h-screen overflow-hidden'>
    <div className='h-full  w-full overflow-y-auto'>
     {children}
    </div>
    </section>

 
    
  </section>
  
 
  );
}


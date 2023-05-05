////////Admin

'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios';
export default function page() {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true)





    ///////////actual page
  return (

    <div className='h-screen w-full bg-red-500'>
        Admiiiiiin       
    </div>
  )
}

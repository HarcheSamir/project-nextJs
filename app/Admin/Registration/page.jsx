/////////Registration
'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios';
import Registration from '@/components/Registration';
export default function page() {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true)





    ////////actual page
  return (

    <div className='h-full w-full '>
    <Registration/>
    </div>
  )
}

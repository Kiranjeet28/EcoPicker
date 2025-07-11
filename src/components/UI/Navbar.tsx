"use client"
import Image from 'next/image'
import React from 'react'
import { RainbowButton } from '../magicui/rainbow-button'
import { useRouter } from 'next/navigation'

function Navbar() {
  const router = useRouter()
  return (
      <div className='bg-white/30 backdrop-blur-md flex items-center px-12 justify-between p-3'>
      <Image alt="logo" src="/logo.png" height={100} width={120} />
      <RainbowButton
        onClick={() => router.push('/sip')}  >
        Sip
      </RainbowButton>
    </div>
  )
}

export default Navbar
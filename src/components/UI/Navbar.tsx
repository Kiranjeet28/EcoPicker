import Image from 'next/image'
import React from 'react'

function Navbar() {
  return (
      <div className='bg-white/30 backdrop-blur-md flex items-center justify-left p-3'>
          <Image alt="logo" src="/logo.png" height={100} width={120} />
      </div>
  )
}

export default Navbar
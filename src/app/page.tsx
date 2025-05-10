import { EconomicCardList } from '@/components/UI/Cards'
import Economic from '@/components/UI/Economic'
import Navbar from '@/components/UI/Navbar'
import TopicList from '@/components/UI/TopicList'
import React from 'react'

function Page() {
  return (
    <div className="bg-gradient-to-b from-[#3c274e] via-[#95509a] to-[#3c274e]">
      <Navbar />
      <div className=' flex justify-center items-center'>
        <Economic />
      </div>
      <TopicList />
      <div className='flex justify-center items-center px-4 mt-2'>

      <EconomicCardList/>
      </div>
    </div>
  )
}

export default Page
import { EconomicCardList } from '@/components/UI/Cards'
import Economic from '@/components/UI/Economic'
import TopicList from '@/components/UI/TopicList'
import React from 'react'

function Page() {
  return (
    <div className="">
      <div className=' flex justify-center items-center'>
        <Economic />
      </div>
      <div className='flex justify-center flex-col items-center px-4 mt-2'>
      <TopicList />

      <EconomicCardList/>
      </div>
    </div>
  )
}

export default Page
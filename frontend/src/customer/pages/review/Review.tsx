import { Divider } from '@mui/material'
import React from 'react'
import ReviewCard from './ReviewCard'

const Review = () => {
  return (
    <div className='p-5 lg:px-20 flex flex-col lg:flex-row gap-20'>
      <section className='w-full md:w-1/2 lg:w-[30%] space-y-2'>
      <img src="https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80" alt="" />
      <div>
        <div>
          <p className='font-bold text-xl'>Virani Clothing</p>
          <p className='text-lg taxt-gray-600'>Men's white shirt</p>
        </div>
        <div className='price flex items-center gap-3 mt-5 text-2xl'>
          <span className='font-sans text-gray-1000'>
            Rs 400
          </span>
          <span className='line-through text-grey-500'>
            Rs 999
          </span>
          <span className='text-primary-color font-semibold'>
            60% off
          </span>
        </div>
      </div>
      </section>

      <section className='space-y-5 w-full'>
        {[1,1,1,1,1,1,1,1].map((item,index)=>
          <div className='space-y-3'>
            <ReviewCard/>
            <Divider/>
          </div>
        )}
      </section>
    </div>
  ) 
}

export default Review
import React from 'react'

const CategoryGrid = () => {
  return (
    <div className='grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20'>
        
      <div className='col-span-3 row-span-12 text-white'>
        <img
          className='w-full h-full object-cover object-top rounded-md'
          src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
      </div>

      <div className='col-span-2 row-span-6'>
        <img
          className='w-full h-full object-cover object-top rounded-md'
          src="https://images.pexels.com/photos/1154861/pexels-photo-1154861.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
      </div>

      <div className='col-span-4 row-span-6'>
        <img
          className='w-full h-full object-cover object-top rounded-md'
          src="https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
      </div>

      <div className='col-span-3 row-span-12'>
        <img
          className='w-full h-full object-cover object-top rounded-md'
          src="https://images.pexels.com/photos/12730810/pexels-photo-12730810.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
      </div>

      <div className='col-span-4 row-span-6'>
        <img
          className='w-full h-full object-cover object-top rounded-md'
          src="https://images.pexels.com/photos/794064/pexels-photo-794064.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
      </div>

      <div className='col-span-2 row-span-6'>
        <img
          className='w-full h-full object-cover object-top rounded-md'
          src="https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
      </div>
    </div>
  )
}

export default CategoryGrid
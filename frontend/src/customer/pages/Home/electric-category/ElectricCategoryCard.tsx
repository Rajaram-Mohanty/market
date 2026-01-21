import React from 'react'

const ElectricCategoryCard = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-3'>
      <img 
        className='object-contain h-10' 
        src="https://m.media-amazon.com/images/I/71TPda7cwUL._AC_UY327_FMwebp_QL65_.jpg" 
        alt="laptop" 
      />
      <h2 className='font-semibold text-sm'>laptop</h2>
    </div>
  )
}

export default ElectricCategoryCard
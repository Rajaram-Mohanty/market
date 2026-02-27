import React from 'react'
import type { HomeCategory } from '../../../../types/homeCategoryTypes'

const ElectricCategoryCard = ({item}: {item: HomeCategory}) => {
  return (
    <div className='flex flex-col justify-center gap-3'>
      <img 
        className='object-contain h-10' 
        src={item.image} 
        alt={item.name} 
      />
      <h2 className='font-semibold text-sm text-center'>{item.name}</h2>
    </div>
  )
}

export default ElectricCategoryCard
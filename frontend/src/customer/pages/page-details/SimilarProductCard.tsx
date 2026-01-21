import React from 'react'

const SimilarProductCard = () => {
  return (
    <div><div className='group px-4 relative'>
      <div className='card '

      >

        <img
          className='card-media object-top'
          src='https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1036&q=80' alt=""
        />


      </div>

      <div className='details group-hover-effect pt-3 space-y-1 rounded-md'>
        <div className='name'>
          <h1>Niky</h1>
          <p>Blue Shirt</p>
        </div>

        <div className='price flex items-center gap-3'>
          <span className='font-sans text-gray-1000'>
            Rs 400
          </span>
          <span className='thin-line-through text-grey-500'>
            Rs 999
          </span>
          <span className='text-primary-color font-semibold'>
            60% off
          </span>
        </div>
      </div>


    </div></div>
  )
}

export default SimilarProductCard
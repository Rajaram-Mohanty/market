import React from 'react'
import UserAddressCard from './UserAddressCard'

const Address = () => {
  return (
    <div className='space-y-3'>
      {[1,1,1,1,1].map((item,index)=>{
        return(
            <UserAddressCard/>
        )
      })}
    </div>
  )
}

export default Address
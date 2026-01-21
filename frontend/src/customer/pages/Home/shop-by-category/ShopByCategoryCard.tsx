import React from 'react';
import "./ShopByCategory.css";

const ShopByCategoryCard = () => {
    return (
        <div className='flex flex-col justify-center items-center group cursor-pointer'>
            <div className='custom-border w-[150px] h-[150px] lg:w-[249px] lg:h-[249px] rounded-full bg-primary-color'>
                <img 
                    className='rounded-full group-hover:scale-95 transition-transform duration-700 object-cover object-top h-full w-full rounded-full'
                    src="https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg" 
                    alt="Kitchen and Table" 
                />
            </div>
            <h1 className='font-semibold text-sm lg:text-base mt-3'>Kitchen and Table</h1>
        </div>
    );
};

export default ShopByCategoryCard;
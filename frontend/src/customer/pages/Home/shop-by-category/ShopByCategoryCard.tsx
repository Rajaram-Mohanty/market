import React from 'react';
import "./ShopByCategory.css";
import type { HomeCategory } from '../../../../types/homeCategoryTypes';

const ShopByCategoryCard = ({item}: {item: HomeCategory}) => {
    return (
        <div className='flex flex-col justify-center items-center group cursor-pointer'>
            <div className='custom-border w-[150px] h-[150px] lg:w-[249px] lg:h-[249px] rounded-full bg-primary-color'>
                <img 
                    className='rounded-full group-hover:scale-95 transition-transform duration-700 object-cover object-top h-full w-full rounded-full'
                    src={item.image} 
                    alt={item.name} 
                />  
            </div>
            <h1 className='font-semibold text-sm lg:text-base mt-3'>{item.name}</h1>
        </div>
    );
};

export default ShopByCategoryCard;
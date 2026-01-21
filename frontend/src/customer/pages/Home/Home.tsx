import React from 'react'
import ElectricCategory from './electric-category/ElectricCategory'
import CategoryGrid from './category-grid/CategoryGrid'
import Deal from './deal/Deal'
import ShopByCategory from './shop-by-category/ShopByCategory'
import { Button } from '@mui/material'
import { Storefront } from '@mui/icons-material'

const Home = () => {
    return (
        <div className='space-y-5 lg:space-y-10 relative pb-20'>
            <ElectricCategory />

            <CategoryGrid />

            <div className='pt-20'>
                <h1 className='text-lg lg:text-4xl font-bold text-primary pb-5 lg:pb-10 text-center'>
                    Today's Deal
                </h1>
                <Deal />
            </div>

            <section className='pt-20'>
                <h1 className='text-lg lg:text-4xl font-bold text-primary pb-5 lg:pb-10 text-center'>
                    SHOP BY CATEGORY
                </h1>
                <ShopByCategory />
            </section>


            <section className='px-5 lg:px-20 relative h-[200px] lg:h-[450px]'>
                <img
                    className='w-full h-full object-cover'
                    src="https://images.pexels.com/photos/5632381/pexels-photo-5632381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Become Seller Banner"
                />
                <div className='absolute top-1/2 left-4 lg:left-[15rem] transform -translate-y-1/2 space-y-3'>
                    <h1 className='text-lg lg:text-4xl font-semibold text-white'>
                        Sell your product with <span className='logo'>Market</span>
                    </h1>
                    <div className='pt-6 flex justify-center'>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<Storefront />}
                        >
                            Become Seller
                        </Button>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default Home
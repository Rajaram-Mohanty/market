import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import { teal } from '@mui/material/colors';
import { Button, Divider } from '@mui/material';
import { Add, AddShoppingCart, FavoriteBorder, LocalShipping, Remove, Shield, Wallet, WorkspacePremium } from '@mui/icons-material';
import SimilarProduct from './SimilarProduct';
import ReviewCard from '../review/ReviewCard';

const ProductDetails = () => {

    const [quantity, setQuantity] = React.useState(1)

    return (
        <div className='px-5 lg:px-20 pt-10'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                <section className='flex flex-col lg:flex-row gap-5'>
                    <div className='w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3'>
                        {[1, 1, 1, 1].map((item, index) => (
                            <img key={index} className='lg:w-full w-[50px] cursor-pointer rounded-md' src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80" alt="" />
                        ))}
                    </div>
                    <div className='w-full lg:w-[85%]'>
                        <img className="w-full rounded-md" src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80" alt="" />
                    </div>
                </section>
                <section className='font-bold text-lg text-primary-color'>
                    <h1>Raam Clothing</h1>
                    <p className='text-gray-500 font-semibold'>men black shirt</p>
                    <div className='flex justify-between items-center py-2 border w-[180px] px-3 pt-5'>
                        <div className='flex items-center gap-1'>
                            <span>4</span>
                            <StarIcon sx={{ color: teal[500], fontSize: "20px" }} />
                        </div>
                        <Divider orientation="vertical" flexItem />
                        <span>
                            234 Ratings
                        </span>
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
                        <p>Inclusive of all taxes . Free shipping above ₹1500 </p>
                    </div>

                    <div className='mt-7 space-y-3'>
                        <div className='flex items-center gap-4'>
                            <Shield sx={{ color: teal[500] }} />
                            <p>Authentic and Quality Assured</p>
                        </div>
                        <div className='flex items-center gap-4'>
                            <WorkspacePremium sx={{ color: teal[500] }} />
                            <p>100% money back guarantee</p>
                        </div>
                        <div className='flex items-center gap-4'>
                            <LocalShipping sx={{ color: teal[500] }} />
                            <p>Free shipping & Returns</p>
                        </div>
                        <div className='flex items-center gap-4'>
                            <Wallet sx={{ color: teal[500] }} />
                            <p>Pay on delivery might be available</p>
                        </div>
                    </div>
                    <div className='mt-7 space-y-2'>
                        <h1>
                            Quantity
                        </h1>
                        <div className="flex items-center gap-2 w-[140px] justify-between">
                            <Button disabled={quantity == 1} onClick={() => setQuantity(quantity - 1)}>
                                <Remove />
                            </Button>
                            <span>{quantity}</span>
                            <Button onClick={() => setQuantity(quantity + 1)}>
                                <Add />
                            </Button>
                        </div>
                    </div>

                    <div className='item-center flex mt-12 gap-5'>
                        <Button fullWidth variant='contained'
                            startIcon={<AddShoppingCart />}
                            sx={{ py: "1rem" }}
                        >Add to the cart</Button>

                        <Button fullWidth variant='outlined'
                            startIcon={<FavoriteBorder />}
                            sx={{ py: "1rem" }}
                        >wishlist</Button>
                    </div>

                    <div>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum esse iste a, assumenda inventore fuga explicabo libero porro voluptas ut?</p>
                    </div>

                    <div className="mt-12 space-y-5">
                        <ReviewCard />
                        <Divider />
                    </div>
                </section>
            </div>

            <div className="mt-20">
                <h1 className='text-lg font-bold'>Similar Products</h1>
                <div className='pt-5'>
                    <SimilarProduct />
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
import React, { useState } from 'react'
import { Avatar, Box, IconButton, useMediaQuery, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { AddShoppingCart } from '@mui/icons-material';
import StoreFront from '@mui/icons-material/StoreFront';
import CategorySheet from './CategorySheet';
import { mainCategory } from '../../../data/category/mainCategory';

const Navbar = () => {
    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up('lg'))
    const [selectedCategory, setSelectedCategory] = useState("men");
    const [showCategorySheet, setShowCategorySheet] = useState(false);

    return (
        <div>
            <Box sx={{ zIndex: 2 }} className='sticky top-0 left-0 right-0 z-50 bg-white'>
                <div className='flex items-center justify-between px-5 lg:px-20 h-[70px] border-b'>
                    <div className='flex items-center gap-9'>
                        <div className='flex items-center gap-2'>
                            {!isLarge && <IconButton>
                                <MenuIcon />
                            </IconButton>}
                            <h1 className='logo cursor-pointer text-lg md:text-2xl text-primary-color'>
                                Market
                            </h1>
                        </div>
                        <ul className='flex item-center font-medium hover:text-primary-color'>

                            {mainCategory.map((item) => <li

                                onMouseLeave={() => setShowCategorySheet(false)}
                                onMouseEnter={() => {
                                    setShowCategorySheet(true);
                                    setSelectedCategory(item.categoryId);
                                }
                                }

                                className='mainCategory hover:text-primary-color
                                    hover:border-b-2 h-[70px] px-4 border-primary-color flex items-center'>
                                {item.name}
                            </li>)}

                        </ul>
                    </div>
                    <div className='flex gap-1 lg:gap-6 items-center'>
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                        {
                            true ? <Button className='flex items-center gap-2'>
                                <Avatar
                                    sx={{ width: 29, height: 29 }}
                                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" />
                                <h1 className='font-semibold hidden lg:block'>
                                    Market
                                </h1>
                            </Button> : <Button variant='contained'>
                                Login
                            </Button>
                        }

                        <IconButton>
                            <FavoriteBorder sx={{ fontSize: 29 }} />
                        </IconButton>

                        <IconButton>
                            <AddShoppingCart className='text-grey-700' sx={{ fontSize: 29 }} />
                        </IconButton>
                        {
                            isLarge && <Button startIcon={<StoreFront />} variant='outlined'>Become Seller</Button>
                        }
                    </div>
                </div>
                {showCategorySheet && <div
                    onMouseLeave={() => setShowCategorySheet(false)}
                    onMouseEnter={() => setShowCategorySheet(true)}

                    className='CategorySheet absolute top-[4.41rem] left-20 right-20 border bg-slate-500'>
                    <CategorySheet selectedCategory={selectedCategory} />
                </div>}
            </Box>
        </div>
    )
}

export default Navbar
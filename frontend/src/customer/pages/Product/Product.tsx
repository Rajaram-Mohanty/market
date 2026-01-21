import React, { useState } from 'react'
import FilterSection from './FilterSection'
import ProductCard from './ProductCard'
import { useTheme, useMediaQuery, Box, IconButton, FormControl, InputLabel, Select, MenuItem, Divider, Pagination } from '@mui/material'
import { FilterAlt } from '@mui/icons-material'

const Product = () => {
  const theme = useTheme()
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'))
  const [sort, setSort] = useState()
  const [page, setPage] = useState(1)

  const handlesortChange = (event: any) => {
    setSort(event.target.value);
  };

  const handlePageChange = (value: number) => {
    setPage(value)
  }

  return (
    <div className='-z-10 mt-10'>
      <h1 className='tet-3xl text-center  font-bold text-gray-700 pb-5 px-9 uppercase space-x-2'> women sarees</h1>
      <div className='lg:flex'>

        <section className='filter_section hidder lg:block w-[20%]'>
          <FilterSection />
        </section>

        <div className='w-full lg:w-[80%] space-y-5'>
          <div className='flex justify-between items-center px-9 h-[40px]'>

            <div className='relative w[50%]'>
              {!isLarge && <IconButton>
                <FilterAlt />
              </IconButton>}

              {!isLarge && <Box>
                <FilterSection />
              </Box>}
            </div>

            <FormControl size="small" sx={{ width: '200px' }}>
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Age"
                onChange={handlesortChange}
              >
                <MenuItem value={"price_low"}>Price: Low to High</MenuItem>
                <MenuItem value={"price_high"}>Price: High to Low</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

          </div>
          <Divider />
          <section className='product_section grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5 justify-center'>
            {[1, 1, 1, 1, 1, 1].map((item: any) => <ProductCard />)}
          </section>

          <div className='flex justify-center py-10'>
            <Pagination
              onChange={(e, value) => handlePageChange(value)}
              count={10}
              variant="outlined" 
              color='primary'/>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Product
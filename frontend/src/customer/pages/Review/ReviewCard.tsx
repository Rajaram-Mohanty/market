import React from 'react'
import { Avatar, Box, Grid, IconButton, Rating } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { red } from '@mui/material/colors'

const ReviewCard = () => {
    return (
        <div className='flex justify-between'>
            <Grid container spacing={9}>
                <Grid size={{ xs: 1 }}>
                    <Box>
                        <Avatar className='text-white' sx={{ width: 56, height: 56, backgroundColor: "#9155FD" }}>
                            M
                        </Avatar>
                    </Box>
                </Grid>
                <Grid size={{ xs: 9 }}>
                    <div>
                        <div className='space-y-2'>
                            <p className='font-semibold text-lg'> Market</p>
                            <p className='opacity-70'>2026-01-15T11:37:07.000Z </p>
                        </div>
                    </div>
                    <Rating readOnly value={4} precision={0.5} />
                    <p>Value for money product, great product</p>

                    <div>
                        <img className='w-24 object-cover' src="https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80" alt="" />
                    </div>
                </Grid>
            </Grid>
            <div>

            <IconButton>
                <Delete sx={{ color: red[500] }} />
            </IconButton>
            </div>
        </div>
    )
}

export default ReviewCard
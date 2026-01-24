import React from 'react'
import { Radio } from '@mui/material'

const AddressCard = () => {
    const handleChange = (event: any) => {
        console.log(event?.target.checked);
    }
    return (
        <div className='p-5 border rounded-md flex'>
            <div className='flex items-center gap-3'>
                <Radio checked={true} onChange={handleChange} value="" name="radio-button" />
            </div>

            <div className='space-y-3 pt-3'>
                <h1>Market</h1>
                <p className='w[320px]'>Ambavadi choke, Banglor, karnataka -530068</p>
                <p><strong>Mobile Number: </strong>9876543210</p>
            </div>
        </div>
    );
};

export default AddressCard
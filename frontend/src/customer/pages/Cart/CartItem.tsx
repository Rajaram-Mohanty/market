import React from 'react';
import { IconButton, Divider, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CartItem = () => {
    // This handler will be made dynamic when API integration is implemented
    const handleUpdateQuantity = (value: number) => {
        console.log("Update quantity by:", value);
    };

    return (
        <div className="border rounded-md relative">
            {/* Top Section: Product Image and Info */}
            <div className="p-5 flex gap-3">
                <div>
                    <img 
                        className="w-[90px] rounded-md" 
                        src="https://images.clothes.com/example-item.jpg" 
                        alt="Product" 
                    />
                </div>
                <div className="space-y-2">
                    <h1 className="font-semibold text-lg">Virani Clothing</h1>
                    <p className="text-sm text-gray-500">Premium Men's Gray Shirt</p>
                    <p className="text-sm text-gray-600 font-medium">Size: M</p>
                    <p className="text-extra-small text-gray-400">
                        <strong className="text-sm text-gray-500">Sold by:</strong> 7-day replacement available
                    </p>
                    <p className="text-sm text-gray-500">Quantity: 1</p>
                </div>
            </div>

            {/* Remove Item Button */}
            <IconButton className="absolute top-1 right-1" color="primary">
                <CloseIcon />
            </IconButton>

            <Divider />

            {/* Bottom Section: Quantity Controls and Price */}
            <div className="px-5 py-2 flex justify-between items-center">
                <div className="flex items-center gap-2 w-[140px] justify-between">
                    {/* Decrease Quantity */}
                    <Button onClick={() => handleUpdateQuantity(-1)} disabled={true}>
                        <RemoveIcon />
                    </Button>
                    
                    <span className="font-medium px-3 py-1 border rounded-md">
                        1
                    </span>
                    
                    {/* Increase Quantity */}
                    <Button onClick={() => handleUpdateQuantity(1)}>
                        <AddIcon />
                    </Button>
                </div>

                {/* Pricing Info */}
                <div className="text-gray-700 font-medium">
                    <span className="text-sm">₹400</span>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
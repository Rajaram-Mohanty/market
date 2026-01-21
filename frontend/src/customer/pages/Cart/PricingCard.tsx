import React from 'react';
import { Divider } from '@mui/material';

const PricingCard = () => {
    return (
        <div className="space-y-3 p-5">
            {/* Subtotal Section */}
            <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span>₹1000</span>
            </div>

            {/* Discount Section [19:17:11] */}
            <div className="flex justify-between items-center">
                <span>Discount</span>
                <span className="text-teal-700">-₹600</span>
            </div>

            {/* Shipping Section [19:17:40] */}
            <div className="flex justify-between items-center">
                <span>Shipping</span>
                <span className="text-teal-700">Free</span>
            </div>

            {/* Platform Fee Section [19:17:57] */}
            <div className="flex justify-between items-center">
                <span>Platform Fee</span>
                <span className="text-teal-700">Free</span>
            </div>

            {/* Divider Line [19:18:26] */}
            <Divider />

            {/* Total Section */}
            <div className="flex justify-between items-center font-semibold text-lg text-primary-color">
                <span>Total</span>
                <span>₹400</span>
            </div>
        </div>
    );
};

export default PricingCard;
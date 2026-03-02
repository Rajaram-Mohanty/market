import { Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { teal } from '@mui/material/colors'
import React, { useState } from 'react'
import { colors } from '../../../data/filter/color'
import { useSearchParams } from 'react-router-dom'
import { prices } from '../../../data/filter/price'
import { discount } from '../../../data/filter/discount'

const FilterSection = () => {
    const [expandColour, setExpandColour] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleColourToggle = () => {
        setExpandColour(!expandColour);
    };

    const updateFilterParams = (e: any) => {
        const { name, value } = e.target;
        if (value) {
            searchParams.set(name, value);
        } else {
            searchParams.delete(name);
        }
        setSearchParams(searchParams);
    };

    const clearAllFilters = () => {
        searchParams.forEach((value, key) => {
            searchParams.delete(key);
        });
        setSearchParams(searchParams);
    };

    return (
        <div className='z-50 space-y-5 bg-white p-5'>
            <div className='flex items-center justify-between h-[40px] px-9 lg:border-r'>
                <p className='text-lg font-semibold'>Filter</p>
                <Button
                    onClick={clearAllFilters}
                    size='small'
                    className='text-teal-600 cursor-pointer font-semibold'
                >
                    clear all
                </Button>
            </div>
            <Divider />

            <div className='px-9 space-y-6'>
                {/* Color Filter Section */}
                <section>
                    <FormControl>
                        <FormLabel
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: teal[500],
                                pb: '14px'
                            }}
                        >
                            Color
                        </FormLabel>

                        <RadioGroup
                            aria-labelledby="color"
                            name="color"
                            onChange={updateFilterParams}
                            value={searchParams.get("color") || ""}
                        >
                            {colors.slice(0, expandColour ? colors.length : 5).map((item: any) => (
                                <FormControlLabel
                                    key={item.name}
                                    value={item.name}
                                    control={<Radio size='small' />}
                                    label={
                                        <div className='flex items-center gap-2'>
                                            <p>{item.name}</p>
                                            <p
                                                className={`h-5 w-5 rounded-full ${item.name === "White" ? "border" : ""}`}
                                                style={{ backgroundColor: item.hex }}
                                            />
                                        </div>
                                    }
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>

                    <div>
                        <Button
                            onClick={handleColourToggle}
                            className='text-primary-color cursor-pointer hover:text-teal-900 flex items-center'
                        >
                            {expandColour ? "Show Less" : `+ ${colors.length - 5} More`}
                        </Button>
                    </div>
                </section>

                <Divider />

                {/* Price Filter Section */}
                <section>
                    <FormControl>
                        <FormLabel
                            sx={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: teal[500],
                                pb: "14px",
                            }}
                            className='text-2xl font-semibold'
                            id='price'
                        >
                            Price
                        </FormLabel>
                        <RadioGroup
                            name="price"
                            onChange={updateFilterParams}
                            value={searchParams.get("price") || ""}
                        >
                            {prices.map((item: any) => (
                                <FormControlLabel
                                    key={item.name}
                                    value={item.value}
                                    control={<Radio size="small" />}
                                    label={item.name}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </section>

                <Divider />

                {/* Discount Filter Section */}
                <section>
                    <FormControl>
                        <FormLabel
                            sx={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: teal[500],
                                pb: "14px",
                            }}
                            className='text-2xl font-semibold'
                            id='discount'
                        >
                            Discount
                        </FormLabel>
                        <RadioGroup
                            name="discount"
                            onChange={updateFilterParams}
                            value={searchParams.get("discount") || ""}
                        >
                            {discount.map((item: any) => (
                                <FormControlLabel
                                    key={item.name}
                                    value={item.value}
                                    control={<Radio size="small" />}
                                    label={item.name}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </section>
            </div>
        </div>
    );
};

export default FilterSection;
import React, { useContext } from 'react';
import { Box, Slider, Typography } from '@mui/material';
import { FilterContext } from '../FilterContext';

const PriceRangeFilter = () => {
    const { priceRange, updatePriceRange } = useContext(FilterContext);

    const handleSliderChange = (event, newValue) => {
        updatePriceRange(newValue[0], newValue[1]);
    };

    return (
        <>
            <Typography variant="body1" sx={{ textAlign: 'left' }}>Rango de Precio:</Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 2,
                }}
            >
                <Slider
                    value={priceRange}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100}
                    step={0.1}
                    sx={{
                        color: '#1b986e',
                        '& .MuiSlider-thumb': {
                            backgroundColor: '#fff',
                            border: '2px solid #1b986e',
                        },
                    }}
                />
            </Box>
        </>
    );
};

export default PriceRangeFilter;

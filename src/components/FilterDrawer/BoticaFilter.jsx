import React, { useContext } from 'react';
import { FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material';
import { FilterContext } from '../FilterContext';

const BoticaFilter = ({ boticasDisponibles }) => {
    const { boticaName, updateBoticaName } = useContext(FilterContext);

    const handleBoticaChange = (event) => {
        const { value, checked } = event.target;
        updateBoticaName(value, checked);
    };

    return (
        <>
            <Typography variant="body1" sx={{ mt: 2, textAlign: 'left' }}>Botica:</Typography>
            <FormGroup>
                {boticasDisponibles.map((botica, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                checked={boticaName.includes(botica)}
                                onChange={handleBoticaChange}
                                value={botica}
                                sx={{
                                    color: '#1b986e',
                                    '&.Mui-checked': {
                                        color: '#1b986e',
                                    },
                                }}
                            />
                        }
                        label={botica}
                        sx={{ typography: 'body2', textAlign: 'left' }}
                    />
                ))}
            </FormGroup>
        </>
    );
};

export default BoticaFilter;

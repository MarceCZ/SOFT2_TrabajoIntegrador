import React, { useContext } from 'react';
import { FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material';
import { FilterContext } from '../FilterContext';

const MarcaFilter = ({ marcasDisponibles }) => {
    const { marcaName, updateMarcaName } = useContext(FilterContext);

    const handleMarcaChange = (event) => {
        const { value, checked } = event.target;
        updateMarcaName(value, checked);
    };

    return (
        <>
            <Typography variant="body1" sx={{ mt: 2, textAlign: 'left' }}>Marca:</Typography>
            <FormGroup>
                {marcasDisponibles.map((marca, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                checked={marcaName.includes(marca)}
                                onChange={handleMarcaChange}
                                value={marca}
                                sx={{
                                    color: '#1b986e',
                                    '&.Mui-checked': {
                                        color: '#1b986e',
                                    },
                                }}
                            />
                        }
                        label={marca}
                        sx={{ typography: 'body2', textAlign: 'left' }}
                    />
                ))}
            </FormGroup>
        </>
    );
};

export default MarcaFilter;

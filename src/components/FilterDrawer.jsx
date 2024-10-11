import React, { useContext } from 'react';
import { Box, Typography, Slider, FormGroup, FormControlLabel, Checkbox, Button, Grid, TextField } from '@mui/material';
import { FilterContext } from './FilterContext';

const FilterDrawer = ({ boticasDisponibles, marcasDisponibles }) => {
    const {
        priceRange,
        updatePriceRange,
        boticaName,
        updateBoticaName,
        marcaName,
        updateMarcaName,
        medicamentoName,
        updateMedicamentoName,
        resetFilters
    } = useContext(FilterContext);

    const handleSliderChange = (event, newValue) => {
        updatePriceRange(newValue[0], newValue[1]);
    };

    const handleBoticaChange = (event) => {
        const { value, checked } = event.target;
        updateBoticaName(value, checked);
    };

    const handleMarcaChange = (event) => {
        const { value, checked } = event.target;
        updateMarcaName(value, checked);
    };

    return (
        <Grid container justifyContent="flex-start">
            <Grid>
                <Box
                    sx={{
                        padding: 2,
                        width: '100%',
                        maxWidth: '450px',
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'left' }}>Filtros</Typography>

                    <TextField
                        label="Buscar Medicamento"
                        variant="outlined"
                        value={medicamentoName}
                        onChange={(e) => updateMedicamentoName(e.target.value)}
                        sx={{
                            mt: 1,
                            mb: 2,
                            '& label.Mui-focused': {
                                color: '#1b986e',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#1b986e',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#1b986e',
                                },
                                '&.Mui-focused fieldset': { 
                                    borderColor: '#1b986e',
                                },
                            },
                        }}
                    />


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

                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={resetFilters}
                        sx={{ mt: 2, borderColor: '#1b986e', color: '#1b986e', width: '100%' }}
                    >
                        Resetear Filtros
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default FilterDrawer;

import React, { useContext, useEffect } from 'react';
import { Dialog, Box, Typography, TextField, IconButton, Slider, Grid, Button } from '@mui/material';
import { FilterContext } from './FilterContext';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

const FilterDrawer = ({ isOpen, toggleDrawer }) => {
    const { 
        priceRange, 
        updatePriceRange, 
        boticaName, 
        updateBoticaName, 
        marcaName, 
        updateMarcaName, 
        resetFilters 
    } = useContext(FilterContext);

    const handleSliderChange = (event, newValue) => {
        updatePriceRange(newValue[0], newValue[1]);
    };

    // Sincronizar los valores del rango con los valores del texto
    useEffect(() => {
        updatePriceRange(priceRange[0], priceRange[1]);
    }, [priceRange, updatePriceRange]);

    return (
        <Dialog open={isOpen} onClose={toggleDrawer(false)} maxWidth="sm" fullWidth>
            <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FilterListIcon sx={{ mr: 1 }} />
                        <Typography variant="h6">Filtros</Typography>
                    </Box>
                    <IconButton onClick={toggleDrawer(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="body1">Rango de Precio: {priceRange[0]} - {priceRange[1]}</Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                        <Slider
                            value={priceRange}
                            onChange={handleSliderChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={100}
                            step={0.1}
                            sx={{
                                width: '80%',
                                color: '#1b986e',
                                '& .MuiSlider-thumb': {
                                    backgroundColor: '#fff',
                                    border: '2px solid #1b986e',
                                },
                            }}
                        />
                    </Box>

                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={6}>
                            <TextField
                                type="number"
                                label="Mínimo"
                                variant="outlined"
                                value={priceRange[0]}
                                onChange={(e) => updatePriceRange(Number(e.target.value), priceRange[1])}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                type="number"
                                label="Máximo"
                                variant="outlined"
                                value={priceRange[1]}
                                onChange={(e) => updatePriceRange(priceRange[0], Number(e.target.value))}
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                    {/* Filtro por nombre de la botica */}
                    <Typography variant="body1" sx={{ mt: 2 }}>Nombre de la Botica</Typography>
                    <TextField
                        variant="outlined"
                        value={boticaName}
                        onChange={(e) => updateBoticaName(e.target.value)}
                        fullWidth
                        sx={{ mt: 1 }}
                    />

                    {/* Filtro por nombre de la marca */}
                    <Typography variant="body1" sx={{ mt: 2 }}>Nombre de la Marca</Typography>
                    <TextField
                        variant="outlined"
                        value={marcaName}
                        onChange={(e) => updateMarcaName(e.target.value)}
                        fullWidth
                        sx={{ mt: 1 }}
                    />

                    {/* Botón para resetear los filtros */}
                    <Button 
                        variant="outlined" 
                        color="secondary" 
                        onClick={resetFilters} 
                        sx={{ mt: 2, borderColor: '#1b986e', color: '#1b986e' }} // Set button border and text color
                    >
                        Resetear Filtros
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};

export default FilterDrawer;

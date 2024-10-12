import React, { useContext } from 'react';
import { Dialog, Box, Typography, Slider, Grid, Button, FormGroup, FormControlLabel, Checkbox, TextField } from '@mui/material';
import { FilterContext } from './FilterContext';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const FilterDrawerMini = ({ isOpen, toggleDrawer, boticasDisponibles, marcasDisponibles, decodedBotica }) => {
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
        <Dialog open={isOpen} onClose={toggleDrawer} maxWidth="sm" fullWidth>
            <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">Filtros</Typography>
                    <IconButton onClick={toggleDrawer}>
                        <CloseIcon/>
                    </IconButton>
                </Box>

                <Box sx={{ mt: 2 }}>
                <TextField
                        fullWidth
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
                    <Typography variant="body1">Rango de Precio:</Typography>
                    <Slider
                        value={priceRange}
                        onChange={handleSliderChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={100}
                        step={0.1}
                        sx={{ color: '#1b986e' }}
                    />

                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {!decodedBotica && (
                            <Grid item xs={6}>
                                <Typography variant="body1">Botica</Typography>
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
                                        />
                                    ))}
                                </FormGroup>
                            </Grid>
                        )}
                        
                        <Grid item xs={6}>
                            <Typography variant="body1">Marca</Typography>
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
                                    />
                                ))}
                            </FormGroup>
                        </Grid>
                    </Grid>

                    <Button 
                        variant="outlined" 
                        color="secondary" 
                        onClick={resetFilters} 
                        sx={{ mt: 2, borderColor: '#1b986e', color: '#1b986e', '&:hover': { borderColor: '#157f59', color: '#fff', backgroundColor: '#1b986e' } }}
                    >
                        Resetear Filtros
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};

export default FilterDrawerMini;


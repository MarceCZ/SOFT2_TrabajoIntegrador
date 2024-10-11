import React, { useContext } from 'react';
import { FilterContext } from './FilterContext';
import { Box, TextField, Button } from '@mui/material';

const ProductFilter = () => {
  const { filters, updateFilters } = useContext(FilterContext);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    updateFilters({ [name]: value }); // Actualiza los filtros en función del campo
  };

  const handleResetFilters = () => {
    updateFilters({
      precioMinimo: 0,
      precioMaximo: Infinity,
      botica: '',
      marca: ''
    });
  };

  return (
    <Box sx={{ marginBottom: '20px' }}>
      {/* Campo para filtrar por precio */}
      <TextField
        label="Precio Mínimo"
        type="number"
        name="precioMinimo"
        value={filters.precioMinimo}
        onChange={handleFilterChange}
        sx={{ marginRight: '10px' }}
      />
      <TextField
        label="Precio Máximo"
        type="number"
        name="precioMaximo"
        value={filters.precioMaximo}
        onChange={handleFilterChange}
        sx={{ marginRight: '10px' }}
      />
      {/* Campo para filtrar por botica */}
      <TextField
        label="Botica"
        type="text"
        name="botica"
        value={filters.botica}
        onChange={handleFilterChange}
        sx={{ marginRight: '10px' }}
      />
      {/* Campo para filtrar por marca */}
      <TextField
        label="Marca"
        type="text"
        name="marca"
        value={filters.marca}
        onChange={handleFilterChange}
        sx={{ marginRight: '10px' }}
      />
      <Button variant="outlined" onClick={handleResetFilters}>
        Resetear Filtros
      </Button>
    </Box>
  );
};

export default ProductFilter;

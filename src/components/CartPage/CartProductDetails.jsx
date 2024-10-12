import React from 'react';
import { Box, Typography } from '@mui/material';

const CartProductDetails = ({ item }) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <img
      src={item.imagen}
      alt={item.nombre}
      style={{ width: 60, height: 60, marginRight: '10px' }}
    />
    <Box>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        {item.nombre}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {item.presentacion}
      </Typography>
    </Box>
  </Box>
)

export default CartProductDetails

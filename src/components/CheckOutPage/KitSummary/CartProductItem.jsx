import React from 'react'
import { Box, Typography, ListItem, ListItemText } from '@mui/material'

const CartProductItem = ({ item }) => (
  <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', width: '70%' }}>
      <img src={item.imagen} alt={item.nombre} style={{ width: 50, height: 50, marginRight: 10 }} />
      <ListItemText
        primary={item.nombre}
        secondary={
          <Box>
            <Typography variant="body2" color="textSecondary">{item.presentacion}</Typography>
            <Typography variant="body2" fontWeight="bold" color="black">Cantidad: {item.cantidad}</Typography>
            <Typography variant="body2" fontWeight="bold" color="black">{item.botica}</Typography>
          </Box>
        }
      />
    </Box>
    <Box sx={{ width: '30%', textAlign: 'right' }}>
      <Typography sx={{ fontWeight: 'bold' }}>S/ {(item.precio * item.cantidad).toFixed(2)}</Typography>
    </Box>
  </ListItem>
)

export default CartProductItem

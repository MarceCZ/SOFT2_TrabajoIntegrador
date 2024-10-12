import React from 'react'
import { ListItem, Box, ListItemText, Typography, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const CartProductItem = ({ item, handleRemove }) => (
  <ListItem 
    key={item.id} 
    sx={{ 
      alignItems: 'flex-start', 
      display: 'flex', 
      justifyContent: 'space-between',
      mb: 1, 
      padding: 2, 
      borderRadius: '15px', 
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', 
      backgroundColor: '#fff' 
    }}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <img 
        src={item.imagen} 
        alt={item.nombre} 
        style={{ width: 50, height: 50, marginRight: 15 }} 
      />
      <ListItemText
        primary={<Typography variant="subtitle1" fontWeight="bold">{item.nombre}</Typography>}
        secondary={
          <Box>
            <Typography variant="body2" color="textSecondary">
              {item.presentacion}
            </Typography>
            <Typography variant="body2" color="textSecondary" fontWeight="bold">
              Cantidad: {item.cantidad}
            </Typography>
            <Typography variant="body2" fontWeight="bold" color="black">
              {item.botica}
            </Typography>
          </Box>
        }
      />
    </Box>

    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minWidth: '80px', mt: 2 }}>
      <Typography variant="subtitle1" sx={{ textAlign: 'right', fontWeight: 'bold' }}>
        S/ {(item.precio * item.cantidad).toFixed(2)}  
      </Typography>
      <IconButton edge="end" onClick={() => handleRemove(item)} sx={{ mt: 0.5 }}>
        <DeleteIcon color="error" />
      </IconButton>
    </Box>
  </ListItem>
)

export default CartProductItem

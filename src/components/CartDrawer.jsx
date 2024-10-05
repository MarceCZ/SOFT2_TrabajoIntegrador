import React, { useContext } from 'react'
import { Drawer, Box, Typography, IconButton, List, ListItem, ListItemText } from '@mui/material'
import { CartContext } from './CartContext'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import MedicalServicesRoundedIcon from '@mui/icons-material/MedicalServicesRounded'

const CartDrawer = ({ isOpen, toggleDrawer }) => {
  const { cartItems, removeFromCart, totalCartPrice } = useContext(CartContext);

  
  const handleRemove = (product) => {
    removeFromCart(product); 
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 400, display: 'flex', flexDirection: 'column', height: '100%' }}>
        
        <Box sx={{ padding: 2, paddingBottom: 0, display: 'flex', alignItems: 'center' }}>
          <MedicalServicesRoundedIcon sx={{ mr: 1 }} />  
          <Typography variant="h6" sx={{ mb: 0 }}> 
            Mi kit
          </Typography>
        </Box>

        {cartItems.length === 0 ? (
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="body1">Tu carrito está vacío.</Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ padding: 2, paddingTop: 0, flexGrow: 1, overflowY: 'auto' }}>
              <List>
                {cartItems.map((item) => (
                  <ListItem key={item.id} sx={{ alignItems: 'flex-start', display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img src={item.imagen} alt={item.nombre} style={{ width: 50, height: 50, marginRight: 10 }} />
                      <ListItemText
                        primary={item.nombre}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="textSecondary">
                              {item.presentacion}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" fontWeight="bold">
                              Cantidad: {item.cantidad}
                            </Typography>
                          </Box>
                        }
                      />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minWidth: '80px' }}>
                      <Typography sx={{ fontWeight: 'bold', textAlign: 'right', width: '100%' }}>
                        S/ {(item.precio * item.cantidad).toFixed(2)}  
                      </Typography>
                      <IconButton edge="end" onClick={() => handleRemove(item)} sx={{ mt: 1 }}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ padding: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Subtotal:</Typography>
                <Typography variant="h6" sx={{ textAlign: 'right', fontWeight: 'bold' }}>
                  S/ {totalCartPrice.toFixed(2)}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, gap: 0, marginLeft: '15px', marginRight: '15px' }}>
                <Button color="primary" variant="outlined" sx={{borderRadius: '25px', border: 'none'}}>Ir a mi kit</Button>
                <Button color="success" variant="contained" sx={{borderRadius: '25px'}}>Subscribirse a mi kit</Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  )
}

export default CartDrawer

import React, { useContext } from 'react';
import { Drawer, Box, Typography, IconButton, List, ListItem, ListItemText, Divider } from '@mui/material';
import { CartContext } from './CartContext';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, toggleDrawer }) => {
  const { cartItems, removeFromCart, totalCartPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const handleRemove = (product) => {
    removeFromCart(product); 
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
      <Box sx={{ 
        width: 460, 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        paddingLeft: '10px', 
        paddingRight: '10px',
        }}>
        <Box sx={{ 
          paddingTop: 1,
          paddingLeft: 2, 
          display: 'flex', 
          alignItems: 'center',
          mb: 1}}>
          <img 
            src="https://cdn-icons-png.freepik.com/512/8861/8861108.png" 
            alt="Mi kit" 
            style={{ 
              width: 40, 
              height: 40, 
              marginRight: 15 }} />  
          <Typography variant="h6" sx={{ mb: 0, fontWeight: 'bold' }}> 
            Mi kit
          </Typography>
        </Box>

        <Divider/>

        {cartItems.length === 0 ? (
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="body1">Tu carrito está vacío.</Typography>
          </Box>
        ) : (
          <>
            <Box sx={{flexGrow: 1, overflowY: 'auto' }}>
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
                            <Typography variant="body2" fontWeight="bold" color="black">
                              {item.botica}
                            </Typography>
                          </Box>
                        }
                      />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minWidth: '80px', mt: 2 }}> {/* mt: 2 para bajar */}
                      <Typography sx={{ textAlign: 'right', width: '100%' }}>
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
                <Button 
                  color="primary" 
                  variant="outlined" 
                  onClick={() => navigate('/cart')}
                  sx={{
                    borderRadius: '25px', 
                    border: 'none'}}>Ir a mi kit</Button>
                <Button color="success" variant="contained" sx={{borderRadius: '25px'}}>Subscribirse a mi kit</Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}

export default CartDrawer;

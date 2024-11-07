import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';

const CartActions = ({ totalCartPrice, navigate }) => {
  const isAuthenticated = () => sessionStorage.getItem('userId') !== null;

  return (
    <Box sx={{ padding: 2, mt: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Subtotal:</Typography>
        <Typography variant="h6" sx={{ textAlign: 'right', fontWeight: 'bold' }}>
          S/ {totalCartPrice.toFixed(2)}
        </Typography>
      </Box>
      
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6}>
          <Button 
            color="primary" 
            variant="outlined" 
            onClick={() => navigate('/cart')}
            sx={{ 
              borderRadius: '25px', 
              border: 'none', 
              width: '100%', 
              textTransform: 'none',
              fontWeight: 'bold',
              padding: '10px 16px', 
              transition: 'all 0.3s', 
              '&:hover': {
                backgroundColor: '#e3f2fd' 
              }
            }}>
            Ir a mi kit
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button  
            variant="contained"
            onClick={() => {
              if (isAuthenticated()) {
                navigate('/checkout');
              } else {
                // Redirigir a login con una URL de retorno
                navigate('/login?redirect=/checkout');
              }
            }}
            sx={{ 
              borderRadius: '25px', 
              width: '100%', 
              textTransform: 'none', 
              fontWeight: 'bold',
              padding: '10px 16px',
              transition: 'all 0.3s',
              backgroundColor: '#1b986e',
              '&:hover': {
                backgroundColor: '#66bb6a' 
              }
            }}>
            Suscribirse a mi kit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartActions;

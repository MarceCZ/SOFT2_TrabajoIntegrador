import React from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CartKitSummary = ({ totalCartPrice }) => {
  const navigate = useNavigate();

  // Función para verificar autenticación
  const isAuthenticated = () => {
    return localStorage.getItem('userId') !== null;
  };

  const handleSubscriptionClick = () => {
    if (isAuthenticated()) {
      navigate('/checkout');
    } else {
      navigate('/login?redirect=/checkout');
    }
  };

  return (
    <Box
      sx={{
        padding: { xs: '10px', md: '20px' },
        borderRadius: '12px',
        backgroundColor: '#f9fafb',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginBottom: '10px',
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: { xs: '18px', md: '24px' },
        }}
      >
        Resumen de mi suscripción
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Typography variant="body1">Subtotal</Typography>
        <Typography variant="body1">S/ {totalCartPrice}</Typography>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Total a pagar
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          S/ {totalCartPrice}
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="success"
        fullWidth
        onClick={handleSubscriptionClick} // Llama a la función que maneja la verificación de autenticación
        sx={{ borderRadius: '25px', padding: '10px 0', mt: 2, fontWeight: 'bold' }}
      >
        Subscribirme a mi kit
      </Button>
    </Box>
  )
}

export default CartKitSummary

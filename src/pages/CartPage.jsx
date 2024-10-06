import React, { useContext } from 'react';
import { Box, Typography, Button, IconButton, Grid, Paper, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { CartContext } from '../components/CartContext';
import Header from '../components/Header';

const CartPage = () => {
  const { cartItems, removeFromCart, addToCart, totalCartPrice } = useContext(CartContext);

  const handleRemove = (product) => {
    removeFromCart(product);
  };

  const minusOne = (product) => {
    if (product.cantidad > 1) {
      addToCart(product, -1);
    } else {
      removeFromCart(product);
    }
  };

  const plusOne = (product) => {
    addToCart(product, 1);
  };

  return (
    <div>
      <Header />
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h6" sx={{ mb: 2, ml: 1 }}>Mi kit ({cartItems.length})</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            <Grid container alignItems="center" sx={{ fontWeight: 'bold', mb: 2 }}>
              <Grid item xs={12} md={4} sx={{ paddingLeft: '90px' }}>
                <Typography>Productos</Typography>
              </Grid>
              <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
                <Typography>Botica</Typography>
              </Grid>
              <Grid item xs={12} md={2} sx={{ textAlign: 'center' }}>
                <Typography>Cantidad</Typography>
              </Grid>
              <Grid item xs={12} md={2} sx={{ textAlign: 'center' }}>
                <Typography>Subtotal</Typography>
              </Grid>
              <Grid item xs={12} md={1} />
            </Grid>
            <Divider sx={{ my: 2 }} />
            {cartItems.length === 0 ? (
              <Typography variant="body1">Tu carrito está vacío.</Typography>
            ) : (
              cartItems.map((item) => (
                <Paper
                  key={item.id}
                  sx={{ padding: '20px', marginBottom: '20px', borderRadius: '12px', backgroundColor: '#f9fafb' }}
                >
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src={item.imagen} alt={item.nombre} style={{ width: 60, height: 60, marginRight: '10px' }} />
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {item.nombre}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {item.presentacion}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {item.botica}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={2} sx={{ textAlign: 'center' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          borderRadius: '25px',
                          border: '1px solid #e5e7eb',
                          padding: '5px 10px',
                          justifyContent: 'space-between',
                          width: '120px',
                          margin: '0 auto'
                        }}
                      >
                        {item.cantidad > 1 ? (
                          <IconButton onClick={() => minusOne(item)} sx={{ padding: 0 }}>
                            <RemoveIcon />
                          </IconButton>
                        ) : (
                          <IconButton onClick={() => handleRemove(item)} sx={{ padding: 0 }}>
                            <DeleteIcon />
                          </IconButton>
                        )}
                        <Typography sx={{ mx: 1 }}>{item.cantidad}</Typography>
                        <IconButton onClick={() => plusOne(item)} sx={{ padding: 0 }}>
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={2} sx={{ textAlign: 'center' }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        S/ {item.precio * item.cantidad}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={1} sx={{ textAlign: 'right', pr: 1, ml: -1 }}>
                      <Button onClick={() => handleRemove(item)} color="error">
                        Eliminar
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              ))
            )}
          </Grid>

          <Grid item xs={12} md={3}>
            <Box
              sx={{
                padding: '20px',
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
                }}
              >
                Resumen de compra
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1">
                  S/ {totalCartPrice}
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                <Typography 
                  variant="body1" 
                  sx={{ fontWeight: 'bold' }}>
                    Total a pagar
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ fontWeight: 'bold' }}>
                  S/ {totalCartPrice}
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ borderRadius: '25px', padding: '10px 0' }}
              >
                Subscribirme a mi kit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CartPage;

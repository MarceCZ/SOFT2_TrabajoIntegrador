import React from 'react';
import { Grid, Paper, Typography, Divider, Button } from '@mui/material';
import CartProductDetails from './CartProductDetails';
import ModifyProductQuantity from './ModifyProductQuantity';

const CartListProducts = ({ cartProducts, handleModifyQuantity, hanldeRemoveFromCart }) => (
  <>
    <Grid container alignItems="center" sx={{ fontWeight: 'bold', mb: 2, color: '#6c6c6c' }}>
      <Grid item xs={12} md={4} sx={{ paddingLeft: { xs: '10px', md: '90px' }, display: { xs: 'none', md: 'block' } }}>
        <Typography>Productos</Typography>
      </Grid>
      <Grid item xs={12} md={3} sx={{ textAlign: 'center', display: { xs: 'none', md: 'block' } }}>
        <Typography>Botica</Typography>
      </Grid>
      <Grid item xs={12} md={2} sx={{ textAlign: 'center', display: { xs: 'none', md: 'block' } }}>
        <Typography>Cantidad</Typography>
      </Grid>
      <Grid item xs={12} md={2} sx={{ textAlign: 'center', display: { xs: 'none', md: 'block' } }}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={12} md={1} />
    </Grid>

    <Divider sx={{ my: 2, display: { xs: 'none', md: 'block' } }} />

    {cartProducts.map((item) => (
      <Paper
        key={item.id}
        sx={{ padding: '20px', marginBottom: '20px', borderRadius: '12px', backgroundColor: '#f9fafb' }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={4}>
            <CartProductDetails item={item} />
          </Grid>

          <Grid item xs={12} md={3} sx={{ textAlign: 'center', display: { xs: 'none', md: 'block' } }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {item.botica}
            </Typography>
          </Grid>

          <Grid item xs={12} md={2} sx={{ textAlign: 'center' }}>
            <ModifyProductQuantity
              item={item}
              handleModifyQuantity={handleModifyQuantity}
              hanldeRemoveFromCart={hanldeRemoveFromCart}
            />
          </Grid>

          <Grid item xs={12} md={2} sx={{ textAlign: 'center', display: { xs: 'none', md: 'block' } }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              S/ {item.precio * item.cantidad}
            </Typography>
          </Grid>

          <Grid
              item
              xs={12}
              md={1}
              sx={{
                textAlign: { xs: 'center', md: 'right' },
                pr: { md: 1 },
                mt: { xs: 2, md: 0 },
              }}
            >
              <Button onClick={() => hanldeRemoveFromCart(item)} color="error" sx={{ fontSize: { xs: '12px', md: '14px' } }}>
                Eliminar
              </Button>
            </Grid>

        </Grid>
      </Paper>
    ))}
  </>
);

export default CartListProducts;

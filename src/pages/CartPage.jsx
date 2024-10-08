import React, { useContext } from 'react'
import { Box, Typography, Grid, Divider } from '@mui/material'
import { CartContext } from '../components/CartContext'
import Header from '../components/Header'
import CartKitSummary from '../components/CartPage/CartKitSummary'
import CartListProducts from '../components/CartPage/CartListProducts'
import EmptyCart from '../components/CartPage/EmptyCart'

const CartPage = () => {
  const { cartProducts, removeFromCart, addToCart, totalCartPrice } = useContext(CartContext);

  const handleRemove = (product) => {
    removeFromCart(product)
  }

  const minusOne = (product) => {
    if (product.cantidad > 1) {
      addToCart(product, -1)
    } else {
      removeFromCart(product)
    }
  }

  const plusOne = (product) => {
    addToCart(product, 1);
  }

  return (
    <div>
      <Header />
      
      <Box sx={{ padding: '20px' }}>
        {cartProducts.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <Typography variant="h6" sx={{ mb: 2, ml: 1 }}>Mi kit ({cartProducts.length})</Typography>
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
                <CartListProducts 
                  cartProducts={cartProducts} 
                  minusOne={minusOne} 
                  plusOne={plusOne} 
                  handleRemove={handleRemove} 
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <CartKitSummary totalCartPrice={totalCartPrice} />
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </div>
  )
}

export default CartPage

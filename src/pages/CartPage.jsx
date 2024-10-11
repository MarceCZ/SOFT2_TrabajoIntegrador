import React, { useContext } from 'react'
import { Box, Grid, Toolbar, Typography } from '@mui/material'
import { CartContext } from '../components/CartContext'
import Header from '../components/Header'
import EmptyCart from '../components/CartPage/EmptyCart'
import CartListProducts from '../components/CartPage/CartListProducts'
import CartKitSummary from '../components/CartPage/CartKitSummary'

const CartPage = () => {
  const { cartProducts, removeFromCart, addToCart, totalCartPrice } = useContext(CartContext);

  const handleRemove = (product) => {
    removeFromCart(product);
  }

  const minusOne = (product) => {
    if (product.cantidad > 1) {
      addToCart(product, -1);
    } else {
      removeFromCart(product);
    }
  }

  const plusOne = (product) => {
    addToCart(product, 1);
  }

  return (
    <div>
      <Header />
      <Toolbar />
      <Box sx={{ padding: { xs: '10px', sm: '20px' } }}>
        {cartProducts.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <Typography variant="h6" sx={{ mb: 2, ml: 1, fontWeight: 'bold', fontSize: { xs: '18px', md: '24px' } }}>
              Mi kit ({cartProducts.length})
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={9}>
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

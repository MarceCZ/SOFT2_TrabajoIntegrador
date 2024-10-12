import React from 'react'
import { Box, List } from '@mui/material'
import CartProductItem from './CartProductItem'
import CartActions from './CartActions'

const CartDrawerWithProducts = ({ cartProducts, handleRemove, totalCartPrice, navigate }) => (
  <>
    <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, maxHeight: '450px' }}>
      <List sx={{ mt: -1 }}>
        {cartProducts.map((item) => (
          <CartProductItem key={item.id} item={item} handleRemove={handleRemove} />
        ))}
      </List>
    </Box>
    <CartActions totalCartPrice={totalCartPrice} navigate={navigate} />
  </>
)

export default CartDrawerWithProducts

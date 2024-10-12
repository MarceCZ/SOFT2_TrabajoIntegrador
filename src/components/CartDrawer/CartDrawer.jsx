import React, { useContext } from 'react';
import { Drawer, Box, Divider } from '@mui/material';
import { CartContext } from '../CartContext';
import CartContent from './CartContent';
import useRedirectOnResize from '../../hooks/useRedirectOnResize';
import useRemoveFromCart from '../../hooks/useRemoveFromCart';
import CartHeader from './CartHeader';

const CartDrawer = ({ isOpen, toggleDrawer }) => {
  const { cartProducts, totalCartPrice } = useContext(CartContext);
  const { handleRemove } = useRemoveFromCart();

  useRedirectOnResize(isOpen, toggleDrawer);

  return (
    <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 450, display: 'flex', flexDirection: 'column', height: '100%', paddingLeft: '10px', paddingRight: '10px' }}>
        <CartHeader />
        <Divider />
        <CartContent cartProducts={cartProducts} handleRemove={handleRemove} totalCartPrice={totalCartPrice} />
      </Box>
    </Drawer>
  )
}

export default CartDrawer

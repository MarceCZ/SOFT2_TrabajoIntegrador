import React, { useContext } from 'react'
import { Drawer, Box, Typography, Divider } from '@mui/material'
import { CartContext } from '../CartContext'
import { useNavigate } from 'react-router-dom'
import EmptyCartDrawer from './EmptyCartDrawer'
import CartDrawerWithProducts from './CartDrawerWithProducts'

const CartDrawer = ({ isOpen, toggleDrawer }) => {
  const { cartProducts, removeFromCart, totalCartPrice } = useContext(CartContext);
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
        
        <Box sx={{ paddingTop: 1, paddingLeft: 2, display: 'flex', alignItems: 'center', mb: 1}}>
          <img 
            src="https://cdn-icons-png.freepik.com/512/8861/8861108.png" 
            alt="Mi kit" 
            style={{ width: 40, height: 40, marginRight: 15 }} 
          />  
          <Typography variant="h6" sx={{ mb: 0, fontWeight: 'bold' }}> 
            Mi kit
          </Typography>
        </Box>
        
        <Divider/>
        
        {cartProducts.length === 0 ? (
          <EmptyCartDrawer /> 
        ) : (
          <CartDrawerWithProducts 
            cartProducts={cartProducts} 
            handleRemove={handleRemove} 
            totalCartPrice={totalCartPrice} 
            navigate={navigate} 
          /> 
        )}
      </Box>
    </Drawer>
  )
}

export default CartDrawer

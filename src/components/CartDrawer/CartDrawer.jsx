import React, { useContext, useEffect } from 'react';
import { Drawer, Box, Typography, Divider } from '@mui/material';
import { CartContext } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import EmptyCartDrawer from './EmptyCartDrawer';
import CartDrawerWithProducts from './CartDrawerWithProducts';

const CartDrawer = ({ isOpen, toggleDrawer }) => {
  const { cartProducts, removeFromCart, totalCartPrice } = useContext(CartContext);
  const navigate = useNavigate();

  // Manejar la eliminación de productos del carrito
  const handleRemove = (product) => {
    removeFromCart(product);
  };

  // Detectar el cambio en el tamaño de la ventana y redirigir si es pequeño
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600 && isOpen) {
        navigate('/cart');  // Redirige a la página del carrito
        toggleDrawer(false); // Cierra el Drawer
      }
    };

    // Agrega el event listener cuando se monta el componente
    window.addEventListener('resize', handleResize);

    // Llama al handler de inmediato para verificar el tamaño inicial
    handleResize();

    // Limpia el event listener cuando se desmonta el componente
    return () => {
      window.removeEventListener('resize', handleResize)
    };
  }, [isOpen, navigate, toggleDrawer])

  return (
    <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
      <Box sx={{ 
        width: 450,  // El ancho del Drawer cuando no se redirige
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

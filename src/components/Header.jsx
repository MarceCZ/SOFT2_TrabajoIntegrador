import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import { CartContext } from './CartContext';
import CartDrawer from './CartDrawer/CartDrawer';
import MedicalServicesRoundedIcon from '@mui/icons-material/MedicalServicesRounded';
import { useLocation, useNavigate } from 'react-router-dom'; 

const Header = () => {
  const { totalProducts } = useContext(CartContext);
  const [hideCart, setHideCart] = useState(false);
  const navigate = useNavigate()

  const toggleDrawer = (open) => (event) => {
    setHideCart(open)
  }

  const location = useLocation(); 
  const isCartPage = location.pathname === '/cart' || location.pathname === '/checkout'

  const handleTitleClick = () => {
    navigate('/')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1b986e' }}>
        <Toolbar>
          <Typography 
            variant="h5" 
            onClick={handleTitleClick}
            sx={{ 
              flexGrow: 1, 
              cursor: 'pointer',
              fontWeight: 'bold'}} >
            MediPlan
          </Typography>

          {/* Mostrar ícono de carrito con cantidad de productos únicos */}
          {!isCartPage && (
            <IconButton 
              color="inherit" 
              onClick={toggleDrawer(true)}>
              <MedicalServicesRoundedIcon />
              <Typography 
                variant="body2" 
                sx={{ marginLeft: '8px' }}>
                {totalProducts} 
              </Typography>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <CartDrawer isOpen={hideCart} toggleDrawer={toggleDrawer} />
    </Box>
  )
}

export default Header

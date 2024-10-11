import React, { useContext, useState } from 'react';
import Logo from '../assets/logo.png'
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import { CartContext } from './CartContext';
import CartDrawer from './CartDrawer/CartDrawer';
import MedicalServicesRoundedIcon from '@mui/icons-material/MedicalServicesRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
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
      <AppBar position="fixed" sx={{ backgroundColor: '#ffffff', color: '#1b986e' }}>
        <Toolbar>
          <Box
            onClick={handleTitleClick}
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginRight: 'auto' }}
          >
            <img src={Logo} style={{ height: '40px', width: 'auto', marginRight: '10px' }} alt="Logo" />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                fontFamily: 'Gontserrat, sans-serif',
              }}
            >
              MediPlan+
            </Typography>
          </Box>


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
          {/* Se implementará en el siguiente sprint */}
          <IconButton
            color="inherit"
            //onClick={() => navigate('/account')}
            sx={{ marginLeft: '16px' }}>
            <PersonRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <CartDrawer isOpen={hideCart} toggleDrawer={toggleDrawer} />
    </Box>
  )
}

export default Header

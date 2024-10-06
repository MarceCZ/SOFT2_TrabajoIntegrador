import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import { CartContext } from './CartContext';
import CartDrawer from './CartDrawer';
import MedicalServicesRoundedIcon from '@mui/icons-material/MedicalServicesRounded';
import { useLocation, useNavigate } from 'react-router-dom'; 

const Header = () => {
  const { totalProducts } = useContext(CartContext);
  const [isCartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate()

  const toggleDrawer = (open) => (event) => {
    setCartOpen(open)
  }

  const location = useLocation(); 
  const isCartPage = location.pathname === '/cart'

  const handleTitleClick = () => {
    navigate('/')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography 
            variant="h6" 
            onClick={handleTitleClick}
            sx={{ 
              flexGrow: 1, 
              cursor: 'pointer' }} >
            MediPlan
          </Typography>

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
      <CartDrawer isOpen={isCartOpen} toggleDrawer={toggleDrawer} />
    </Box>
  )
}

export default Header

import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import { CartContext } from './CartContext';
import CartDrawer from './CartDrawer';
import MedicalServicesRoundedIcon from '@mui/icons-material/MedicalServicesRounded';
import { useLocation, useNavigate } from 'react-router-dom'; 

const Header = () => {
  const { totalUniqueItems } = useContext(CartContext);
  const [isCartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate()

  const toggleDrawer = (open) => (event) => {
    setCartOpen(open)
  };

  const location = useLocation(); 
  const isCartPage = location.pathname === '/cart'

  const handleTitleClick = () => {
    navigate('/')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={handleTitleClick}>
            MediPlan
          </Typography>

          {!isCartPage && (
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MedicalServicesRoundedIcon />
              <Typography variant="body2" sx={{ marginLeft: '8px' }}>
                {totalUniqueItems} 
              </Typography>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <CartDrawer isOpen={isCartOpen} toggleDrawer={toggleDrawer} />
    </Box>
  );
};

export default Header;

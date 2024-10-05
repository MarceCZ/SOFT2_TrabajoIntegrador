import React, { useContext, useState } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material'
import { CartContext } from './CartContext'
import CartDrawer from './CartDrawer'
import MedicalServicesRoundedIcon from '@mui/icons-material/MedicalServicesRounded';

const Header = () => {
  const { totalUniqueItems } = useContext(CartContext);
  const [isCartOpen, setCartOpen] = useState(false)

  const toggleDrawer = (open) => (event) => {
    setCartOpen(open);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MediPlan
          </Typography>

          {/* Mostrar ícono de carrito con cantidad de productos únicos */}
          <IconButton color="inherit" onClick={toggleDrawer(true)}>
            <MedicalServicesRoundedIcon />
            <Typography variant="body2" sx={{ marginLeft: '8px' }}>
              {totalUniqueItems}  {/* Mostramos el número de productos únicos */}
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <CartDrawer isOpen={isCartOpen} toggleDrawer={toggleDrawer} />
    </Box>
  );
};

export default Header;

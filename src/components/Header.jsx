import React, { useContext, useState } from 'react';
import Logo from '../assets/logo.png';
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { CartContext } from './CartContext';
import CartDrawer from './CartDrawer/CartDrawer';
import MedicalServicesRoundedIcon from '@mui/icons-material/MedicalServicesRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import MenuIcon from '@mui/icons-material/Menu'; // Importación correcta
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {
  const { totalProducts } = useContext(CartContext);
  const [hideCart, setHideCart] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleCartDrawer = (open) => (event) => {
    setHideCart(open);
  };

  const toggleMenuDrawer = (open) => (event) => {
    setIsDrawerOpen(open);
  };

  const location = useLocation();
  const isCartPage = location.pathname === '/cart' || location.pathname === '/checkout';

  const handleTitleClick = () => {
    navigate('/');
  };

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

          {/* Menú responsive */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <IconButton color="inherit" onClick={toggleMenuDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Nav responsive */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, flexGrow: 1, pl: '15px' }}>
            <Button color="inherit" component={Link} to="/como-funciona" sx={{ color: '#000' }}>
              ¿Cómo funciona?
            </Button>
            <Button color="inherit" component={Link} to="/arma-tu-kit" sx={{ color: '#000' }}>
              Arma tu kit
            </Button>
          </Box>

          {/* Iconos responsive */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {!isCartPage && (
              <IconButton color="inherit" onClick={toggleCartDrawer(true)}>
                <MedicalServicesRoundedIcon />
                <Typography variant="body2" sx={{ marginLeft: '8px' }}>
                  {totalProducts}
                </Typography>
              </IconButton>
            )}
            <IconButton color="inherit" sx={{ marginLeft: '16px' }}>
              <PersonRoundedIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer para el carrito */}
      <CartDrawer isOpen={hideCart} toggleDrawer={toggleCartDrawer} />

      {/* Drawer para el menú*/}
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleMenuDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleMenuDrawer(false)}
          onKeyDown={toggleMenuDrawer(false)}
        >
          <List>
            <ListItem button component={Link} to="/como-funciona">
              <ListItemText primary="¿Cómo funciona?" sx={{ color: '#000' }} />
            </ListItem>
            <ListItem button component={Link} to="/arma-tu-kit">
              <ListItemText primary="Arma tu kit" sx={{ color: '#000' }}/>
            </ListItem>
            <ListItem button component={Link} to="/cart">
              <MedicalServicesRoundedIcon sx={{ marginRight: 1 ,color: '#000' }} />
              <ListItemText primary="Mi kit" sx={{ color: '#000' }}/>
            </ListItem>
            <ListItem button>
              <PersonRoundedIcon sx={{ marginRight: 1 ,color: '#000' }} />
              <ListItemText primary="Mi cuenta" sx={{ color: '#000' }}/>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;


import React, { useState, useEffect } from 'react';
import Logo from '../assets/logo.png';
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import CartDrawer from './CartDrawer/CartDrawer';
import UserDrawer from './UserDrawer/UserDrawer.jsx';
import MenuIcon from '@mui/icons-material/Menu';
import MedicalServicesRoundedIcon from '@mui/icons-material/MedicalServicesRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useCartDrawer from '../hooks/header/useCartDrawer.jsx';
import useMenuDrawer from '../hooks/header/useMenuDrawer.jsx';
import useUserDrawer from '../hooks/header/useUserDrawer.jsx';
import { useAuth } from './AuthContext'; 

const Header = () => {
  const { isCartDrawerOpen, toggleCartDrawer, totalProducts } = useCartDrawer();
  const { isMenuDrawerOpen, toggleMenuDrawer } = useMenuDrawer();
  const {isUserDrawerOpen, toggleUserDrawer} = useUserDrawer();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const location = useLocation();
  const isCartPage = location.pathname === '/cart' || location.pathname === '/checkout';

  const handleTitleClick = () => {
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toggleMenuDrawer(false)();
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

          {/* Iconos del carrito y usuario dentro del header */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {!isCartPage && (
              <IconButton color="inherit" onClick={toggleCartDrawer(true)}>
                <MedicalServicesRoundedIcon />
                <Typography variant="body2" sx={{ marginLeft: '8px' }}>
                  {totalProducts}
                </Typography>
              </IconButton>
            )}
            <IconButton color="inherit" sx={{ marginLeft: '16px' }} onClick={toggleUserDrawer(true)}>
              <PersonRoundedIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer para el carrito */}
      <CartDrawer isOpen={isCartDrawerOpen} toggleDrawer={toggleCartDrawer} />

      {/* Drawer para el menú responsive */}
      <Drawer anchor="right" open={isMenuDrawerOpen} onClose={toggleMenuDrawer(false)}>
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
              <ListItemText primary="Arma tu kit" sx={{ color: '#000' }} />
            </ListItem>
            {!isCartPage && (
              <ListItem button component={Link} to="/cart">
                <MedicalServicesRoundedIcon sx={{ marginRight: 1, color: '#000' }} />
                <ListItemText primary="Mi kit" sx={{ color: '#000' }} />
              </ListItem>
            )}
          </List>
          <Divider />
          <List>
            {isAuthenticated ? (
              <>
                <ListItem button component={Link} to="/perfil">
                  <PersonRoundedIcon sx={{ marginRight: 1, color: '#000' }} />
                  <ListItemText primary="Mi cuenta" sx={{ color: '#000' }} />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                  <ListItemText primary="Cerrar sesión" sx={{ color: '#000' }} />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem button component={Link} to="/login">
                  <ListItemText primary="Ingresar" sx={{ color: '#000' }} />
                </ListItem>
                <ListItem button component={Link} to="/signin">
                  <ListItemText primary="Registrarse" sx={{ color: '#000' }} />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>

      {/* Drawer para el usuario */}
      <UserDrawer isOpen={isUserDrawerOpen} toggleDrawer={toggleUserDrawer} isAuthenticated={isAuthenticated}  />
      

    </Box>
  );
};

export default Header;

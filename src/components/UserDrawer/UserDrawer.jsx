import React, { useContext } from 'react';
import { Drawer, Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth  } from '../AuthContext';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

const UserDrawer = ({ isOpen, toggleDrawer}) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleMenuClose = () => {
    toggleDrawer(false)();
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={handleMenuClose}>
      <Box
        sx={{ width: 250, display: 'flex', flexDirection: 'column', padding: 2 }}
        role="presentation"
        onClick={handleMenuClose}
        onKeyDown={handleMenuClose}
      >
        <List>
          {isAuthenticated ? (
            <>
              <ListItem button onClick={() => navigate('/mi-perfil')}>
                <PersonRoundedIcon sx={{ marginRight: 1, color: '#000' }} />
                <ListItemText primary="Mi perfil" />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Cerrar sesión" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button onClick={() => navigate('/login')}>
                <ListItemText primary="Ingresar" />
              </ListItem>
              <ListItem button onClick={() => navigate('/signin')}>
                <ListItemText primary="Registrarse" />
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default UserDrawer;

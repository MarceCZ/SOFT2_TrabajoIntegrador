import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const BusinessHeader = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenuDrawer = (open) => (event) => {
    setIsDrawerOpen(open);
  };

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
            <Button color="inherit" component={Link} to="/productsbusiness" sx={{ color: '#000' }}>
              PRODUCTOS
            </Button>
            <Button color="inherit" component={Link} to="/metricsbusiness" sx={{ color: '#000' }}>
              MÉTRICAS
            </Button>
          </Box>

          {/* Iconos responsive */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <IconButton color="inherit" sx={{ marginLeft: '16px' }} onClick={toggleMenuDrawer(true)}>
              <PersonRoundedIcon /> 
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer para el menú */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleMenuDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleMenuDrawer(false)}
          onKeyDown={toggleMenuDrawer(false)}
        >
          <List>
            <ListItem button component={Link} to="/productsbusiness">
              <ListItemText primary="PRODUCTOS" sx={{ color: '#000' }} />
            </ListItem>
            <ListItem button component={Link} to="/metricsbusiness">
              <ListItemText primary="MÉTRICAS" sx={{ color: '#000' }} />
            </ListItem>
            <ListItem button>
              <PersonRoundedIcon sx={{ marginRight: 1, color: '#000' }} />
              <ListItemText primary="Mi cuenta" sx={{ color: '#000' }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default BusinessHeader;
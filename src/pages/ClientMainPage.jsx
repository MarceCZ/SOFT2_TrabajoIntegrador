import React, { useState } from 'react';
import Header from '../components/Header';
import ProductoBody from '../components/ProductoBody';
import BoticaBody from '../components/BoticaBody';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import data from '../data/data.json';
import { Box, Container, IconButton } from '@mui/material';
import FilterDrawer from '../components/FilterDrawer';
import FilterListIcon from '@mui/icons-material/FilterList';


const ClientMainPage = () => {

  const [view, setView] = useState('productos');
  const productosData = data.productos;
  const boticasData = data.boticas;

  const [isFilterOpen, setFilterOpen] = useState(false);

  const toggleFilterDrawer = (open) => (event) => {
    setFilterOpen(open);
  };

  return (
    <div>
      <Header />
      <Container sx={{ display: 'flex', flexDirection: 'column', mt: '30px', mb: '50px', alignItems: 'center' }}>
        <h1 style={{ textAlign: "center" }}>Comienza a armar tu kit</h1>

        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={toggleFilterDrawer(true)} >
            <FilterListIcon />
          </IconButton>
          <ButtonGroup variant="outlined" aria-label="Basic button group" sx={{ justifyContent: "center", paddingX: 5 }}>
            <Button
            onClick={() => setView('productos')} 
            variant={view === 'productos' ? 'contained' : 'outlined'}
            sx={{
              backgroundColor: view === 'productos' ? '#1b986e' : 'transparent',
              color: view === 'productos' ? '#fff' : '#1b986e',
              borderColor: '#1b986e',
              '&:hover': {
                backgroundColor: view === 'productos' ? '#157f59' : '#e6f7f1',
                borderColor: '#157f59',
              }
            }}
            >
              Ver productos</Button>
            <Button
            onClick={() => setView('tiendas')} 
            variant={view === 'tiendas' ? 'contained' : 'outlined'}
            
            sx={{
              backgroundColor: view === 'tiendas' ? '#1b986e' : 'transparent',
              color: view === 'tiendas' ? '#fff' : '#1b986e',
              borderColor: '#1b986e',
              '&:hover': {
                backgroundColor: view === 'tiendas' ? '#157f59' : '#e6f7f1',
                borderColor: '#157f59',
              }
            }}>
              Ver tiendas</Button>
          </ButtonGroup>
          <Box sx={{ width: '40px' }} /> 
        </Box>

      </Container>
      <Container>
        {view === 'productos' ? (
          <ProductoBody productosData={productosData} />
        ) : (
            <BoticaBody boticasData={boticasData} />
          )
        }
      </Container>
      <FilterDrawer isOpen={isFilterOpen} toggleDrawer={toggleFilterDrawer} />
    </div>
  )

};


export default ClientMainPage 
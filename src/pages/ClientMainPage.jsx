import React, { useState } from 'react';
import Header from '../components/Header';
import ProductoBody from '../components/ProductoBody';
import BoticaBody from '../components/BoticaBody';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import data from '../data/data.json';
import { Container } from '@mui/material';

const ClientMainPage = () => {

  const [view, setView] = useState('productos');
  const productosData = data.productos;
  const boticasData = data.boticas;

  return (
    <div>
      <Header></Header>
      <Container sx={{display: 'flex', flexDirection: 'column', mt: '30px', mb: '50px'}}>
      <h1 style={{ textAlign: "center" }}>Comienza a armar tu kit</h1>
        <ButtonGroup variant="outlined" aria-label="Basic button group" sx={{ justifyContent: "center" }}>
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
      </Container>
      <Container>
        {view === 'productos' ? (
          <ProductoBody productosData={productosData} />
        ) : (
            <BoticaBody boticasData={boticasData} />
          )
        }
      </Container>
    </div>
  )
}

export default ClientMainPage 
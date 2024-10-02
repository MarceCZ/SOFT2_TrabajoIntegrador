import Header from '../components/Header';
import productosData from '../data/data.json'; // Este es el JSON que contiene los datos
import { Container, Box } from '@mui/material';
import * as React from 'react';
import Button from '@mui/material/Button';
import TablaProductos from '../components/TablaProducto'; // Importamos el componente de la tabla

const BusinessMainPage = () => {
  
  const productos = productosData.productos;

  return (
    <div>
      <Header />
      <Container sx={{ display: 'flex', flexDirection: 'column', mt: '30px', mb: '50px' }}>
        <h1 style={{ textAlign: 'center' }}>Mifarma</h1>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: '20px' }}>
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button>Agregar Producto</Button>
          </ButtonGroup>
        </Box>
        <TablaProductos productos={productos} /> {/* Se pasa la variable de estado al componente TablaProductos */}
      </Container>
    </div>
  );
};

export default BusinessMainPage;
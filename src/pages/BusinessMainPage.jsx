import Header from '../components/Header';
import productosData from '../data/data.json'; // Este es el JSON que contiene los datos
import { Container } from '@mui/material';
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
        <TablaProductos productos={productos} /> {/* Se pasa la variable de estado al componente TablaProductos */}
        <Button>Agregar Productos</Button>
      </Container>
    </div>
  );
};

export default BusinessMainPage;
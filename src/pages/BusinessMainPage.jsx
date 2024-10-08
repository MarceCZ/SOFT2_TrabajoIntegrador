import Header from '../components/Header';
//import productosData from '../data/data.json'; // Este es el JSON que contiene los datos
import { Container, Box, ButtonGroup } from '@mui/material';
import * as React from 'react';
import Button from '@mui/material/Button';
import TablaProductos from '../components/TablaProducto'; // Importamos el componente de la tabla
import { useState, useEffect } from 'react';
import productosData from '../data/data.json';

import FormDialog from '../components/FormDialog';

import productoApi from '../api/producto';




const BusinessMainPage = () => {
  const [open, setOpen] = useState(false);
    
  const [productos, setProductos] = useState([]);
  const nombreBotica = productosData.boticas[0];

  useEffect(() => {
    handleOnLoad();
  }, []);

  const handleOnLoad = async () => {
    try {
      const productosData = await productoApi.findAll();
      setProductos(productosData);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    handleOnLoad();
  };


  return (
    <div>
      <Header />
      <Container sx={{ display: 'flex', flexDirection: 'column', mt: '30px', mb: '50px' }}>
        <h1 style={{ textAlign: 'center' }}>{nombreBotica}</h1>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: '20px' }}>
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button  onClick={handleClickOpen}>Agregar Producto</Button>
          </ButtonGroup>
          <FormDialog open={open} handleClose={handleClose} />
        </Box>
        <TablaProductos productos={productos} /> {/* Se pasa la variable de estado al componente TablaProductos */}
      </Container>
    </div>
  );
};

export default BusinessMainPage;
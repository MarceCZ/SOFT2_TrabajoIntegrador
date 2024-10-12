import BusinessHeader from '../components/BusinessHeader';
//import productosData from '../data/data.json'; // Este es el JSON que contiene los datos
import { Container, Box, ButtonGroup, Toolbar } from '@mui/material';
import * as React from 'react';
import Button from '@mui/material/Button';
import TablaProductos from '../components/TablaProducto'; // Importamos el componente de la tabla
import { useState, useEffect } from 'react';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog';
import data from '../data/data.json';
import FormDialog from '../components/FormDialog';

import productoApi from '../api/producto';
import boticaApi from '../api/botica';

const BusinessProductsPage = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState(null);
  const [productos, setProductos] = useState([]);
  const [nombreBotica, setNombreBotica] = useState('');
  const [idBotica, setIdBotica] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    handleOnLoad();
  }, []);

  
    const handleOnLoad = async () => {
      try {
        const botica = await boticaApi.findOneComplete(idBotica);
        setNombreBotica(botica.nombre);
        setProductos(botica.productos);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }

    const handleDeleteClick = (id) => {
      setDeleteDialogOpen(true);
      setProductId(id);
    };

    const handleDeleteConfirm = async () => {
      try {
        console.log('Deleting product with id: ', productId);
        await productoApi.remove(productId);
        setDeleteDialogOpen(false);
        setProductId(null);
        handleOnLoad();
      } catch (error) {
        console.error('Error deleting product: ', error);
      }
    };

    const handleDeleteCancel = () => {
      setDeleteDialogOpen(false);
      setProductId(null);
    };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    handleOnLoad();
  };


  return (
    <div style={{ margin: '100px auto 0' }}>
      <BusinessHeader />
      <Container sx={{ display: 'flex', flexDirection: 'column', mt: '30px', mb: '50px' }}>
        <h1 style={{ textAlign: 'center' }}>{nombreBotica}</h1>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: '20px' }}>
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button  onClick={handleClickOpen}sx={{ mt: 2, borderColor: '#1b986e', color: '#1b986e' }}
              >Agregar Producto</Button>
          </ButtonGroup>
          <FormDialog open={open} handleClose={handleClose} idBotica={idBotica}/>
        </Box>
        <TablaProductos productos={productos} onDeleteClick={handleDeleteClick}/> {/* Se pasa la variable de estado al componente TablaProductos */}
        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      </Container>
    </div>
  );
};

export default BusinessProductsPage;
import BusinessHeader from '../components/BusinessHeader';
import { Container, Box, Typography} from '@mui/material';
import * as React from 'react';
import Button from '@mui/material/Button';
import TablaProductos from '../components/ProductTable/TablaProducto';
import TablaReceta from '../components/RecetaTable/TablaReceta';
import { useState, useEffect } from 'react';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog';
import FormDialog from '../components/FormDialog';
import productoApi from '../api/producto';
import boticaApi from '../api/botica';
import recetaApi from '../api/receta';
import FormDialogStock from '../components/FormDialogStock';

const BusinessRecetasPage = () => {
  const [recetas, setRecetas] = useState([]);
  const [nombreBotica, setNombreBotica] = useState('');
  const [idBotica, setIdBotica] = useState(1);

  useEffect(() => {
    handleOnLoad();
  }, []);

  
    const handleOnLoad = async () => {
      try {
        const botica = await boticaApi.findOne(idBotica);
        setNombreBotica(botica.nombre);
        const recetas = await recetaApi.findAllCompleteXBotica(idBotica);
        setRecetas(recetas);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }


  return (
    <div style={{ margin: '100px auto 0' }}>
      <BusinessHeader />
      <Box
        sx={{
          backgroundColor: '#1b986e',
          height: '150px',
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',        
          justifyContent: 'center',
          color: '#fff',
          margin: '0 auto',
          borderRadius: '40px',
        }}
      ><Typography variant="h3" sx={{ textAlign: 'center', margin: 0 }}>
        Recetas
      </Typography>
      <Typography variant="h4" sx={{ textAlign: 'center', margin: 0 }}>
        {nombreBotica}
      </Typography>
      </Box> 
      <Container sx={{ display: 'flex', flexDirection: 'column', mt: '30px', mb: '50px' }}>
        
        <TablaReceta recetas={recetas}/>
        
      </Container>
    </div>
  );
};

export default BusinessRecetasPage;
import BusinessHeader from '../components/BusinessHeader';
import { Container,Box, Grid, Toolbar } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MetricCard from '../components/MetricCard';
import boticaApi from '../api/botica';

const BusinessMetricsPage = () => {

  const [nombreBotica, setNombreBotica] = useState('');
  const [idBotica, setIdBotica] = useState(1);

  const ingresoMensual = 500000;
  const productosVendidos = 150;

  useEffect(() => {
    handleOnLoad();
  }, []);

    const handleOnLoad = async () => {
      try {
        const botica = await boticaApi.findOneComplete(idBotica);
        setNombreBotica(botica.nombre);
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
      ><h1 style={{ textAlign: 'center', margin: 0}}>Métricas</h1 >
      <h4 style={{ textAlign: 'center', margin: 0}}>{nombreBotica}</h4 >
      </Box> 
      <Toolbar/>
        <Container sx={{ display: 'flex', flexDirection: 'column', mt: '30px', mb: '50px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <MetricCard 
                title="Ingresos Mensuales" 
                icon={MonetizationOnIcon} 
                value={ingresoMensual} 
                unit="S/" 
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MetricCard 
                title="Productos Vendidos" 
                icon={ShoppingCartIcon} 
                value={productosVendidos} 
                unit="unidades" 
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
}

export default BusinessMetricsPage;
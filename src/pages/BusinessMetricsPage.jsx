import BusinessHeader from '../components/BusinessHeader';
//import productosData from '../data/data.json'; // Este es el JSON que contiene los datos
import { Container, Box, ButtonGroup, Toolbar } from '@mui/material';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import * as React from 'react';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

//import productoApi from '../api/producto';
import boticaApi from '../api/botica';

const BusinessMetricsPage = () => {

  const [nombreBotica, setNombreBotica] = useState('');
  const [idBotica, setIdBotica] = useState(1);

  const monthlyRevenue = 500000;
  const productsSold = 150;

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
    <div>
      <BusinessHeader />
      <Toolbar />
      <Container sx={{ display: 'flex', flexDirection: 'column', mt: '30px', mb: '50px' }}>
        <h1 style={{ textAlign: 'center' }}>{nombreBotica}</h1>
        <Grid container spacing={3}>
          {/* Tarjeta de ingresos mensuales */}
          <Grid item xs={12} md={6}>
            <Card sx={{ display: 'flex', alignItems: 'center', padding: '20px', backgroundColor: '#ffffff' }}>
              <MonetizationOnIcon sx={{ fontSize: 50, color: '#4caf50', marginRight: '20px' }} />
              <CardContent>
                <Typography variant="h5" component="div">
                  Ingresos Mensuales
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  S/ {monthlyRevenue.toLocaleString()} {/* Da formato con comas */}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Tarjeta de productos vendidos */}
          <Grid item xs={12} md={6}>
            <Card sx={{ display: 'flex', alignItems: 'center', padding: '20px', backgroundColor: '#ffffff' }}>
              <ShoppingCartIcon sx={{ fontSize: 50, color: '#4caf50', marginRight: '20px' }} />
              <CardContent>
                <Typography variant="h5" component="div">
                  Productos Vendidos
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {productsSold.toLocaleString()} unidades
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default BusinessMetricsPage;
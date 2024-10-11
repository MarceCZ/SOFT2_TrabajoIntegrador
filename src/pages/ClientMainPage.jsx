import React, { useState } from 'react';
import Header from '../components/Header';
import { Box, Container, Typography } from '@mui/material';



const ClientMainPage = () => {

  return (
    <div style={{ margin: '100px auto 0' }}>
      <Header />
      <Box
        sx={{
          backgroundColor: '#1b986e',
          height: '400px',
          width: '95%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: {xs:'center', md:'flex-start' },
          color: '#fff',
          textAlign: {xs:'center', md:'left'},
          margin: '0 auto',
          borderRadius: '40px',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', md: '80%' },
            padding: '50px', 
          }}
        >
          <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: { xs: '2.5rem', md: '3.8rem' }, pb: '15px' }}>
            ¡Bienvenido a MediPlan+!
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'normal', fontSize: { xs: '1.5rem', md: '2rem' } }}>
            Tu salud a un click de distancia
          </Typography>
        </Box>
      </Box>
      <Container sx={{ display: 'flex', flexDirection: 'column', mt: '40px', mb: '60px', alignItems: 'center' }}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', textAlign: "center", fontSize: '2.2rem', pb: '12px' }}>
          Comienza a armar tu kit
        </Typography>

        </Container>
    </div>
  )

};


export default ClientMainPage 
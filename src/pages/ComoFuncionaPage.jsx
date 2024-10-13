import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Header from '../components/Header';
import CallToAction from '../components/CallToAction.jsx';
import PasoCard from '../components/ComoFuncionaPage/PasoCard.jsx';
import pasosData from '../data/pasos.js';

const ComoFuncionaPage = () => {
    return (
        <div style={{ margin: '100px auto 0' }}>
            <Header />
            <Box
                sx={{
                    backgroundColor: '#1b986e',
                    height: '220px',
                    width: '95%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    textAlign: 'center',
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
                    <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: { xs: '2rem', md: '3.2rem' }, pb: '15px' }}>
                        ¿Cómo funciona MediPlan+?
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'normal', fontSize: { xs: '1rem', md: '1.4rem' } }}>
                        Arma tu kit • Suscríbete • Recibe tu kit • Deja las preocupaciones
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ margin: { md: '5% 10%', xs: '10% 20%' } }}>
                <Grid container spacing={4}>
                    {pasosData.map((paso, index) => (
                        <PasoCard
                            key={index}
                            imageUrl={paso.imageUrl}
                            title={paso.title}
                            body={paso.body}
                        />
                    ))}
                </Grid>
            </Box>

            <CallToAction />
        </div>
    );
};

export default ComoFuncionaPage;

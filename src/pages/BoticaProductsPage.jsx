import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Grid, Paper, Typography, Button, useMediaQuery, Divider } from '@mui/material';
import FilterDrawer from '../components/FilterDrawer';
import FilterDrawerMini from '../components/FilterDrawerMini';
import data from '../data/data.json';
import Header from '../components/Header';
import ProductoBody from '../components/ProductoBody';

const BoticaProductsPage = () => {
    const { botica } = useParams();  // Obtener el nombre de la botica desde la URL
    const decodedBotica = decodeURIComponent(botica.replace(/-/g, ' '));

    const productosDeBotica = data.productos.filter(producto => producto.botica.toLowerCase() === decodedBotica.toLowerCase());

    const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);
    const boticasDisponibles = [...new Set(productosDeBotica.map(product => product.botica))];
    const marcasDisponibles = [...new Set(productosDeBotica.map(product => product.marca))];

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const toggleFilterDrawer = () => {
        setFilterDrawerOpen((prev) => !prev);
    };

    return (
        <div style={{ margin: '50px auto 0' }}>
            <Header />
            <Box sx={{ padding: 4, maxWidth: '100%', backgroundColor: '#f2f2f2', minHeight: '84.5vh', margin: 'auto', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                
                <Box sx={{ marginBottom: 2, textAlign: 'left', ml:{md:'3%'}}}>
                    <Button
                        component={Link}
                        to="/arma-tu-kit"
                        sx={{
                            color: '#1b986e',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            textDecoration: 'underline',
                        }}
                    >
                        ← Volver
                    </Button>
                </Box>

                <Box sx={{ maxWidth: '2000px', margin: 'auto' }}>
                    <Grid container spacing={4}>
                        {!isSmallScreen && (
                            <Grid item xs={12} md={4}>
                                <Paper elevation={3} sx={{ padding: 3, borderRadius: '20px', backgroundColor: '#fff' }}>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', textTransform: 'capitalize', marginBottom: 2 }}>
                                        Filtros
                                    </Typography>
                                    <Divider sx={{ marginBottom: 2 }} />
                                    <FilterDrawer 
                                        boticasDisponibles={boticasDisponibles} 
                                        marcasDisponibles={marcasDisponibles}
                                    />
                                </Paper>
                            </Grid>
                        )}

                        <Grid item xs={12} md={8}> 
                            <Paper elevation={3} sx={{ padding: 4, borderRadius: '20px', backgroundColor: '#fff' }}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 1, textTransform: 'capitalize' }}>
                                    {decodedBotica}
                                </Typography>
                                <Divider sx={{ marginBottom: 4 }} />

                                {/* Lista de productos */}
                                <Box sx={{ marginTop: 4 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                                        Productos disponibles
                                    </Typography>
                                    <ProductoBody productosData={productosDeBotica}/>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>

                    {isSmallScreen && (
                        <FilterDrawerMini 
                            isOpen={isFilterDrawerOpen} 
                            toggleDrawer={toggleFilterDrawer} 
                            boticasDisponibles={boticasDisponibles} 
                            marcasDisponibles={marcasDisponibles}
                        />
                    )}
                </Box>
            </Box>
        </div>
    );
};

export default BoticaProductsPage;



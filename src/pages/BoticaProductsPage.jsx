import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Paper, Typography, Button, useMediaQuery, Divider, IconButton } from '@mui/material';
import FilterDrawer from '../components/FilterDrawer';
import FilterDrawerMini from '../components/FilterDrawerMini';
import FilterListIcon from '@mui/icons-material/FilterList'; 
import Header from '../components/Header';
import ProductoBody from '../components/ProductoBody';
import useBoticaProducts from '../hooks/useBoticaProducts';

const BoticaProductsPage = () => {
    const {
        productosDeBotica,
        boticasDisponibles,
        marcasDisponibles,
        isFilterDrawerOpen,
        toggleFilterDrawer,
        decodedBotica
    } = useBoticaProducts();

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));

    return (
        <div>
            <Header />
            <Box sx={{ padding: 4, maxWidth: '100%', backgroundColor: '#f2f2f2', minHeight: '84.5vh', margin: '50px auto', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>

                <Box sx={{ marginBottom: 2, textAlign: 'left', ml: { md: '3%' } }}>
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

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: { md: 0, lg: 3 },
                        maxWidth: '80%',
                        margin: 'auto'
                    }}
                >
                    {!isSmallScreen && (
                        <Paper elevation={3} sx={{ padding: 2, minWidth: '25%', borderRadius: '20px', backgroundColor: '#fff' }}>
                            <FilterDrawer
                                boticasDisponibles={boticasDisponibles}
                                marcasDisponibles={marcasDisponibles}
                                decodedBotica={decodedBotica}
                            />
                        </Paper>
                    )}

                    <Paper
                        elevation={3}
                        sx={{
                            padding: 2,
                            minWidth: { xs: '100%', md: '750px' },
                            maxWidth: '100%',
                            borderRadius: '20px',
                            backgroundColor: '#fff'
                        }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 1, textTransform: 'capitalize', padding: '1 0', pl: 1 }}>
                            {decodedBotica}
                        </Typography>

                        <Divider sx={{ marginBottom: 4 }} />

                        <Box sx={{ marginTop: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    Productos disponibles
                                </Typography>
                                {isSmallScreen && (
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <IconButton
                                            onClick={toggleFilterDrawer}
                                            sx={{ color: '#1b986e' }}
                                        >
                                            <FilterListIcon fontSize="large" />
                                        </IconButton>
                                    </Box>
                                )}
                            </Box>

                            <ProductoBody productosData={productosDeBotica} />
                        </Box>
                    </Paper>
                </Box>

                {isSmallScreen && (
                    <FilterDrawerMini
                        isOpen={isFilterDrawerOpen}
                        toggleDrawer={toggleFilterDrawer}
                        boticasDisponibles={boticasDisponibles}
                        marcasDisponibles={marcasDisponibles}
                        decodedBotica={decodedBotica}
                    />
                )}
            </Box>
        </div>
    );
};

export default BoticaProductsPage;

import React, { useState } from 'react';
import { Box, Typography, ButtonGroup, Button, useMediaQuery, IconButton } from '@mui/material';
import Header from '../components/Header';
import ProductoBody from '../components/ProductoBody';
import BoticaBody from '../components/BoticaBody';
import FilterDrawer from '../components/FilterDrawer';
import FilterDrawerMini from '../components/FilterDrawerMini';
import FilterListIcon from '@mui/icons-material/FilterList';
import data from '../data/data.json';

const ArmaTuKitPage = () => {
    const [view, setView] = useState('productos');
    const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);
    const productosData = data.productos;
    const boticasData = data.boticas;

    const boticasDisponibles = [...new Set(productosData.map(product => product.botica))];
    const marcasDisponibles = [...new Set(productosData.map(product => product.marca))];

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const toggleFilterDrawer = () => {
        setFilterDrawerOpen((prev) => !prev);
    };
    
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
                        Arma tu kit
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'normal', fontSize: { xs: '1rem', md: '1.4rem' } }}>
                        Encuentra aquí lo que necesites
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', mt: '40px', mb: '60px', padding: 0 }}>
                {view === 'productos' && (
                    <>
                        {!isSmallScreen ? (
                            <Box
                                sx={{
                                    width: '245px',
                                    minWidth: '245px',
                                    position: 'sticky',
                                    top: 100,
                                    height: 'calc(100vh - 100px)',
                                    overflowY: 'auto',
                                    padding: 2,
                                    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
                                }}
                            >
                                <FilterDrawer 
                                    boticasDisponibles={boticasDisponibles}
                                    marcasDisponibles={marcasDisponibles}
                                />
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                                <IconButton
                                    onClick={toggleFilterDrawer}
                                    sx={{ mb: 2 }}
                                >
                                    <FilterListIcon />
                                </IconButton>
                            </Box>
                        )}
                    </>
                )}
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h2" sx={{ fontWeight: 'bold', textAlign: "center", fontSize: '2rem', pb: '20px' }}>
                        ¿Qué prefieres ver?
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                        <ButtonGroup variant="outlined" aria-label="Basic button group">
                            <Button
                                onClick={() => setView('productos')}
                                variant={view === 'productos' ? 'contained' : 'outlined'}
                                sx={{
                                    backgroundColor: view === 'productos' ? '#1b986e' : 'transparent',
                                    color: view === 'productos' ? '#fff' : '#1b986e',
                                    borderColor: '#1b986e',
                                    '&:hover': {
                                        backgroundColor: view === 'productos' ? '#157f59' : '#e6f7f1',
                                        borderColor: '#157f59',
                                    }
                                }}
                            >
                                Ver productos
                            </Button>
                            <Button
                                onClick={() => setView('tiendas')}
                                variant={view === 'tiendas' ? 'contained' : 'outlined'}
                                sx={{
                                    backgroundColor: view === 'tiendas' ? '#1b986e' : 'transparent',
                                    color: view === 'tiendas' ? '#fff' : '#1b986e',
                                    borderColor: '#1b986e',
                                    '&:hover': {
                                        backgroundColor: view === 'tiendas' ? '#157f59' : '#e6f7f1',
                                        borderColor: '#157f59',
                                    }
                                }}
                            >
                                Ver tiendas
                            </Button>
                        </ButtonGroup>
                    </Box>
                    {view === 'productos' ? (
                        <ProductoBody productosData={productosData} />
                    ) : (
                        <BoticaBody boticasData={boticasData} />
                    )}
                </Box>
            </Box>

            {isSmallScreen && (
                <FilterDrawerMini 
                    isOpen={isFilterDrawerOpen} 
                    toggleDrawer={toggleFilterDrawer} 
                    boticasDisponibles={boticasDisponibles} 
                    marcasDisponibles={marcasDisponibles}
                />
            )}
        </div>
    );
};

export default ArmaTuKitPage;

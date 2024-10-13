import React from 'react';
import { Box, Typography, ButtonGroup, Button, useMediaQuery, IconButton } from '@mui/material';
import Header from '../components/Header';
import ProductoBody from '../components/ProductoBody';
import BoticaBody from '../components/BoticaBody';
import FilterDrawer from '../components/FilterDrawer/FilterDrawer';
import FilterDrawerMini from '../components/FilterDrawer/FilterDrawerMini';
import FilterListIcon from '@mui/icons-material/FilterList';
import useArmaTuKit from '../hooks/useArmaTuKit';

const ArmaTuKitPage = () => {
    const {
        view,
        setView,
        isFilterDrawerOpen,
        toggleFilterDrawer,
        productosData,
        boticasData,
        boticasDisponibles,
        marcasDisponibles,
    } = useArmaTuKit();

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

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
                                    minWidth: '280px',
                                    position: 'sticky', 
                                    top: '100px',       
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
                                sx={getButtonStyles(view === 'productos')}
                            >
                                Ver productos
                            </Button>
                            <Button
                                onClick={() => setView('tiendas')}
                                variant={view === 'tiendas' ? 'contained' : 'outlined'}
                                sx={getButtonStyles(view === 'tiendas')}
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

const getButtonStyles = (isSelected) => ({
    backgroundColor: isSelected ? '#1b986e' : 'transparent',
    color: isSelected ? '#fff' : '#1b986e',
    borderColor: '#1b986e',
    '&:hover': {
        backgroundColor: isSelected ? '#157f59' : '#e6f7f1',
        borderColor: '#157f59',
    },
});

export default ArmaTuKitPage;

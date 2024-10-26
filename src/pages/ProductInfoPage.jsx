import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CardMedia, Typography, Box, Button, Chip, Divider, Container, Grid, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import data from '../data/data.json';
import Header from '../components/Header';
import { CartContext } from '../components/CartContext';
import QuantityControls from '../components/QuantityControls';
import { useNavigate } from 'react-router-dom';

const ProductInfoPage = () => {
    const navigate = useNavigate();
    const { nombre, botica } = useParams();
    const decodedNombre = decodeURIComponent(nombre.replace(/-/g, ' '));
    const decodedBotica = decodeURIComponent(botica.replace(/-/g, ' '));

    // Obtener el producto basado en el nombre y botica
    const producto = data.productos.find((prod) =>
        prod.nombre.toLowerCase() === decodedNombre.toLowerCase() &&
        prod.botica.toLowerCase() === decodedBotica.toLowerCase()
    );

    const { cartProducts } = useContext(CartContext);
    const [cantidad, setCantidad] = useState(0);

    // Buscar si el producto ya está en el carrito y sincronizar la cantidad
    useEffect(() => {
        const productoEnCarrito = cartProducts.find(item => item.id === producto?.id);
        setCantidad(productoEnCarrito ? productoEnCarrito.cantidad : 0);
    }, [cartProducts, producto]);

    // Manejar el click para redirigir a la página de la botica
    const handleBoticaClick = (event) => {
        event.stopPropagation();
        const formattedBotica = producto.botica.replace(/\s+/g, '-').toLowerCase();
        navigate(`/boticainfo/${encodeURIComponent(formattedBotica)}`);
    };

    if (!producto) {
        return <Typography variant="h5">Producto no encontrado</Typography>;
    }

    return (
        <div style={{ margin: '50px auto 0' }}>
            <Header />
            <Box sx={{ padding: 4, maxWidth: '100%', backgroundColor: '#f2f2f2', minHeight: '84.5vh', margin: 'auto', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
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

                <Box sx={{ maxWidth: '1400px', margin: 'auto' }}>
                    <Grid container spacing={4}>
                        {/* Sección izquierda: Imagen y detalles del producto */}
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ padding: 4, borderRadius: '35px', backgroundColor: '#fff' }}>
                                <CardMedia
                                    component="img"
                                    alt={producto.nombre}
                                    height="300"
                                    image={producto.imagen}
                                    sx={{ objectFit: 'contain', borderRadius: '20px', width: '100%', marginBottom: 2 }}
                                />
                                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 1, fontSize: '26px' }}>
                                    {producto.nombre} | {producto.marca}
                                </Typography>
                                <Chip label={producto.botica} onClick={handleBoticaClick} sx={{ marginBottom: 2, fontSize: '13px' }} />
                                <Typography variant="h4" color="textPrimary" sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: '26px' }}>
                                    S/ {producto.precio.toFixed(2)}
                                </Typography>

                                {/* Sección de cantidad y botón de agregar */}
                                <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '15px' }}>
                                    <QuantityControls product={producto} cantidad={cantidad} />
                                </Container>
                            </Paper>
                        </Grid>

                        {/* Sección derecha: Descripción, contraindicaciones y advertencias */}
                        <Grid item xs={12} md={6}>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="descripcion-content" id="descripcion-header">
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '26px' }}>Descripción</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="body1" sx={{ fontSize: '20px' }}>{producto.descripcion}</Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Divider />

                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="contraindicaciones-content" id="contraindicaciones-header">
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '26px' }}>Contraindicaciones</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="body1" sx={{ fontSize: '20px' }}>{producto.contraindicaciones}</Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Divider />

                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="advertencias-content" id="advertencias-header">
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '26px' }}>Advertencias y precauciones</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="body1" sx={{ fontSize: '20px' }}>{producto.advertencias}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    )
}

export default ProductInfoPage

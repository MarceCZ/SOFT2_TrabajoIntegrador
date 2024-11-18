import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CardMedia, Typography, Box, Button, Chip, Divider, Container, Grid, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import data from '../data/data.json';
import Header from '../components/Header';
import { CartContext } from '../components/CartContext';
import QuantityControls from '../components/QuantityControls';
import { useNavigate } from 'react-router-dom';
import apiProd from '../api/producto'; // Importar la API de productos


const ProductInfoPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();  // Obtener el id de los parámetros de la URL
    
    const [producto, setProducto] = useState(null);  // Estado para almacenar el producto
    const [loading, setLoading] = useState(true);    // Estado de carga
    const [error, setError] = useState(null);        // Estado de error


    const { cartProducts } = useContext(CartContext);
    const [cantidad, setCantidad] = useState(0);

    const fetchProduct = async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedProduct = await apiProd.findOneComplete(id); // Usamos la función findOneComplete
            setProducto(fetchedProduct); // Guardamos el producto en el estado
        } catch (err) {
            console.error("Error al cargar el producto:", err);
            setError("No se encontró el producto.");
        } finally {
            setLoading(false);
        }
    };

    // Obtener producto desde la API cuando el componente se monta o cambia el id
    useEffect(() => {
        fetchProduct();
    }, [id]);


    // Buscar si el producto ya está en el carrito y sincronizar la cantidad
    useEffect(() => {
        if (producto) {
            const productoEnCarrito = cartProducts.find(item => item.id === producto.id);
            setCantidad(productoEnCarrito ? productoEnCarrito.cantidad : 0);
        }
    }, [cartProducts, producto]);

    // Manejar el click para redirigir a la página de la botica
    const handleBoticaClick = (event) => {
        event.stopPropagation();
        if (producto && producto.botica) {
            const formattedBotica = producto.botica.nombre.replace(/\s+/g, '-').toLowerCase();
            navigate(`/boticainfo/${encodeURIComponent(formattedBotica)}`);
        }
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
                                <Chip label={producto.botica.nombre} onClick={handleBoticaClick} sx={{ marginBottom: 2, fontSize: '13px' }} />
                                <Typography variant="h4" color="textPrimary" sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: '26px' }}>
                                    S/ {producto.precio}
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

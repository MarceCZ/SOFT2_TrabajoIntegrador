import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CardMedia, Typography, Box, Button, Chip, Divider, IconButton, Container, Grid, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import data from '../data/data.json';
import Header from '../components/Header';
import { CartContext } from '../components/CartContext';  // Importar el contexto del carrito
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ProductInfoPage = () => {
    const { id } = useParams();  // Obtener el id del producto desde la URL
    const producto = data.productos.find((prod) => prod.id === parseInt(id));  // Buscar el producto por ID
    const { cartProducts, addToCart, removeFromCart } = useContext(CartContext);  // Acceder al contexto

    const [cantidad, setCantidad] = useState(0);  // Estado local para la cantidad

    // Buscar si el producto ya está en el carrito
    useEffect(() => {
        const productoEnCarrito = cartProducts.find(item => item.id === parseInt(id));
        if (productoEnCarrito) {
            setCantidad(productoEnCarrito.cantidad);  // Actualizar la cantidad desde el carrito
        } else {
            setCantidad(0);  // Si no está en el carrito, la cantidad es 0
        }
    }, [cartProducts, id]);

    if (!producto) {
        return <Typography variant="h5">Producto no encontrado</Typography>;
    }

    const plusOne = () => {
        setCantidad(cantidad + 1);
        addToCart(producto, 1);  // Agregar al carrito
    }

    const minusOne = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
            addToCart(producto, -1);  // Disminuir del carrito
        } else {
            setCantidad(0);
            removeFromCart(producto);  // Eliminar del carrito si la cantidad llega a 0
        }
    }

    return (
        <div>
            <Header></Header>
            <Box sx={{ padding: 4, maxWidth: '100%', margin: 'auto' }}>
                <Button component={Link} to="/" sx={{ marginBottom: 2, top: 16, left: 16, color:'#1b986e' }}>← Volver</Button>

                <Grid container spacing={4}>
                    {/* Sección izquierda: Imagen y detalles del producto */}
                    <Grid item xs={12} md={6}>
                        <CardMedia
                            component="img"
                            alt={producto.nombre}
                            height="400"
                            image={producto.imagen}
                            sx={{ objectFit: 'contain', borderRadius: '8px', width: '100%', marginBottom: 2 }}
                        />
                        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                            {producto.nombre} | {producto.marca}
                        </Typography>
                        <Chip label={producto.botica} sx={{ marginBottom: 2, fontSize: '16px' }} />
                        <Typography variant="h4" color="textPrimary" sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: '30px' }}>
                            S/ {producto.precio.toFixed(2)}
                        </Typography>

                        {/* Sección de cantidad y botón de agregar */}
                        <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '15px' }}>
                            {cantidad === 0 ? (
                                <Button 
                                    onClick={plusOne}
                                    size="medium" 
                                    sx={{ color: 'green', padding: 0, minWidth: 'unset' }}>
                                    <AddCircleOutlineIcon fontSize="large" />
                                </Button>
                            ) : (
                                <Paper elevation={3} sx={{ display: 'flex', alignItems: 'center', borderRadius: '20px', padding: '5px 15px' }}>
                                    <IconButton onClick={minusOne}>
                                        {cantidad > 1 ? <RemoveIcon /> : <DeleteIcon />} {/* Basurero si es 1 */}
                                    </IconButton>
                                    <Typography variant="h6" sx={{ margin: '0 15px' }}>{cantidad}</Typography>
                                    <IconButton onClick={plusOne}>
                                        <AddIcon />
                                    </IconButton>
                                </Paper>
                            )}
                        </Container>
                    </Grid>

                    {/* Sección derecha: Descripción, contraindicaciones y advertencias */}
                    <Grid item xs={12} md={6}>
                        {/* Acordeón para Descripción */}
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="descripcion-content" id="descripcion-header">
                                <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '26px' }}>Descripción</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body1" sx={{ fontSize: '20px' }}>{producto.descripcion}</Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Divider />

                        {/* Acordeón para Contraindicaciones */}
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="contraindicaciones-content" id="contraindicaciones-header">
                                <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '26px' }}>Contraindicaciones</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body1" sx={{ fontSize: '20px' }}>{producto.contraindicaciones}</Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Divider />

                        {/* Acordeón para Advertencias y precauciones */}
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
        </div>
    )
}

export default ProductInfoPage

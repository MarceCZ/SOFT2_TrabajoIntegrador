import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CardMedia, Typography, Box, Button, Chip, Divider, IconButton, Container, Grid, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import data from '../data/data.json';
import Header from '../components/Header';

const ProductInfoPage = () => {
    const { id } = useParams();  // Obtener el id del producto desde la URL
    const producto = data.productos.find((prod) => prod.id === parseInt(id));  // Buscar el producto por ID

    const [cantidad, setCantidad] = React.useState(1);

    if (!producto) {
        return <Typography variant="h5">Producto no encontrado</Typography>;
    }

    const incrementarCantidad = () => setCantidad(cantidad + 1);
    const decrementarCantidad = () => cantidad > 1 && setCantidad(cantidad - 1);

    return (
        <div>
            <Header></Header>
            <Box sx={{ padding: 4, maxWidth: '100%', margin: 'auto' }}>
                
                <Button component={Link} to="/" sx={{ marginBottom: 2, top: 16, left: 16 }}>← Volver</Button>

                <Grid container spacing={4}>
                    {/* Sección izquierda: Imagen y detalles del producto */}
                    <Grid item xs={12} md={6}>
                        <CardMedia
                            component="img"
                            alt={producto.nombre}
                            height="400"  // Aumentar altura de la imagen
                            image={producto.imagen}
                            sx={{ objectFit: 'contain', borderRadius: '8px', width: '100%', marginBottom: 2 }}  // Ajustar ancho
                        />
                        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                            {producto.nombre} | {producto.marca}
                        </Typography>
                        <Chip label={producto.botica} color="primary" variant="outlined" sx={{ marginBottom: 2, fontSize: '16px' }} />
                        <Typography variant="h4" color="textPrimary" sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: '30px' }}>
                            S/ {producto.precio.toFixed(2)}
                        </Typography>

                        {/* Sección de cantidad y botón de agregar */}
                        <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '15px' }}>
                            <Paper elevation={3} sx={{ display: 'flex', alignItems: 'center', borderRadius: '8px', padding: '5px', marginRight: 2 }}>
                                <IconButton color="primary" onClick={decrementarCantidad}>
                                    <RemoveIcon sx={{ fontSize: '30px' }} />
                                </IconButton>
                                <Typography variant="h4" sx={{ margin: '0 10px' }}>{cantidad}</Typography>
                                <IconButton color="primary" onClick={incrementarCantidad}>
                                    <AddIcon sx={{ fontSize: '30px' }} />
                                </IconButton>
                            </Paper>
                            <Box sx={{ width: '40px' }} />
                            {/* Botón "Añadir" con tamaño de letra aumentado */}
                            <Button variant="contained" color="success" sx={{ textTransform: 'none', fontSize: '30px', padding: '5px 20px' }}>
                                Añadir
                            </Button>
                        </Container>
                    </Grid>

                    {/* Sección derecha: Descripción, contraindicaciones y advertencias */}
                    <Grid item xs={12} md={6}>
                        {/* Acordeón para Descripción */}
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="descripcion-content" id="descripcion-header">
                                <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '26px' }}>Descripción</Typography> {/* Aumentado */}
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body1" sx={{ fontSize: '20px' }}>{producto.descripcion}</Typography> {/* Aumentado */}
                            </AccordionDetails>
                        </Accordion>
                        <Divider />

                        {/* Acordeón para Contraindicaciones */}
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="contraindicaciones-content" id="contraindicaciones-header">
                                <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '26px' }}>Contraindicaciones</Typography> {/* Aumentado */}
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body1" sx={{ fontSize: '20px' }}>{producto.contraindicaciones}</Typography> {/* Aumentado */}
                            </AccordionDetails>
                        </Accordion>
                        <Divider />

                        {/* Acordeón para Advertencias y precauciones */}
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="advertencias-content" id="advertencias-header">
                                <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '26px' }}>Advertencias y precauciones</Typography> {/* Aumentado */}
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body1" sx={{ fontSize: '20px' }}>{producto.advertencias}</Typography> {/* Aumentado */}
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </Box>
            </div>
            );
        
};

            export default ProductInfoPage;








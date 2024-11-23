import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Grid, Paper, Box, Button, CircularProgress, Alert, Link, CardMedia } from '@mui/material';
import Header from '../components/Header';
import apiKit from '../api/kitProd';

const InfoKitPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [kitProducto, setKitProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductKit = async () => {
            try {
                setLoading(true);
                const fetchedKit = await apiKit.findOneCompleteCliente(id);
                console.log("Datos recibidos:", fetchedKit); // Verifica aquí
                setKitProducto(fetchedKit);
            } catch (err) {
                console.error("Error al cargar los datos:", err.message);
                setError("No se pudieron cargar los datos o usted no tiene un kit activo.");
            } finally {
                setLoading(false);
            }
        };

        fetchProductKit();
    }, [id]);

    if (loading) {
        return (
            <Container sx={{ marginTop: 4 }}>
                <Typography variant="h5" align="center">
                    <CircularProgress /> Cargando kit...
                </Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ marginTop: 4 }}>
                <Alert severity="error">{error}</Alert>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ marginTop: 4 }}
                    onClick={() => navigate(-1)}
                >
                    Volver
                </Button>
            </Container>
        );
    }

    return (
        <div style={{ margin: '50px auto 0' }}>
            <Header />
            <Box sx={{ padding: 4, maxWidth: '100%', backgroundColor: '#f2f2f2', minHeight: '84.5vh', margin: 'auto', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                
                {/* Botón para volver */}
                <Box sx={{ marginBottom: 2, textAlign: 'left', ml: { md: '3%' } }}>
                    <Button
                        component={Link}
                        to="/kits"
                        sx={{
                            color: '#1b986e',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            textDecoration: 'underline',
                        }}
                    >
                        ← Volver a los Kits
                    </Button>
                </Box>
    
                <Box sx={{ maxWidth: '1400px', margin: 'auto' }}>
                    <Grid container spacing={4}>
                        {/* Sección izquierda: Datos del Cliente */}
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ padding: 4, borderRadius: '35px', backgroundColor: '#fff' }}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: '26px' }}>
                                    Datos del Cliente
                                </Typography>
                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                    <strong>Nombre:</strong> {kitProducto.cliente?.nombre} {kitProducto.cliente?.apellido1} {kitProducto.cliente?.apellido2}
                                </Typography>
                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                    <strong>DNI:</strong> {kitProducto.cliente?.dni}
                                </Typography>
                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                    <strong>Dirección:</strong> {kitProducto.cliente?.direccion}
                                </Typography>
                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                    <strong>Celular:</strong> {kitProducto.cliente?.celular}
                                </Typography>
                            </Paper>
                        </Grid>
    
                        {/* Sección derecha: Detalles del Kit */}
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ padding: 4, borderRadius: '35px', backgroundColor: '#fff' }}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: '26px' }}>
                                    Detalles del Kit
                                </Typography>
                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                    <strong>Estado de Suscripción:</strong> {kitProducto.cliente?.suscripcions?.[0]?.estado ? "Por Entregar" : "Entregado"}
                                </Typography>
                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                    <strong>Fecha de Entrega:</strong> {new Date(kitProducto.cliente?.suscripcions?.[0]?.kits?.[0]?.fecha).toLocaleDateString('es-ES')}
                                </Typography>
                                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                    <strong>Total del Kit:</strong> S/ {kitProducto.cliente?.suscripcions?.[0]?.kits?.[0]?.totalKit}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
    
                    {/* Productos del Kit */}
                    <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2, fontSize: '26px', marginTop: 4 }}>
                        Productos del Kit
                    </Typography>
                    <Grid container spacing={4}>
                        {kitProducto.cliente?.suscripcions?.[0]?.kits?.[0]?.kit_productos?.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item.id}>
                                <Paper elevation={3} sx={{ padding: 2, borderRadius: '20px', backgroundColor: '#fff' }}>
                                    {/* Contenedor con altura fija */}
                                    <Box sx={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                                        <CardMedia
                                            component="img"
                                            image={item.producto?.imagen}
                                            alt={item.producto?.nombre}
                                            sx={{
                                                objectFit: 'contain', // Para mantener la proporción de la imagen sin recortar
                                                width: '100%',
                                                height: '100%',
                                            }}
                                        />
                                    </Box>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                                        {item.producto?.nombre}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                                        <strong>Marca:</strong> {item.producto?.marca}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                                        <strong>Presentación:</strong> {item.producto?.presentacion}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                                        <strong>Precio Unitario:</strong> S/ {item.producto?.precio}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                                        <strong>Cantidad:</strong> {item.cantProducto}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                                        <strong>Subtotal:</strong> S/ {item.subtotal}
                                    </Typography>
                                    {/* Botón centrado */}
                                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: '#1b986e',  // Color del diseño
                                                color: 'white',
                                                fontWeight: 'bold',
                                                '&:hover': {
                                                    backgroundColor: '#179c62',  // Tono más oscuro en hover
                                                },
                                            }}
                                            onClick={() => navigate(`/productinfo/${item.producto?.id}`)}
                                        >
                                            Ver Detalle
                                        </Button>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </div>
    );
};

export default InfoKitPage;

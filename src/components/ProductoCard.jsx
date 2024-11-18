import React, { useContext, useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, Chip, Container, Box, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import QuantityControls from '../components/QuantityControls';

const ProductoCard = (props) => {
    const navigate = useNavigate();
    const { cartProducts } = useContext(CartContext);
    const [cantidad, setCantidad] = useState(0);

    const CardOnClick = () => {
        const formattedNombre = props.nombre.replace(/\s+/g, '-').toLowerCase();
        const formattedBotica = props.botica.replace(/\s+/g, '-').toLowerCase();
        navigate(`/productinfo/${encodeURIComponent(formattedNombre)}/${encodeURIComponent(formattedBotica)}`, { state: { product: props } });
    };

    const handleBoticaClick = (event) => {
        navigate(`/productinfo/${props.id}`);
    };

    useEffect(() => {
        const existingItem = cartProducts.find(item => item.id === props.id);
        setCantidad(existingItem ? existingItem.cantidad : 0);
    }, [cartProducts, props.id]);

    return (
        <Card
            xs={4}
            sx={{
                mr: "15px",
                ml: "15px",
                marginBottom: "30px",
                width: "250px",
                minHeight: "320px",
                borderRadius: "10px",
                boxShadow: 2
            }}>
            <CardActionArea disableRipple onClick={CardOnClick}>
                <CardMedia
                    component="img"
                    alt={props.nombre}
                    height="150"
                    image={props.imagen}
                    sx={{ objectFit: 'contain', padding: '2px' }}
                />
                <CardContent>
                    <Typography gutterBottom component="div" sx={{ fontSize: '12px' }}>
                        {props.presentacion}
                    </Typography>
                    <Box sx={{ minHeight: '50px' }}>
                        <Typography
                            gutterBottom
                            component="div"
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                lineHeight: "1.2",
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                            {props.nombre} | {props.marca}
                        </Typography>
                    </Box>
                    <Chip label={props.botica}
                        onClick={handleBoticaClick}
                        sx={{ fontSize: '10px', backgroundColor: 'lightgray' }} />
                    <Container sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 0,
                        margin: 0,
                        marginTop: '10px',
                        paddingLeft: '0 !important',
                        paddingRight: '0 !important'
                    }}>
                        <Typography sx={{ lineHeight: "1.2", fontSize: '20px', fontWeight: 'bold' }}>
                            S/ {props.precio}
                        </Typography>
                        <QuantityControls product={props} cantidad={cantidad} />
                    </Container>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default ProductoCard

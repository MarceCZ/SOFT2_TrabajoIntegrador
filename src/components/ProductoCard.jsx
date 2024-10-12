import { Card, CardMedia, CardContent, Button, Typography, Chip, Container, Box, CardActionArea, IconButton, Paper } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { CartContext } from './CartContext';

const ProductoCard = (props) => {
  const navigate = useNavigate();
  const { cartProducts, addToCart, removeFromCart } = useContext(CartContext);  // Acceder al contexto
  const [cantidad, setCantidad] = useState(0);

  // Manejar el click en el card para redirigir a la página de detalles
  const CardOnClick = () => {
    const formattedNombre = props.nombre.replace(/\s+/g, '-').toLowerCase();
    const formattedBotica = props.botica.replace(/\s+/g, '-').toLowerCase();
    navigate(`/productinfo/${encodeURIComponent(formattedNombre)}/${encodeURIComponent(formattedBotica)}`, { state: { product: props } });
  }

  const handleBoticaClick = (event) => {
    event.stopPropagation();
    const formattedBotica = props.botica.replace(/\s+/g, '-').toLowerCase();
    navigate(`/boticainfo/${encodeURIComponent(formattedBotica)}`);
  }

  // Manejar el click en el botón de agregar
  const handleAddClick = (event) => {
    event.stopPropagation();
    setCantidad(1);
    addToCart(props, 1);
  }

  // Incrementar la cantidad
  const plusOne = (event) => {
    event.stopPropagation()
    setCantidad(cantidad + 1)
    addToCart(props, 1)
  }

  // Decrementar la cantidad
  const minusOne = (event) => {
    event.stopPropagation()
    if (cantidad > 1) {
      setCantidad(cantidad - 1)
      addToCart(props, -1)
    } else {
      setCantidad(0);
      removeFromCart(props)
    }
  };


  useEffect(() => {
    const existingItem = cartProducts.find(item => item.id === props.id);
    if (existingItem) {
      setCantidad(existingItem.cantidad);
    } else {
      setCantidad(0);
    }
  }, [cartProducts, props.id]);
  return (
    <Card
      item xs={4}
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
              }} >
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

            {cantidad === 0 ? (
              <Button
                onClick={handleAddClick}
                size="medium"
                sx={{ color: 'green', padding: 0, minWidth: 'unset' }}>
                <AddCircleOutlineIcon fontSize="large" />
              </Button>
            ) : (
              // Control de incremento/decremento cuando la cantidad es mayor a 0
              <Paper elevation={3} sx={{ display: 'flex', alignItems: 'center', borderRadius: '20px', padding: '5px 15px' }}>
                <IconButton onClick={minusOne}>
                  {cantidad > 1 ? <RemoveIcon /> : <DeleteIcon />}  {/* Cambiar al ícono de eliminar si cantidad es 1 */}
                </IconButton>
                <Typography variant="h6" sx={{ margin: '0 15px' }}>{cantidad}</Typography>
                <IconButton onClick={plusOne}>
                  <AddIcon />
                </IconButton>
              </Paper>
            )}
          </Container>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductoCard;

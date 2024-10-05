import { Card, CardActions, CardMedia, CardContent, Button, Typography, Chip, Container } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom'; // Importar el componente Link para navegar entre rutas

const ProductoCard = (props) => { 
  return (
    <Card item xs={4} sx={{ mr: "15px", ml: "15px", marginBottom: "30px", width: "250px", minHeight: "320px", borderRadius: "10px", boxShadow: 2 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="150"
        image={props.imagen}
        sx={{objectFit: 'contain', padding: '2px'}}
      />
      <CardContent>
        <Typography gutterBottom component="div" sx={{ fontSize: '12px' }}>
          {props.presentacion}
        </Typography>
        <Typography gutterBottom component="div" sx={{ fontSize: '16px', fontWeight: 'bold', lineHeight: "1.2" }} >
          {props.nombre} | {props.marca}
        </Typography>
        <Chip label={props.botica} sx={{ fontSize: '10px', backgroundColor: 'lightgray' }} />
        <Container sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0, padding: 0, margin: 0, marginTop: '10px', paddingLeft: '0 !important', paddingRight: '0 !important' }}>
          <Typography sx={{ lineHeight: "1.2", fontSize: '20px', fontWeight: 'bold' }}>
            S/ {props.precio}
          </Typography>
          <Button size="medium" sx={{ color: 'green', padding: 0, minWidth: 'unset' }}>
            <AddCircleOutlineIcon fontSize="large" />
          </Button>
        </Container>
        <Button component={Link} to={`/productinfo/${props.id}`} variant="contained" color="primary" fullWidth sx={{ marginTop: '10px', textTransform: 'none', fontSize: '14px' }}>
          Ver detalles
        </Button>
      </CardContent>
    </Card>
  );
}
export default ProductoCard;
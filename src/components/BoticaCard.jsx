import { Card, CardMedia, CardContent, Typography, Box, CardActionArea, } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BoticaCard = (props) => {
  const navigate = useNavigate();

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
        boxShadow: 2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.nombre}
          height="150"
          image={props.logo}
          sx={{ objectFit: 'contain', padding: '2px', width: '100%', height: '230px'} }
        />
        <CardContent>
          <Box sx={{ minHeight: '50px'}}>
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
                textOverflow: 'ellipsis'}} >
              {props.nombre}
            </Typography>
            <Typography gutterBottom component="div" sx={{ fontSize: '12px' }}>
            {props.cantidad_productos} productos disponibles
          </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default BoticaCard;

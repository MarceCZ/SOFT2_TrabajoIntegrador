import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

const PasoCard = (props) => {
  return (
    <Grid item xs={12} md={6} lg={3}>
      <Card sx={{ boxShadow: 'none' }}>
        <CardMedia
          component="img"
          height="300"
          image={props.imageUrl}
          style={{ objectFit: 'contain' }}  
        />
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {props.title}
          </Typography>
          <Typography variant="body1">
            {props.body}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PasoCard;

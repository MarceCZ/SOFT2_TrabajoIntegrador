import React from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemText, Grid } from '@mui/material';

const KitSummary = ({ cartProducts, totalCartPrice }) => {
  return (
    <Grid item xs={5.5}>
      <Box sx={{ 
        padding: 2, 
        backgroundColor: '#f0f0f0', 
        borderLeft: '1px solid #afafaf', 
        height: '96vh',
        }}>
        <Box sx={{ marginRight: '30vh', mt: 7 }}>
          <Typography variant="h6">
            Resumen de mi kit
          </Typography>

          <Box sx={{ 
                maxHeight: '350px', 
                overflowY: 'auto', 
                mb: 5 }}>
            <List>
              {cartProducts.map((item) => (
                <ListItem key={item.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '70%' }}>
                    <img src={item.imagen} alt={item.nombre} style={{ width: 50, height: 50, marginRight: 10 }} />
                    <ListItemText
                      primary={item.nombre}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            {item.presentacion}
                          </Typography>
                          <Typography variant="body2" fontWeight="bold" color="black">
                            Cantidad: {item.cantidad}
                          </Typography>
                          <Typography variant="body2" fontWeight="bold" color="black">
                            {item.botica}
                          </Typography>
                        </Box>
                      }
                    />
                  </Box>
                  <Box sx={{ width: '30%', textAlign: 'right' }}>
                    <Typography sx={{ fontWeight: 'bold' }}>S/ {(item.precio * item.cantidad).toFixed(2)}</Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider />
          {/* Subtotal */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, mb: 1 }}>
            <Typography variant="h6">Subtotal</Typography>
            <Typography variant="h6">
              S/ {totalCartPrice.toFixed(2)}
            </Typography>
          </Box>

          <Divider sx={{ my: 1 }} />

          {/* Total */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Total a pagar
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              S/ {totalCartPrice.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Grid>
  )
}

export default KitSummary

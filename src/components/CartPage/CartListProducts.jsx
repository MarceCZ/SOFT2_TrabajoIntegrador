import React from 'react';
import { Paper, Grid, Box, Typography, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const CartListProducts = ({ cartProducts, minusOne, plusOne, handleRemove }) => (
  <>
    {cartProducts.map((item) => (
      <Paper
        key={item.id}
        sx={{ 
          padding: '20px', 
          marginBottom: '20px', 
          borderRadius: '12px', 
          backgroundColor: '#f9fafb' }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src={item.imagen} 
                alt={item.nombre} 
                style={{ width: 60, height: 60, marginRight: '10px' }} />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {item.nombre}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {item.presentacion}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {item.botica}
            </Typography>
          </Grid>

          <Grid item xs={12} md={2} sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: '25px',
                border: '1px solid #e5e7eb',
                padding: '5px 10px',
                justifyContent: 'space-between',
                width: '120px',
                margin: '0 auto'
              }}
            >
              {item.cantidad > 1 ? (
                <IconButton onClick={() => minusOne(item)} sx={{ padding: 0 }}>
                  <RemoveIcon />
                </IconButton>
              ) : (
                <IconButton onClick={() => handleRemove(item)} sx={{ padding: 0 }}>
                  <DeleteIcon />
                </IconButton>
              )}
              <Typography sx={{ mx: 1 }}>{item.cantidad}</Typography>
              <IconButton onClick={() => plusOne(item)} sx={{ padding: 0 }}>
                <AddIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} md={2} sx={{ textAlign: 'center' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              S/ {item.precio * item.cantidad}
            </Typography>
          </Grid>

          <Grid item xs={12} md={1} sx={{ textAlign: 'right', pr: 1, ml: -1 }}>
            <Button onClick={() => handleRemove(item)} color="error">
              Eliminar
            </Button>
          </Grid>
        </Grid>
      </Paper>
    ))}
  </>
)

export default CartListProducts

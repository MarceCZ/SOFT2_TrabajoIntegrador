import React from 'react'
import { Box, List, ListItem, ListItemText, Typography, IconButton, Button, Grid } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const CartDrawerWithProducts = ({ cartProducts, handleRemove, totalCartPrice, navigate }) => (
  <>
    <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, maxHeight: '450px' }}>
      <List sx={{ mt: -1 }} >
        {cartProducts.map((item) => (
          <ListItem 
            key={item.id} 
            sx={{ 
              alignItems: 'flex-start', 
              display: 'flex', 
              justifyContent: 'space-between',
              mb: 1, 
              padding: 2, 
              borderRadius: '15px', 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', 
              backgroundColor: '#fff' 
            }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src={item.imagen} 
                alt={item.nombre} 
                style={{ width: 50, height: 50, marginRight: 15 }} 
              />
              <ListItemText
                primary={<Typography variant="subtitle1" fontWeight="bold">{item.nombre}</Typography>}
                secondary={
                  <Box>
                    <Typography variant="body2" color="textSecondary">
                      {item.presentacion}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" fontWeight="bold">
                      Cantidad: {item.cantidad}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" color="black">
                      {item.botica}
                    </Typography>
                  </Box>
                }
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minWidth: '80px', mt: 2 }}>
              <Typography variant="subtitle1" sx={{ textAlign: 'right', fontWeight: 'bold' }}>
                S/ {(item.precio * item.cantidad).toFixed(2)}  
              </Typography>
              <IconButton edge="end" onClick={() => handleRemove(item)} sx={{ mt: 0.5 }}>
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>

    <Box sx={{ padding: 2, mt: 3.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Subtotal:</Typography>
        <Typography variant="h6" sx={{ textAlign: 'right', fontWeight: 'bold' }}>
          S/ {totalCartPrice.toFixed(2)}
        </Typography>
      </Box>
      
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6}>
          <Button 
            color="primary" 
            variant="outlined" 
            onClick={() => navigate('/cart')}
            sx={{ 
              borderRadius: '25px', 
              border: 'none', 
              width: '100%', 
              textTransform: 'none',
              fontWeight: 'bold',
              padding: '10px 16px', 
              transition: 'all 0.3s', 
              '&:hover': {
                backgroundColor: '#e3f2fd' 
              }
            }}>
              Ir a mi kit
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button 
            color="success" 
            variant="contained"
            onClick={() => navigate('/checkout')}
            sx={{ 
              borderRadius: '25px', 
              width: '100%', 
              textTransform: 'none', 
              fontWeight: 'bold',
              padding: '10px 16px',
              transition: 'all 0.3s',
              '&:hover': {
                backgroundColor: '#66bb6a' 
              }
            }}>
            Subscribirse a mi kit
          </Button>
        </Grid>
      </Grid>
    </Box>
  </>
)

export default CartDrawerWithProducts

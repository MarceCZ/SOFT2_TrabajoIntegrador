import React from 'react'
import { Grid, Paper, Box, Typography, IconButton, Button, Divider } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

const CartListProducts = ({ cartProducts, minusOne, plusOne, handleRemove }) => {
  return (
    <>
      <Grid container alignItems="center" sx={{ fontWeight: 'bold', mb: 2, color: '#6c6c6c' }}>
        <Grid item xs={12} md={4} sx={{ paddingLeft: { xs: '10px', md: '90px' }, display: { xs: 'none', md: 'block' } }}>
          <Typography>Productos</Typography>
        </Grid>
        <Grid item xs={12} md={3} sx={{ textAlign: 'center', display: { xs: 'none', md: 'block' } }}>
          <Typography>Botica</Typography>
        </Grid>
        <Grid item xs={12} md={2} sx={{ textAlign: 'center', display: { xs: 'none', md: 'block' } }}>
          <Typography>Cantidad</Typography>
        </Grid>
        <Grid item xs={12} md={2} sx={{ textAlign: 'center', display: { xs: 'none', md: 'block' } }}>
          <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={12} md={1} />
      </Grid>
      <Divider sx={{ my: 2, display: { xs: 'none', md: 'block' } }} />
      {cartProducts.map((item) => (
        <Paper
          key={item.id}
          sx={{ padding: '20px', marginBottom: '20px', borderRadius: '12px', backgroundColor: '#f9fafb' }}
        >
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  style={{ width: 60, height: 60, marginRight: '10px' }}
                />
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

            <Grid item xs={12} md={3} sx={{ textAlign: 'center', display: { xs: 'none', md: 'block' } }}>
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
                  width: { xs: '100px', md: '120px' },
                  margin: '0 auto',
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

            <Grid item xs={12} md={2} sx={{ textAlign: 'center', display: { xs: 'none', md: 'block' } }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                S/ {item.precio * item.cantidad}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              md={1}
              sx={{
                textAlign: { xs: 'center', md: 'right' },
                pr: { md: 1 },
                mt: { xs: 2, md: 0 },
              }}
            >
              <Button onClick={() => handleRemove(item)} color="error" sx={{ fontSize: { xs: '12px', md: '14px' } }}>
                Eliminar
              </Button>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </>
  )
}

export default CartListProducts

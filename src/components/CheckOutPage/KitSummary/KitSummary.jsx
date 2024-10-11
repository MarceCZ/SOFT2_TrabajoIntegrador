import React from 'react'
import { Box, Typography, Divider, List, Grid } from '@mui/material'
import CartProductItem from './CartProductItem'

const KitSummary = ({ cartProducts, totalCartPrice }) => {
  return (
    <Grid item xs={12} md={4} lg={5.5}>
      <Box sx={{ padding: 2, backgroundColor: '#f0f0f0', borderLeft: {md: '1px solid #afafaf'}, height: '100%' }}>
        <Box sx={{ marginRight: {sm: '5vh', md: '10vh', lg: '30vh'}, mt: {xs:3, md:7}}}>
          <Typography variant="h6">Resumen de mi kit</Typography>

          <Box sx={{ maxHeight: { xs: '200px', md: '350px' }, overflowY: 'auto', mb: 5 }}>
            <List>
              {cartProducts.map((item) => (
                <CartProductItem key={item.id} item={item} />
              ))}
            </List>
          </Box>

          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, mb: 1 }}>
            <Typography variant="h6">Subtotal</Typography>
            <Typography variant="h6">S/ {totalCartPrice.toFixed(2)}</Typography>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total a pagar</Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>S/ {totalCartPrice.toFixed(2)}</Typography>
          </Box>
        </Box>
      </Box>
    </Grid>
  )
}

export default KitSummary

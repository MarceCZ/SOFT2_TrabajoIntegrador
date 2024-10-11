import React from 'react';
import { Box, Typography } from '@mui/material';

const EmptyCartDrawer = () => (
  <Box sx={{ 
      flexGrow: 1, 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      flexDirection: 'column',
      textAlign: 'center', 
      padding: 3, 
    }}>
    <img 
      src="https://static.vecteezy.com/system/resources/previews/009/885/111/original/sad-but-relieved-face-emoji-3d-illustration-png.png" 
      alt="Mi kit" 
      style={{ width: 120, height: 120, marginBottom: 20 }} 
    />
    <Typography variant="h6" fontWeight="bold" color="textSecondary">
      No hay productos en tu kit
    </Typography>
  </Box>
)

export default EmptyCartDrawer

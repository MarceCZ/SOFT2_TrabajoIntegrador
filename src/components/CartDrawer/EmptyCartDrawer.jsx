import React from 'react';
import { Box, Typography } from '@mui/material';

const EmptyCartDrawer = () => (
  <Box sx={{ 
      flexGrow: 1, 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      flexDirection: 'column' 
    }}>
    <img 
      src="https://static.vecteezy.com/system/resources/previews/009/885/111/original/sad-but-relieved-face-emoji-3d-illustration-png.png" 
      alt="Mi kit" 
      style={{ width: 150, height: 150 }} 
    />
    <Typography variant="body1">No hay productos en tu kit</Typography>
  </Box>
)

export default EmptyCartDrawer

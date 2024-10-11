import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const EmptyCart = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '70vh',
      padding: { xs: '10px', md: '20px' }
    }}>
      <img 
        src="https://static.vecteezy.com/system/resources/previews/009/885/111/original/sad-but-relieved-face-emoji-3d-illustration-png.png"
        alt="Tu kit está vacío" 
        style={{ 
          width: '200px', 
          maxWidth: { xs: '150px', sm: '180px' }, 
          height: 'auto'
        }} 
      />
      <Typography 
        variant="body1" 
        sx={{ 
          fontSize: { xs: '16px', sm: '18px', md: '20px' }, 
          textAlign: 'center', 
          mt: 2 
        }}
      >
        Tu kit está vacío
      </Typography>
      <Typography 
        variant="body2" 
        sx={{ 
          mt: 3, 
          fontSize: { xs: '12px', sm: '14px', md: '16px' }, 
          textAlign: 'center' 
        }}
      >
        ¡Descubre nuestros productos esenciales para armar tu kit perfecto!
      </Typography>
      <Button 
        variant="contained" 
        color="success" 
        onClick={() => navigate('/')} 
        sx={{ 
          marginTop: '20px', 
          borderRadius: '25px', 
          mt: 4, 
          padding: { xs: '8px 20px', sm: '10px 25px', md: '12px 35px' }, 
          fontSize: { xs: '14px', sm: '16px', md: '18px' } 
        }}>
        Ir a la página principal
      </Button>
    </Box>
  )
}

export default EmptyCart

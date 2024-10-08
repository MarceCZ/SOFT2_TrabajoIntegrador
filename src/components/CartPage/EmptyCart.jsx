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
      height: '70vh'
    }}>
      <img 
        src="https://static.vecteezy.com/system/resources/previews/009/885/111/original/sad-but-relieved-face-emoji-3d-illustration-png.png"
        alt="Tu kit está vacío" 
        style={{ width: 200, height: 200}} 
      />
      <Typography variant="body1">Tu kit está vacío</Typography>
      <Typography variant="body2" sx={{ mt: 3 }}>
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
            padding: '12px 35px' }}>
        Ir a la página principal
      </Button>
    </Box>
  )
}

export default EmptyCart

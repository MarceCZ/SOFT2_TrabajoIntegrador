import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const ContactInfo = ({ onRedirect }) => {
  return (
    <Box
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '800px',
        mx: 'auto',
        py: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: 3,
          fontWeight: 'bold',
          color: '#333',
          fontSize: { lg: '2.5rem' },
        }}
      >
        ¡Bienvenido a la sección de Preguntas Frecuentes!
      </Typography>

      <Typography
        variant="body1"
        sx={{
          marginBottom: 3,
          fontSize: { lg: '1.3rem' },
          color: '#666',
        }}
      >
        Aquí podrás encontrar respuestas a las preguntas más comunes. Si no encuentras lo que buscas, no dudes en contactarnos.
      </Typography>

      <Typography
        variant="body1"
        sx={{
          marginBottom: 4,
          fontSize: { lg: '1.2rem' },
          color: '#666',
        }}
      >
        Si necesitas más ayuda, te ofrecemos diferentes formas de contacto:
      </Typography>

      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          borderRadius: '10px',
          padding: '20px',
          width: '100%',
          maxWidth: '500px',
          mx: 'auto',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" sx={{ marginBottom: 2, color: '#333' }}>
          <strong>📞 Teléfono:</strong> +1234567890
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 2, color: '#333' }}>
          <strong>📱 WhatsApp:</strong> +1234567890
        </Typography>
        <Typography variant="body2" sx={{ color: '#333' }}>
          <strong>📧 Correo electrónico:</strong>{' '}
          <a href="mailto:mediplan@mediplan.com">mediplan@mediplan.com</a>
        </Typography>
        <Button
          onClick={onRedirect}
          variant="contained"
          color="success"
          startIcon={<span>💬</span>}
          sx={{ mt: 3, borderRadius: 3 }}
        >
          Escríbenos
        </Button>
      </Box>

      <Typography
        variant="body2"
        sx={{ marginTop: 4, fontSize: '0.9rem', color: '#999' }}
      >
        Nuestro equipo estará encantado de ayudarte. ¡No dudes en ponerte en contacto con nosotros!
      </Typography>
    </Box>
  )
}

export default ContactInfo

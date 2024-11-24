import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import correoApi from '../api/email.js';

const EscribenosPage = () => {
  const [consulta, setPregunta] = useState('');
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false); 
  const navigate = useNavigate();

  const handleEnviar = async () => {
    if (!consulta.trim()) {
      setError(true);
      return;
    }

    try {
      const response = await correoApi.enviarConsulta(consulta);
      if (response.status === 200) {
        setOpen(true);
        setPregunta('');
        setError(false);
      } else {
        console.error('Ocurrió un problema al enviar la consulta.');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '800px',
          mx: 'auto',
          py: 4,
          mt: 10,
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
          Envía tu pregunta aquí
        </Typography>

        <Typography
          variant="body2"
          sx={{
            marginBottom: 4,
            fontSize: { lg: '1.1rem' },
            color: '#666',
          }}
        >
          Escribe en el campo de abajo tu consulta o duda. No olvides poner tu correo electrónico para contactarnos contigo.
        </Typography>
        <Box
          sx={{
            marginTop: 4,
            width: '100%',
            maxWidth: '500px',
            mx: 'auto',
          }}
        >
          <TextField
            fullWidth
            label="Escribe tu pregunta"
            variant="outlined"
            multiline
            rows={4}
            value={consulta}
            onChange={(e) => {
              setPregunta(e.target.value);
              if (error) setError(false);
            }}
            error={error}
            helperText={error ? 'El campo no puede estar vacío' : ''}
            sx={{
              marginBottom: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
          />
          <Button
            variant="contained"
            color = "primary"
            fullWidth
            onClick={handleEnviar}
            sx={{ borderRadius: 3, padding: '10px 0', backgroundColor: '#1b986e'}}
          >
            Enviar
          </Button>
        </Box>

        <Typography
          variant="body2"
          sx={{ marginTop: 4, fontSize: '0.9rem', color: '#999' }}
        >
          ¡Nuestro equipo te responderá lo más rápido posible!
        </Typography>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>¡Pregunta enviada!</DialogTitle>
        <DialogContent>
          <Typography>Tu pregunta ha sido enviada exitosamente. Te contactaremos pronto.</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleClose} 
          sx={{backgroundColor: '#1b986e'}}>
            Volver al inicio
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EscribenosPage;
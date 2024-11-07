import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Button, Tooltip } from '@mui/material';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import usuarioApi from '../../../api/usuario';
import TextFieldComponent from './TextFieldComponent';
import SelectComponent from './SelectComponent';

// Estilos comunes de contenedor
const containerStyles = {
  padding: 2,
  marginLeft: { sm: '5vh', md: '10vh', lg: '30vh' },
  maxWidth: '100%'
};

const CheckoutForm = ({ userId, formData, setFormData, handleInputChange, isFormValid, handlePaymentClick }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    direccion,
    departamentoMzReferencia,
    distrito,
    celular,
    tipoDocumento,
    numeroDocumento,
    email,
    tipoSuscripcion
  } = formData;

  // Función para cargar datos del usuario si está logueado
  useEffect(() => {
    if (userId) {
      setIsLoggedIn(true);
      const fetchUserData = async () => {
        try {
          const userData = await usuarioApi.findOneComplete(userId);
          if (userData) {
            setFormData((prevData) => ({
              ...prevData,
              nombre: userData.nombre,
              apellidoPaterno: userData.apellido1,
              apellidoMaterno: userData.apellido2,
              celular: userData.celular,
              email: userData.email,
              numeroDocumento: userData.dni,
              direccion: userData.direccion,
              departamentoMzReferencia: userData.referencias || '',
              distrito: userData.distrito,
              tipoDocumento: userData.dni.length === 8 ? 'dni' : 'carnet',
            }));
          }
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
        }
      };
      fetchUserData();
    } else {
      setIsLoggedIn(false);
    }
  }, [setFormData]);

  return (
    <Grid item xs={12} md={8} lg={6.5}>
      <Box sx={containerStyles}>
        <Button onClick={() => navigate('/cart')} sx={{ marginBottom: 2, top: 16, color: '#1b986e' }}>← Volver</Button>
        <Typography variant="h5" gutterBottom>¡Estas muy cerca de tener tu kit!</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <PersonPinIcon fontSize="large" />
          <Typography sx={{ ml: 1, fontWeight: 'bold' }}>Completa algunos de tus datos</Typography>
        </Box>
        
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12}>
            <TextFieldComponent label="Nombre" name="nombre" value={nombre} onChange={handleInputChange} required disabled={isLoggedIn} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldComponent label="Apellido Paterno" name="apellidoPaterno" value={apellidoPaterno} onChange={handleInputChange} required disabled={isLoggedIn} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldComponent label="Apellido Materno" name="apellidoMaterno" value={apellidoMaterno} onChange={handleInputChange} required disabled={isLoggedIn} />
          </Grid>
          <Grid item xs={12}>
            <TextFieldComponent label="Dirección" name="direccion" value={direccion} onChange={handleInputChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextFieldComponent label="Nro. departamento, Mz., referencias, etc (opcional)" name="departamentoMzReferencia" value={departamentoMzReferencia} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldComponent label="Distrito" name="distrito" value={distrito} onChange={handleInputChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldComponent label="Celular" name="celular" value={celular} onChange={handleInputChange} required disabled={isLoggedIn} />
          </Grid>
          <Grid item xs={12}>
            <TextFieldComponent label="Correo electrónico" name="email" value={email} onChange={handleInputChange} required disabled={isLoggedIn} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectComponent
              label="Tipo de documento"
              name="tipoDocumento"
              value={tipoDocumento}
              onChange={handleInputChange}
              options={[
                { label: 'DNI', value: 'dni' },
                { label: 'Carnet de Extranjería', value: 'carnet' }
              ]}
              disabled={isLoggedIn}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldComponent label="Número de documento" name="numeroDocumento" value={numeroDocumento} onChange={handleInputChange} required disabled={isLoggedIn} />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2, ml: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ ml: 1, fontWeight: 'bold' }}>Elige el tipo de suscripción</Typography>
              <Tooltip title="Los productos de su kit se entregarán el 1 de cada mes según el plan contratado.">
                <InfoIcon sx={{ ml: 1 }} />
              </Tooltip>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectComponent
              label="Tipo de suscripción"
              name="tipoSuscripcion"
              value={tipoSuscripcion}
              onChange={handleInputChange}
              options={[
                { label: '3 meses', value: '3meses' },
                { label: '6 meses', value: '6meses' },
                { label: '1 año', value: '1anio' }
              ]}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="success"
            size="large"
            sx={{ borderRadius: '25px', padding: '14px 40px', fontSize: '16px', fontWeight: 'bold' }}
            disabled={!isFormValid}
            onClick={handlePaymentClick}
          >
            Pagar
          </Button>
        </Box>
      </Box>
    </Grid>
  )
}

export default CheckoutForm

import React from 'react'
import { Box, Grid, Typography, TextField, MenuItem, FormControl, InputLabel, Select, Button, Tooltip } from '@mui/material'
import PersonPinIcon from '@mui/icons-material/PersonPin'
import InfoIcon from '@mui/icons-material/Info'
import { useNavigate } from 'react-router-dom'

const CheckoutForm = ({ formData, handleInputChange, isFormValid, handlePaymentClick }) => {
  const navigate = useNavigate();
  const { nombre, apellidoPaterno, apellidoMaterno, direccion, departamentoMzReferencia, distrito, celular, tipoDocumento, numeroDocumento, email, tipoSuscripcion } = formData;

  // Estilos comunes para los campos
  const commonInputProps = {
    InputProps: { sx: { borderRadius: '25px' } },
    InputLabelProps: { sx: { pl: 1 } },
    variant: "outlined",
    fullWidth: true,
    onChange: handleInputChange // Quitamos 'required' para los campos opcionales
  }

  const formFields = [
    { label: 'Dirección', name: 'direccion', value: direccion, xs: 12, required: true },
    { label: 'Nro. departamento, Mz., referencias, etc (opcional)', name: 'departamentoMzReferencia', value: departamentoMzReferencia, xs: 12 },
    { label: 'Distrito', name: 'distrito', value: distrito, xs: 6, required: true },
    { label: 'Celular', name: 'celular', value: celular, xs: 6, required: true },
    { label: 'Correo electrónico', name: 'email', value: email, xs: 12, required: true }
  ];

  return (
    <Grid item xs={12} md={8} lg={6.5}>
      <Box sx={{ padding: 2, marginLeft: { sm: '5vh', md: '10vh', lg: '30vh' }, maxWidth: '100%' }}>
        <Button onClick={() => navigate('/cart')} sx={{ marginBottom: 2, top: 16, color: '#1b986e' }}>← Volver</Button>
        <Typography variant="h5" gutterBottom>¡Estas muy cerca de tener tu kit!</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <PersonPinIcon fontSize="large" />
          <Typography sx={{ ml: 1, fontWeight: 'bold' }}>Completa algunos de tus datos</Typography>
        </Box>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          {/* Campo Nombre completo */}
          <Grid item xs={12} sx={{ mt: 0.5 }}>
            <TextField
              label="Nombre"
              name="nombre"
              value={nombre}
              {...commonInputProps}
              required
            />
          </Grid>

          {/* Apellido Paterno y Apellido Materno */}
          <Grid item xs={12} sm={6} sx={{ mt: 0.5 }}>
            <TextField
              label="Apellido Paterno"
              name="apellidoPaterno"
              value={apellidoPaterno}
              {...commonInputProps}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mt: 0.5 }}>
            <TextField
              label="Apellido Materno"
              name="apellidoMaterno"
              value={apellidoMaterno}
              {...commonInputProps}
              required
            />
          </Grid>

          {formFields.map((field, index) => (
            <Grid item xs={12} sm={field.xs} key={index} sx={{ mt: 0.5 }}>
              <TextField
                label={field.label}
                name={field.name}
                value={field.value}
                {...commonInputProps}
                required={field.required ?? false}
              />
            </Grid>
          ))}

          {/* Tipo de documento y Número de documento */}
          <Grid item xs={12} sm={6} sx={{ mt: 0.5 }}>
            <FormControl fullWidth>
              <InputLabel sx={{ pl: 1 }}>Tipo de documento</InputLabel>
              <Select
                label="Tipo de documento"
                name="tipoDocumento"
                value={tipoDocumento}
                onChange={handleInputChange}
                sx={{ borderRadius: '25px', pl: 1 }}
              >
                <MenuItem value="dni">DNI</MenuItem>
                <MenuItem value="carnet">Carnet de Extranjería</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mt: 0.5 }}>
            <TextField
              label="Número de documento"
              name="numeroDocumento"
              value={numeroDocumento}
              {...commonInputProps}
              required
            />
          </Grid>

          {/* Título para la suscripción con icono */}
          <Grid item xs={12} sx={{ mt: 2, ml: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ ml: 1, fontWeight: 'bold' }}>Elige el tipo de suscripción</Typography>
              <Tooltip title="Los productos de su kit se entregarán el 1 de cada mes según el plan contratado.">
                <InfoIcon sx={{ ml: 1 }} />
              </Tooltip>
            </Box>
          </Grid>

          {/* Tipo de suscripción */}
          <Grid item xs={12} sm={6} sx={{ mt: 0.5 }}>
            <FormControl fullWidth>
              <InputLabel sx={{ pl: 1 }}>Tipo de suscripción</InputLabel>
              <Select
                label="Tipo de suscripción"
                name="tipoSuscripcion"
                value={tipoSuscripcion}
                onChange={handleInputChange}
                sx={{ borderRadius: '25px', pl: 1 }}
              >
                <MenuItem value="3meses">3 meses</MenuItem>
                <MenuItem value="6meses">6 meses</MenuItem>
                <MenuItem value="1anio">1 año</MenuItem>
              </Select>
            </FormControl>
          </Grid>

        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="success"
            size="large"
            sx={{ borderRadius: '25px', padding: { xs: '1vh 4vh', sm: '1.5vh 6vh', md: '1.5vh 8vh' }, fontSize: { xs: '14px', md: '16px' }, fontWeight: 'bold' }}
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

export default CheckoutForm;

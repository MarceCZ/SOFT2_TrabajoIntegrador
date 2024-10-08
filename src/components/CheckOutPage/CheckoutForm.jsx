import React from 'react';
import { Box, Grid, Typography, TextField, MenuItem, FormControl, InputLabel, Select, Button } from '@mui/material';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ formData, handleInputChange, isFormValid, handlePaymentClick }) => {
  const navigate = useNavigate();
  const { nombre, apellidos, direccion, departamentoMzReferencia, distrito, celular, tipoDocumento, numeroDocumento, email } = formData;

  // Estilos comunes para los campos
  const commonInputProps = {
    InputProps: { sx: { borderRadius: '25px' } },
    InputLabelProps: { sx: { pl: 1 } },
    variant: "outlined",
    fullWidth: true,
    onChange: handleInputChange // Quitamos 'required' para los campos opcionales
  }

  const formFields = [
    { label: 'Nombre', name: 'nombre', value: nombre, xs: 6, required: true },
    { label: 'Apellidos', name: 'apellidos', value: apellidos, xs: 6, required: true },
    { label: 'Dirección', name: 'direccion', value: direccion, xs: 12, required: true },
    { label: 'Nro. departamento, Mz., referencias, etc (opcional)', name: 'departamentoMzReferencia', value: departamentoMzReferencia, xs: 12 },
    { label: 'Distrito', name: 'distrito', value: distrito, xs: 6, required: true },
    { label: 'Celular', name: 'celular', value: celular, xs: 6, required: true },
    { label: 'Correo electrónico', name: 'email', value: email, xs: 12, required: true }
  ];

  return (
    <Grid item xs={6.5}>
      <Box sx={{ padding: 2, marginLeft: '30vh' }}>
        <Button onClick={() => navigate('/cart')} sx={{ marginBottom: 2, top: 16, color: '#1b986e' }}>← Volver</Button>
        <Typography variant="h5" gutterBottom>¡Estas muy cerca de tener tu kit!</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <PersonPinIcon fontSize="large" />
          <Typography sx={{ ml: 1, fontWeight: 'bold' }}>Completa algunos de tus datos</Typography>
        </Box>

        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          {formFields.map((field, index) => (
            <Grid item xs={field.xs} key={index} sx={{ mt: 0.5 }}> 
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
          <Grid item xs={6} sx={{ mt: 0.5 }}> 
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

          <Grid item xs={6} sx={{ mt: 0.5 }}>
            <TextField
              label="Número de documento"
              name="numeroDocumento"
              value={numeroDocumento}
              {...commonInputProps}
              required
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="success"
            size="large"
            sx={{ borderRadius: '25px', padding: '1.5vh 8vh', fontWeight: 'bold' }}
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

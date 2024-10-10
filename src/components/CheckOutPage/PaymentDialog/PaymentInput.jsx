import React from 'react'
import { TextField, Grid, IconButton, InputAdornment } from '@mui/material'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'

const PaymentInput = ({ formValues, formErrors, handleInputChange, showCvv, toggleShowCvv }) => {
  return (
    <>
      <TextField
        label="Número de tarjeta"
        name="cardNumber"
        value={formValues.cardNumber}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        error={!!formErrors.cardNumber}
        helperText={formErrors.cardNumber}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <img
                src="https://cdn-icons-png.freepik.com/512/7684/7684740.png"
                alt="card"
                style={{ width: 24 }}
              />
            </InputAdornment>
          ),
          inputProps: {
            maxLength: 19,
            pattern: "[0-9]*",
          },
          sx: { borderRadius: '15px' }
        }}
        placeholder="1234 5678 0912 3456"
        required
      />

      <Grid container spacing={2} sx={{ mt: 0.5 }}>
        <Grid item xs={6}>
          <TextField
            label="Válido hasta"
            name="expireDate"
            value={formValues.expireDate}
            onChange={handleInputChange}
            fullWidth
            placeholder="MM/AA"
            error={!!formErrors.expireDate}
            helperText={formErrors.expireDate}
            inputProps={{ maxLength: 5 }}
            InputProps={{
              sx: { borderRadius: '15px' }
            }}
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="CVV"
            name="cvv"
            value={formValues.cvv}
            onChange={handleInputChange}
            fullWidth
            type={showCvv ? 'text' : 'password'}
            placeholder="CVV2"
            error={!!formErrors.cvv}
            helperText={formErrors.cvv}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowCvv}>
                    {showCvv ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
              inputProps: { maxLength: 4 },
              sx: { borderRadius: '15px' }
            }}
            required
          />
        </Grid>
      </Grid>

      <TextField
        label="Nombre del titular"
        name="cardholderName"
        value={formValues.cardholderName}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        placeholder="Ingrese el nombre del titular"
        error={!!formErrors.cardholderName}
        helperText={formErrors.cardholderName}
        InputProps={{
          sx: { borderRadius: '15px' }
        }}
        sx={{ mt: 3 }}
        required
      />
    </>
  )
}

export default PaymentInput

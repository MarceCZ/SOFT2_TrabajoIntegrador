import React, { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, IconButton, InputAdornment } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import SecurityIcon from '@mui/icons-material/Security'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ConfirmationDialog from './ConfirmationDialog'

const PaymentDialog = ({ isDialogOpen, handleCloseDialog, totalCartPrice }) => {
  const [formValues, setFormValues] = useState({
    cardNumber: '',
    expireDate: '',
    cvv: '',
    cardholderName: ''
  })

  const [showCvv, setShowCvv] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

  // Manejar cambios en los campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'expireDate') {
      let formattedValue = value.replace(/\D/g, ''); 
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2)
      }
      setFormValues({ ...formValues, [name]: formattedValue });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  }

  const toggleShowCvv = () => {
    setShowCvv(!showCvv);
  }

  // Validar los campos del formulario
  const validateForm = () => {
    let errors = {};

    if (!formValues.cardNumber) {
      errors.cardNumber = 'Número de tarjeta vacío'
    }

    if (!formValues.expireDate) {
      errors.expireDate = 'Fecha de vencimiento vacía'
    }

    if (!formValues.cvv) {
      errors.cvv = 'Código de seguridad vacío'
    }

    if (!formValues.cardholderName) {
      errors.cardholderName = 'Nombre de titular vacío'
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0
  }

  const handlePaymentClick = () => {
    if (validateForm()) {
      handleCloseDialog()
      setIsConfirmationOpen(true)
    }
  }

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  }

  return (
    <>
      <Dialog
        open={isDialogOpen}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleCloseDialog();
          }
        }}
        disableEscapeKeyDown
        maxWidth="xs"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: '25px',
            padding: '15px',
            minHeight: '300px',
          }
        }}
      >
        <DialogTitle sx={{ 
              textAlign: 'center', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              position: 'relative',
              fontWeight: 'bold' }}>
          <SecurityIcon sx={{ mr: 1 }} />
          Tu compra es 100% segura
          <IconButton 
            onClick={handleCloseDialog} 
            edge="end" 
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
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
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handlePaymentClick}
            color="primary"
            variant="contained"
            fullWidth
            sx={{ borderRadius: '25px', padding: '12px', fontWeight: 'bold' }}
          >
            Pagar S/ {totalCartPrice.toFixed(2)}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de confirmación de pago */}
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        handleClose={handleCloseConfirmation}
      />
    </>
  )
}

export default PaymentDialog

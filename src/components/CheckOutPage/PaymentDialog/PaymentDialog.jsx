import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SecurityIcon from '@mui/icons-material/Security';
import ConfirmationDialog from '../ConfirmationDialog';
import CardInput from './PaymentInput';
import PaymentButton from './PaymentButton';
import suscripcionApi from '../../../api/suscripcion';

const PaymentDialog = ({ userId, isDialogOpen, handleCloseDialog, totalCartPrice, cartProducts, formData }) => {
  const [formValues, setFormValues] = useState({
    cardNumber: '',
    expireDate: '',
    cvv: '',
    cardholderName: ''
  });

  const [showCvv, setShowCvv] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Maneja el cambio de valores en el formulario, incluyendo el formateo específico para la tarjeta y la fecha de vencimiento
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    } else if (name === 'expireDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2);
      }
    }
    
    setFormValues({ ...formValues, [name]: formattedValue });
  };

  // Validación del formulario
  const validateForm = () => {
    const errors = {};

    if (!formValues.cardNumber) {
      errors.cardNumber = 'Número de tarjeta vacío';
    }

    if (!formValues.expireDate) {
      errors.expireDate = 'Fecha de vencimiento vacía';
    } else {
      const [month, year] = formValues.expireDate.split('/');
      if (!month || isNaN(month) || month < 1 || month > 12) {
        errors.expireDate = 'Mes no válido, debe ser un número entre 1 y 12';
      } else if (month && year) {
        const today = new Date();
        const expiryDate = new Date(`20${year}`, month - 1);
        if (expiryDate < today) {
          errors.expireDate = 'La tarjeta ha expirado';
        }
      }
    }

    if (!formValues.cvv) {
      errors.cvv = 'Código de seguridad vacío';
    }

    if (!formValues.cardholderName) {
      errors.cardholderName = 'Nombre de titular vacío';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Manejo del pago al enviar el formulario
  const handlePayment = async () => {
    if (!validateForm()) return;
    setErrorMessage('');

    const payload = {
      userId,
      subsType: formData.tipoSuscripcion,
      totalCartPrice,
      cartProducts: cartProducts.map(product => ({
        productId: product.id,
        cantidad: product.cantidad,
        recetaId: product.receta || null
      }))
    };

    try {
      const response = await suscripcionApi.create(payload);

      if (response.status === 200) {
        console.log('Subscripción creada con éxito:', response.data);
        setIsConfirmationOpen(true);
        setFormValues({
          cardNumber: '',
          expireDate: '',
          cvv: '',
          cardholderName: ''
        }); // Limpiar formulario después de éxito
        handleCloseDialog();
      } else {
        setErrorMessage("No se pudo registrar su kit. Intente de nuevo más tarde.");
      }
    } catch (error) {
      setErrorMessage("Se tuvo un problema para procesar el pago. Intente de nuevo más tarde.");
    }
  };

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
          <CardInput
            formValues={formValues}
            formErrors={formErrors}
            handleInputChange={handleInputChange}
            showCvv={showCvv}
            toggleShowCvv={() => setShowCvv(!showCvv)}
          />
        </DialogContent>

        <DialogActions>
          <PaymentButton totalCartPrice={totalCartPrice} handlePaymentClick={handlePayment} />
        </DialogActions>

        {errorMessage && (
          <Alert
            severity="error"
            sx={{
              margin: '1vh 2vh 0vh 2vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'justify',
              '.MuiAlert-icon': {
                alignSelf: 'center',
                marginRight: '0.5rem',
                fontSize: '2rem'
              }
            }}
            onClose={() => setErrorMessage('')}
          >
            {errorMessage}
          </Alert>
        )}
      </Dialog>

      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        handleClose={() => setIsConfirmationOpen(false)}
      />
    </>
  )
}

export default PaymentDialog

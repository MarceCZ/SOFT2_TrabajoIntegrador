import React, { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import SecurityIcon from '@mui/icons-material/Security'
import ConfirmationDialog from '../ConfirmationDialog'
import CardInput from './PaymentInput'
import PaymentButton from './PaymentButton'

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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'expireDate') {
      let formattedValue = value.replace(/\D/g, '')
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2)
      }
      setFormValues({ ...formValues, [name]: formattedValue })
    } else {
      setFormValues({ ...formValues, [name]: value })
    }
  }

  const toggleShowCvv = () => {
    setShowCvv(!showCvv)
  }

  const validateForm = () => {
    let errors = {}

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

    setFormErrors(errors)

    return Object.keys(errors).length === 0
  }

  const handlePaymentClick = () => {
    if (validateForm()) {
      handleCloseDialog()
      setIsConfirmationOpen(true)
    }
  }

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false)
  }

  return (
    <>
      <Dialog
        open={isDialogOpen}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleCloseDialog()
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
            toggleShowCvv={toggleShowCvv}
          />
        </DialogContent>

        <DialogActions>
          <PaymentButton totalCartPrice={totalCartPrice} handlePaymentClick={handlePaymentClick} />
        </DialogActions>
      </Dialog>

      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        handleClose={handleCloseConfirmation}
      />
    </>
  )
}

export default PaymentDialog

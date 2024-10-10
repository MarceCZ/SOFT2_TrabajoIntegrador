import React from 'react'
import { Button } from '@mui/material'

const PaymentButton = ({ totalCartPrice, handlePaymentClick }) => {
  return (
    <Button
      onClick={handlePaymentClick}
      color="primary"
      variant="contained"
      fullWidth
      sx={{ borderRadius: '25px', padding: '12px', fontWeight: 'bold' }}
    >
      Pagar S/ {totalCartPrice.toFixed(2)}
    </Button>
  )
}

export default PaymentButton

import { useState } from 'react';

//cerrar y abrir popup de pago
const ValidatePaymentDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePaymentClick = (isFormValid) => {
    if (isFormValid) {
      setIsDialogOpen(true);
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  }

  return { isDialogOpen, handlePaymentClick, handleCloseDialog }
}

export default ValidatePaymentDialog

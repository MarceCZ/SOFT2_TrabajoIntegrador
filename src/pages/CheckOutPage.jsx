import React, { useContext } from 'react';
import { Grid, Toolbar } from '@mui/material';
import Header from '../components/Header';
import { CartContext } from '../components/CartContext';
import CheckoutForm from '../components/CheckOutPage/CheckoutForm/CheckoutForm';
import KitSummary from '../components/CheckOutPage/KitSummary/KitSummary';
import PaymentDialog from '../components/CheckOutPage/PaymentDialog/PaymentDialog';
import useCheckoutForm from '../components/CheckOutPage/CheckoutForm/ValidateCheckoutForm';
import usePaymentDialog from '../components/CheckOutPage/PaymentDialog/ValidatePaymentDialog';

// Parte visual de la página de checkout
const CheckOutPage = () => {
  const { cartProducts, totalCartPrice } = useContext(CartContext);
  const { formData, setFormData, isFormValid, handleInputChange } = useCheckoutForm();
  const { isDialogOpen, handlePaymentClick, handleCloseDialog } = usePaymentDialog();

  const userId = sessionStorage.getItem('userId');

  return (
    <div>
      <Header />
      <Toolbar/>
      <Grid container>
        {/* Formulario */}
        <CheckoutForm
          userId = {userId}
          formData={formData}
          setFormData={setFormData} 
          handleInputChange={handleInputChange}
          isFormValid={isFormValid}
          handlePaymentClick={() => handlePaymentClick(isFormValid)}
        />
        {/* Resumen de compra */}
        <KitSummary cartProducts={cartProducts} totalCartPrice={totalCartPrice} />
      </Grid>

      {/* Popup de pasarela de pago */}
      <PaymentDialog
        userId={userId}
        isDialogOpen={isDialogOpen}
        handleCloseDialog={handleCloseDialog}
        totalCartPrice={totalCartPrice}
        cartProducts={cartProducts}
        formData={formData}
      />
    </div>
  )
}

export default CheckOutPage

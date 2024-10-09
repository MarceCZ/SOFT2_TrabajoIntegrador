import React, { useState, useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import Header from '../components/Header';
import { CartContext } from '../components/CartContext';
import CheckoutForm from '../components/CheckOutPage/CheckoutForm';
import KitSummary from '../components/CheckOutPage/KitSummary';
import PaymentDialog from '../components/CheckOutPage/PaymentDialog';

const CheckOutPage = () => {
  const { cartProducts, totalCartPrice } = useContext(CartContext);

  const [formData, setFormData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    direccion: '',
    departamentoMzReferencia: '',
    distrito: '',
    celular: '',
    tipoDocumento: 'dni',
    numeroDocumento: '',
    email: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      direccion,
      distrito,
      celular,
      numeroDocumento,
      email,
    } = formData;

    const isValid =
      nombre &&
      apellidoPaterno &&
      apellidoMaterno &&
      direccion &&
      distrito &&
      celular &&
      numeroDocumento &&
      email;

    setIsFormValid(isValid);
  }, [formData]);

  const handlePaymentClick = () => {
    if (isFormValid) {
      setIsDialogOpen(true);
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  }

  return (
    <div>
      <Header />
      <Grid container>
        {/* Formulario */}
        <CheckoutForm
          formData={formData}
          handleInputChange={handleInputChange}
          isFormValid={isFormValid}
          handlePaymentClick={handlePaymentClick}
        />
        {/* Resumen de compra */}
        <KitSummary cartProducts={cartProducts} totalCartPrice={totalCartPrice} />
      </Grid>

      {/* Popup de pasarela de pago */}
      <PaymentDialog
        isDialogOpen={isDialogOpen}
        handleCloseDialog={handleCloseDialog}
        totalCartPrice={totalCartPrice}
      />
    </div>
  )
}

export default CheckOutPage

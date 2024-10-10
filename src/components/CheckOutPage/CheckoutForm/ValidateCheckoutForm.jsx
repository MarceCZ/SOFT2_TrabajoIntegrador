import { useState, useEffect } from 'react';

//validación de formulario de checkout
const ValidateCheckoutForm = () => {
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
  })

  const [isFormValid, setIsFormValid] = useState(false);

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

    setIsFormValid(isValid)
  }, [formData])

  return { formData, isFormValid, handleInputChange }
}

export default ValidateCheckoutForm

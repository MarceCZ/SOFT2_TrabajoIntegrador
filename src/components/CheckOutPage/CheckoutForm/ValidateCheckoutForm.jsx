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
    tipoSuscripcion: '', // Añadimos tipoSuscripcion al estado inicial
  });

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
      tipoSuscripcion, // Incluimos tipoSuscripcion en la validación
    } = formData;

    // Validamos que todos los campos requeridos y tipoSuscripcion estén llenos
    const isValid =
      nombre &&
      apellidoPaterno &&
      apellidoMaterno &&
      direccion &&
      distrito &&
      celular &&
      numeroDocumento &&
      email &&
      tipoSuscripcion; // Verificamos que tipoSuscripcion no esté vacío

    setIsFormValid(isValid);
  }, [formData]);

  return { formData, isFormValid, handleInputChange };
};

export default ValidateCheckoutForm;

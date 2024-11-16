import { useState, useEffect } from 'react';

// Validación de formulario de checkout
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
    let newValue = value;

    // Aplicar restricciones específicas para cada campo
    if (name === "nombre" || name === "apellidoPaterno" || name === "apellidoMaterno") {
      // Solo permitir letras y espacios
      newValue = newValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    }

    if (name === "celular") {
      // Solo permitir números y máximo de 9 dígitos
      newValue = newValue.replace(/[^0-9]/g, '').slice(0, 9);
    }

    if (name === "numeroDocumento") {
      if (formData.tipoDocumento === "dni") {
        // Solo permitir números y exactamente 8 dígitos para DNI
        newValue = newValue.replace(/[^0-9]/g, '').slice(0, 8);
      } else if (formData.tipoDocumento === "carnet") {
        // Permitir números y letras para Carnet de extranjería y máximo de 12 caracteres
        newValue = newValue.replace(/[^a-zA-Z0-9]/g, '').slice(0, 12);
      }
    }

    if (name === "distrito") {
      // El distrito puede contener letras, números y espacios
      newValue = newValue.replace(/[^a-zA-Z0-9\s]/g, '');
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  // Funciones de validación
  const isOnlyLetters = (text) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(text);
  const isLettersAndNumbers = (text) => /^[a-zA-Z0-9\s]+$/.test(text);
  const isValidPhoneNumber = (text) => /^\d{9}$/.test(text);
  const isValidEmail = (text) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(text);
  const isValidDNI = (text) => /^\d{8}$/.test(text);
  const isValidCarnet = (text) => /^[a-zA-Z0-9]{1,12}$/.test(text);

  const validateForm = () => {
    const {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      direccion,
      distrito,
      celular,
      numeroDocumento,
      email,
      tipoSuscripcion,
      tipoDocumento,
    } = formData;

    // Verificar que todos los campos requeridos cumplan con las validaciones
    const isFormComplete = 
      isOnlyLetters(nombre) &&
      isOnlyLetters(apellidoPaterno) &&
      isOnlyLetters(apellidoMaterno) &&
      direccion.trim() !== '' &&
      isLettersAndNumbers(distrito) && 
      isValidPhoneNumber(celular) &&
      isValidEmail(email) &&
      tipoSuscripcion &&
      ((tipoDocumento === 'dni' && isValidDNI(numeroDocumento)) ||
       (tipoDocumento === 'carnet' && isValidCarnet(numeroDocumento)))

    setIsFormValid(isFormComplete);
  }

  useEffect(() => {
    validateForm()
  }, [
    formData.nombre,
    formData.apellidoPaterno,
    formData.apellidoMaterno,
    formData.direccion,
    formData.distrito,
    formData.celular,
    formData.numeroDocumento,
    formData.email,
    formData.tipoSuscripcion,
    formData.tipoDocumento,
  ])

  return { formData, setFormData, isFormValid, handleInputChange }
}

export default ValidateCheckoutForm

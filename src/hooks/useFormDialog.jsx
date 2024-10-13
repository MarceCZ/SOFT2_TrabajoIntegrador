import { useState, useEffect } from 'react';
import productoApi from '../api/producto';

export const useFormDialog = (idBotica, open,handleClose) => {
    const[error, setError] = useState(null);
  const[stock, setStock] = useState(null);
  const[precio, setPrecio] = useState(null);
  const [producto, setProducto] = useState({
    imagen: '',
    nombre: '',
    marca: '',
    presentacion: '',
    descripcion: '',
    precio: '',
    stock: '',
    contraindicaciones: '',
    advertencias: '',
    receta: false,
    idBotica: idBotica,
  });

  useEffect(() => {
    limpiarFormulario();
  }, [open]);


  

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    if (name === 'stock') {
      if (/^\d*$/.test(value)) {
        setStock(parseInt(value));
      }
    } else if (name === 'precio') {
      if (/^\d*\.?\d{0,2}$/.test(value)) {
        setPrecio(value);
      }
    } 
    setError(null);
    setProducto({ ...producto, [name]: type === 'checkbox' ? checked : value });
  };


  const validarProducto = () => {
    if (!producto.imagen || !producto.nombre || !producto.marca || !producto.presentacion || !producto.descripcion || !producto.precio || !producto.stock || !producto.contraindicaciones || !producto.advertencias) {
      setError('Todos los campos son obligatorios');
      return false;
    } else{ 
        if(producto.precio <= 0 && producto.stock <= 0){
            setError('El precio y el stock deben ser mayores a 0');
            return false;
        } else if (producto.precio <= 0 ) {
        setError('El precio debe ser mayor a 0');
        return false;
        } else if (producto.stock <= 0) {
        setError('El stock debe ser mayor a 0');
        return false;
        }
    }
    setError(null);
    return true;
  };

  const limpiarFormulario = () => {
    setProducto({
      imagen: '',
      nombre: '',
      marca: '',
      presentacion: '',
      descripcion: '',
      precio: '',
      stock: '',
      contraindicaciones: '',
      advertencias: '',
      receta: false,
      idBotica: idBotica,
    });
    setStock(null);
    setPrecio(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarProducto()) {
      setTimeout(() => { setError(null); }, 3000);
      return;
    }
    console.log(producto);
    try {
      const payload = {
          ...producto
      };

      
      await productoApi.create(payload);
      
      handleClose();
    } catch (error) {
        console.error('Error al guardar el producto:', error);
    }
  };

    return {
        producto,
        error,
        stock,
        precio,
        handleChange,
        handleSubmit
    };

};
import { useState, useEffect } from 'react';
import productoApi from '../api/producto';

export const useFormDialogStock = ( open,handleClose, idProducto) => {
    const[error, setError] = useState(null);
  const[stock, setStock] = useState(null);
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
    idBotica: 0,
    createdAt: '',
    updatedAt: ''
  });

  useEffect(() => {
    limpiarFormulario();
    if(idProducto){
      
      fetchProducto();
    }
  }, [open]);

  const fetchProducto = async () => {
    try {
      const productoData = await productoApi.findOne(idProducto);
      setProducto(productoData);
      setStock(productoData.stock);
    } catch (error) {
        console.error('Error al cargar el producto:', error);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'stock') {
      if (/^\d*$/.test(value)) {
        setStock(parseInt(value));
      }
    } 
    setError(null);
    setProducto({ ...producto, [name]: value });
  };


  const validarProducto = () => {
    if (!producto.stock) {
      setError('No se ingreso stock');
      return false;
    } else if (producto.stock <= 0) {
      setError('El stock debe ser mayor a 0');
      return false;
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
      idBotica: 0,
      createdAt: '',
      updatedAt: ''
    });
    setStock(null);
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

      
      await productoApi.update(payload);
      
      handleClose();
    } catch (error) {
        console.error('Error al actualizar el stock del producto:', error);
    }
  };

    return {
        producto,
        error,
        stock,
        handleChange,
        handleSubmit
    };

};
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Stack,
} from '@mui/material';

import productoApi from '../api/producto';
import { set } from 'lodash';

const FormDialog = ({ open, handleClose, idBotica }) => {
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
        setStock(value);
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
    } else if (producto.precio <= 0 ) {
      setError('El precio debe ser mayor a 0');
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
return (
  <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
    <DialogTitle>Añadir Producto</DialogTitle>
    <DialogContent>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction="row" spacing={2}>
          
          <Box width={'33%'}>
            <TextField
              margin="dense"
              name="imagen"
              label="URL de imagen"
              fullWidth
              variant="outlined"
              onChange={handleChange}
            />
            {producto.imagen && (
              <img src={producto.imagen} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px', maxHeight: '150px' }} />
            )}
          </Box>
          <Box width={'33%'}>
            <TextField
              margin="dense"
              name="nombre"
              label="Nombre"
              fullWidth
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="marca"
              label="Marca"
              fullWidth
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="presentacion"
              label="Presentación"
              fullWidth
              variant="outlined"
              onChange={handleChange}
            />
          </Box>
          <Box width={'33%'}>
            <TextField
              margin="dense"
              name="descripcion"
              label="Descripción"
              fullWidth
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="precio"
              value={precio}
              label="Precio"
              type="number"
              fullWidth
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="stock"
              label="Stock"
              type="number"
              fullWidth
              value={stock}
              variant="outlined"
              onChange={handleChange}
            />
          </Box>
          </Stack>
        </Stack>
        <Box>
            <TextField
              margin="dense"
              name="contraindicaciones"
              label="Contraindicaciones"
              fullWidth
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="advertencias"
              label="Advertencias"
              fullWidth
              variant="outlined"
              onChange={handleChange}
            />
          </Box>
        <Stack spacing={3}>


        </Stack>
        <FormControlLabel
          control={
            <Checkbox
              name="receta"
              checked={producto.receta}
              onChange={handleChange}
            />
          }
          label="Necesita Receta"
        />
      </form>
      {error ? <p style={{ color: 'red' }}>{error}</p> : <p>&nbsp;</p>}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancelar
      </Button>
      <Button type="submit" color="primary" onClick={handleSubmit}>
        Enviar
      </Button>
    </DialogActions>
  </Dialog>
);
};

export default FormDialog;



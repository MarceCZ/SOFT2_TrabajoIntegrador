import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
    Grid,
} from '@mui/material';

import productoApi from '../api/producto';

const FormDialog = ({ open, handleClose }) => {
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
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setProducto({ ...producto, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
          <Grid container spacing={3}>
            {/* Primera columna */}
            <Grid item xs={12} sm={4}>
              <TextField
                margin="dense"
                name="imagen"
                label="URL de imagen"
                fullWidth
                variant="outlined"
                onChange={handleChange}
              />
              {producto.imagen && (
                <img src={producto.imagen} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />
              )}
            </Grid>
            {/* Segunda columna */}
            <Grid item xs={12} sm={4}>
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
                label="Categoría"
                fullWidth
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            {/* Tercera columna */}
            <Grid item xs={12} sm={4}>
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
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            {/* Cuarta columna */}
            <Grid item xs={12} sm={12}>
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
            </Grid>
          </Grid>
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


/*

import { useState } from 'react';

import FormDialog from '../components/FormDialog';
import Button from '@mui/material/Button';


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
      <Button variant="outlined" onClick={handleClickOpen}>
        Abrir Formulario
      </Button>
      <FormDialog open={open} handleClose={handleClose} />
*/
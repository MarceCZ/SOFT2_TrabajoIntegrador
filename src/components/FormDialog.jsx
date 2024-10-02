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

const FormDialog = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    imageUrl: '',
    name: '',
    brand: '',
    category: '',
    description: '',
    price: '',
    stock: '',
    contraindicaciones: '',
    advertencias: '',
    receta: false,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    handleClose();
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
                name="imageUrl"
                label="URL de imagen"
                fullWidth
                variant="outlined"
                onChange={handleChange}
              />
              {formData.imageUrl && (
                <img src={formData.imageUrl} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />
              )}
            </Grid>
            {/* Segunda columna */}
            <Grid item xs={12} sm={4}>
              <TextField
                margin="dense"
                name="name"
                label="Nombre"
                fullWidth
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="brand"
                label="Marca"
                fullWidth
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="category"
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
                name="description"
                label="Descripción"
                fullWidth
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="price"
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
                checked={formData.receta}
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
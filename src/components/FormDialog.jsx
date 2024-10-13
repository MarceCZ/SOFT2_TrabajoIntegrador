import React from 'react';
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
  Typography
} from '@mui/material';
import { useFormDialog } from '../hooks/useFormDialog';

const FormDialog = ({ open, handleClose, idBotica }) => {
  const {producto,
    error,
    stock,
    precio,
    handleChange,
    handleSubmit} =  useFormDialog(idBotica, open, handleClose);
  
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
      {error ? <Typography color='red'>{error}</Typography> : <Typography>&nbsp;</Typography>}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} sx={{ mt: 2, borderColor: '#1b986e', color: '#1b986e' }}>
        Cancelar
      </Button>
      <Button type="submit" onClick={handleSubmit} sx={{
              mt: 2,
              backgroundColor: '#1b986e',  
              color: '#fff',                
              '&:hover': {
               backgroundColor: '#157a57', 
              },
            }}>
        Enviar
      </Button>
    </DialogActions>
  </Dialog>
);
};

export default FormDialog;



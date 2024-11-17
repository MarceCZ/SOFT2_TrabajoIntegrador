import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
  Stack,
  Typography
} from '@mui/material';
import { useFormDialogStock } from '../hooks/useFormDialogStock';

const FormDialogStock = ({ open, handleClose, idProducto }) => {
  const {producto,
    error,
    stock,
    handleChange,
    handleSubmit} =  useFormDialogStock( open, handleClose,idProducto);
  
return (
  <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
    <DialogTitle>Editar Stock</DialogTitle>
    <DialogContent>
    <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h6">{producto.nombre}</Typography>
            </Box>
            <Box>
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
        Actualizar
      </Button>
    </DialogActions>
  </Dialog>
);
};

export default FormDialogStock;



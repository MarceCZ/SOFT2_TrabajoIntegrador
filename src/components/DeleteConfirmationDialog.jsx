import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const DeleteConfirmationDialog = ({ open, onConfirm, onCancel }) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Confirmar eliminación</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Está seguro que desea eliminar este producto? Esta acción no se puede deshacer.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} sx={{
              mt: 2,
              backgroundColor: '#1b986e',  
              color: '#fff',                
              '&:hover': {
               backgroundColor: '#157a57', 
              },
            }} autoFocus>
          Cancelar
        </Button>
        <Button onClick={onConfirm} sx={{ mt: 2, borderColor: '#1b986e', color: '#1b986e' }}>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
import React, { useContext } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../CartContext'

const ConfirmationDialog = ({ isOpen, handleClose }) => {
  const navigate = useNavigate()
  const { clearCart } = useContext(CartContext)

  const handleBackToHome = () => {
    clearCart()
    navigate('/')
  }

  return (
    <Dialog
      open={isOpen}
      disableEscapeKeyDown
      maxWidth="xs"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: '25px',
          padding: '15px',
          minHeight: '250px',
        }
      }}
      BackdropProps={{ style: { pointerEvents: 'none' } }}
    >
      <DialogTitle sx={{ 
            textAlign: 'center', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            position: 'relative',
            fontWeight: 'bold',
            marginBottom: '10px' 
      }}>
        Pago Realizado
      </DialogTitle>

      <DialogContent sx={{ textAlign: 'center' }}>
        <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                marginBottom: '15px' }}>
            <img 
                src="https://cdn-icons-png.flaticon.com/512/5290/5290058.png" 
                alt="Check"
                style={{ width: 100 }}
            />
        </div>
        <Typography sx={{ marginTop: '20px' }}>
          En breves recibirá un correo con los detalles de su suscripción.
        </Typography>
      </DialogContent>

      <DialogActions>
      <Button
        onClick={handleBackToHome}
        variant="contained"
        fullWidth
        sx={{ 
          backgroundColor: '#2c3e50', 
          borderRadius: '25px', 
          padding: '12px', 
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#1a242f',  
          }
        }}
      >
        Volver a la página principal
      </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog

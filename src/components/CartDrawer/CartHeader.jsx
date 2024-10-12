import {Box, Typography } from '@mui/material';

const CartHeader = () => {
    return (
        <>
        <Box sx={{ paddingTop: 1, paddingLeft: 2, display: 'flex', alignItems: 'center', mb: 1 }}>
          <img 
            src="https://cdn-icons-png.freepik.com/512/8861/8861108.png" 
            alt="Mi kit" 
            style={{ width: 40, height: 40, marginRight: 15 }} 
          />  
          <Typography variant="h6" sx={{ mb: 0, fontWeight: 'bold' }}> 
            Mi kit
          </Typography>
        </Box>
        </>
    )
}

export default CartHeader;
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const ModifyProductQuantity = ({ item, minusOne, plusOne, handleRemove }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      borderRadius: '25px',
      border: '1px solid #e5e7eb',
      padding: '5px 10px',
      justifyContent: 'space-between',
      width: { xs: '100px', md: '120px' },
      margin: '0 auto',
    }}
  >
    {item.cantidad > 1 ? (
      <IconButton onClick={() => minusOne(item)} sx={{ padding: 0 }}>
        <RemoveIcon />
      </IconButton>
    ) : (
      <IconButton onClick={() => handleRemove(item)} sx={{ padding: 0 }}>
        <DeleteIcon />
      </IconButton>
    )}
    <Typography sx={{ mx: 1 }}>{item.cantidad}</Typography>
    <IconButton onClick={() => plusOne(item)} sx={{ padding: 0 }}>
      <AddIcon />
    </IconButton>
  </Box>
)

export default ModifyProductQuantity

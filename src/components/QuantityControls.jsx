import React, { useContext } from 'react'
import { IconButton, Typography, Paper, Button } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteIcon from '@mui/icons-material/Delete'
import { CartContext } from './CartContext'

const QuantityControls = ({ product, cantidad }) => {
    const { modifyQuantity, removeFromCart } = useContext(CartContext);

    const addOne = (event) => {
        event.stopPropagation();
        modifyQuantity(product, 1); // Incrementar la cantidad
    }

    const minusOne = (event) => {
        event.stopPropagation();
        if (cantidad > 1) {
            modifyQuantity(product, -1); // Decrementar la cantidad
        } else {
            removeFromCart(product); // Eliminar si la cantidad es 1
        }
    }

    return (
        <>
            {cantidad === 0 ? (
                <Button
                    onClick={addOne}
                    size="medium"
                    sx={{ color: 'green', padding: 0, minWidth: 'unset' }}>
                    <AddCircleOutlineIcon fontSize="large" />
                </Button>
            ) : (
                <Paper elevation={3}  sx={{ display: 'flex', alignItems: 'center', borderRadius: '30px', padding: '4px 5px' }}>
                    <IconButton onClick={minusOne}>
                        {cantidad > 1 ? <RemoveIcon /> : <DeleteIcon color="error"/>}
                    </IconButton>
                    <Typography variant="h6" sx={{ margin: '0 15px' }}>{cantidad}</Typography>
                    <IconButton onClick={addOne}>
                        <AddIcon />
                    </IconButton>
                </Paper>
            )}
        </>
    )
}

export default QuantityControls

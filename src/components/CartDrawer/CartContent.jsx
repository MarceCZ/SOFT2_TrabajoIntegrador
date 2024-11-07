import React, { useState, useEffect } from 'react';
import EmptyCartDrawer from './EmptyCartDrawer';
import CartDrawerWithProducts from './CartDrawerWithProducts';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Typography } from '@mui/material';

const CartContent = ({ cartProducts, handleRemove, totalCartPrice }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <CircularProgress/>
                <Typography sx={{ mt: 2 }}>Cargando kit...</Typography>
            </Box>
        );
    }

    return (
        <>
            {cartProducts.length === 0 ? (
                <EmptyCartDrawer />
            ) : (
                <CartDrawerWithProducts
                    cartProducts={cartProducts}
                    handleRemove={handleRemove}
                    totalCartPrice={totalCartPrice}
                    navigate={navigate}
                />
            )}
        </>
    )
}

export default CartContent

import EmptyCart from './EmptyCart';
import CartListProducts from './CartListProducts';
import CartKitSummary from './CartKitSummary';
import useCart from '../../hooks/useCart';
import { Box, Grid, Typography } from '@mui/material';

const CartPageBody = () => {
    const { cartProducts, handleRemove, minusOne, plusOne, totalCartPrice } = useCart()

    return(
        <>
        <Box sx={{ padding: { xs: '10px', sm: '20px' } }}>
            {cartProducts.length === 0 ? (
            <EmptyCart />
            ) : (
            <>
                <Typography
                variant="h6"
                sx={{ mb: 2, ml: 1, fontWeight: 'bold', fontSize: { xs: '18px', md: '24px' } }}
                >
                Mi kit ({cartProducts.length})
                </Typography>
                <Grid container spacing={3}>
                <Grid item xs={12} md={9}>
                    <CartListProducts
                    cartProducts={cartProducts}
                    minusOne={minusOne}
                    plusOne={plusOne}
                    handleRemove={handleRemove}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <CartKitSummary totalCartPrice={totalCartPrice} />
                </Grid>
                </Grid>
            </>
            )}
        </Box>
        </>
    )
}

export default CartPageBody
import React from 'react'
import EmptyCartDrawer from './EmptyCartDrawer'
import CartDrawerWithProducts from './CartDrawerWithProducts'
import { useNavigate } from 'react-router-dom'

const CartContent = ({ cartProducts, handleRemove, totalCartPrice }) => {
    const navigate = useNavigate()

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

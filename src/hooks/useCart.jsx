import { useContext } from 'react';
import { CartContext } from '../components/CartContext'

const useCart = () => {
  const { cartProducts, removeFromCart, addToCart, totalCartPrice } = useContext(CartContext)

  const handleRemove = (product) => {
    removeFromCart(product)
  }

  const minusOne = (product) => {
    if (product.cantidad > 1) {
      addToCart(product, -1)
    } else {
      removeFromCart(product)
    }
  }

  const plusOne = (product) => {
    addToCart(product, 1)
  }

  return { cartProducts, handleRemove, minusOne, plusOne, totalCartPrice }
}

export default useCart

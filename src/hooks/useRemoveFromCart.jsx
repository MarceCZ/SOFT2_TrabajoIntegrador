import { useContext } from 'react';
import { CartContext } from '../components/CartContext'

const useCartActions = () => {
    const { removeFromCart } = useContext(CartContext);
  
    const handleRemove = (product) => {
      removeFromCart(product);
    };
  
    return { handleRemove };
};

export default useCartActions;
  
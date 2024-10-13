import { useState, useContext } from 'react';
import { CartContext } from '../../components/CartContext.jsx';

const useCartDrawer = () => {
  const { totalProducts } = useContext(CartContext);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const toggleCartDrawer = (open) => () => {
    setIsCartDrawerOpen(open);
  };

  return {
    isCartDrawerOpen,
    toggleCartDrawer,
    totalProducts,
  };
};

export default useCartDrawer;

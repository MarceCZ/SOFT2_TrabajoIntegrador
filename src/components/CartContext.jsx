import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Estado inicial: kit vacío
  const [cartProducts, setCartProducts] = useState(() => {
    const savedCart = localStorage.getItem("cart")
    return savedCart ? JSON.parse(savedCart) : []
  })

  // guardar LocalStorage productos del kit para que no desaparezcan con f5
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartProducts));
  }, [cartProducts])

  // Función para agregar productos al kit
  const addToCart = (product, cantidad) => {
    setCartProducts((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id ? { ...item, cantidad: item.cantidad + cantidad } : item
        );
      } else {
        return [...prevItems, { ...product, cantidad }];
      }
    })
  }

  // Función para eliminar productos del kit
  const removeFromCart = (product) => {
    setCartProducts((prevItems) => prevItems.filter(item => item.id !== product.id));
  }

  // Función para vaciar el kit
  const clearCart = () => {
    setCartProducts([])
  }

  // Total de productos y precios
  const totalProducts = cartProducts.length
  const totalItemsInCart = cartProducts.reduce((acc, item) => acc + item.cantidad, 0)
  const totalCartPrice = cartProducts.reduce((acc, item) => acc + item.precio * item.cantidad, 0) 

  return (
    <CartContext.Provider 
      value={{ 
        cartProducts, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        totalProducts, 
        totalItemsInCart, 
        totalCartPrice 
      }}>
      {children}
    </CartContext.Provider>
  )
}

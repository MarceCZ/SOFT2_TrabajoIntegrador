import React, { createContext, useState } from 'react'
import '../App.css'

export const CartContext = createContext()

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([])

  
  const addToCart = (product, cantidad) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id ? { ...item, cantidad: item.cantidad + cantidad } : item
        );
      } else {
        return [...prevItems, { ...product, cantidad }]
      }
    })
  }

  const removeFromCart = (product) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== product.id));
  };

  const totalProducts = cartItems.length; 

  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.cantidad, 0);  

  const totalCartPrice = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0); 

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, totalProducts, totalItemsInCart, totalCartPrice }}>
      {children}
    </CartContext.Provider>
  )
}

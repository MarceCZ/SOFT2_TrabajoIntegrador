import React, { createContext, useState } from 'react';
import '../App.css';

// Crear el contexto del carrito
export const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);  // Estado del carrito

  // Función para agregar un producto al carrito
  const addToCart = (product, cantidad) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        return prevItems.map(item => 
          item.id === product.id ? { ...item, cantidad: item.cantidad + cantidad } : item
        );
      } else {
        // Si es un nuevo producto, lo añade al carrito
        return [...prevItems, { ...product, cantidad }];
      }
    })
  }

  // Función para eliminar un producto del carrito
  const removeFromCart = (product) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== product.id));
  };

  // Calcular el número de productos únicos en el carrito
  const totalUniqueItems = cartItems.length;  // Aquí se cuentan los productos únicos

  // Calcular el número total de unidades en el carrito
  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.cantidad, 0);  // Total de unidades

  // Calcular el precio total del carrito
  const totalCartPrice = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);  // Precio total

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, totalUniqueItems, totalItemsInCart, totalCartPrice }}>
      {children}
    </CartContext.Provider>
  );
};

import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto del filtro
export const FilterContext = createContext();

// Proveedor del contexto
export const FilterProvider = ({ children }) => {
  const [priceRange, setPriceRange] = useState([0, 100]); // Rango de precio inicial
  const [boticaName, setBoticaName] = useState(''); // Nombre de la botica

  // Cargar filtros desde localStorage al iniciar
  useEffect(() => {
    const savedPriceRange = JSON.parse(localStorage.getItem('priceRange'));
    const savedBoticaName = localStorage.getItem('boticaName');

    if (savedPriceRange) {
      setPriceRange(savedPriceRange);
    }
    if (savedBoticaName) {
      setBoticaName(savedBoticaName);
    }
  }, []); // Solo se ejecuta al montar el componente

  // Función para actualizar el rango de precios
  const updatePriceRange = (min, max) => {
    setPriceRange([min, max]);
  };

  // Función para actualizar el nombre de la botica
  const updateBoticaName = (name) => {
    setBoticaName(name);
  };

  // Función para filtrar productos
  const filterProducts = (products) => {
    return products.filter(product => 
      product.precio >= priceRange[0] && 
      product.precio <= priceRange[1] && 
      product.nombre.toLowerCase().includes(boticaName.toLowerCase())
    );
  };

  // Función para resetear los filtros
  const resetFilters = () => {
    setPriceRange([0, 100]);
    setBoticaName('');
  };

  // Guardar filtros en localStorage al cambiar
  useEffect(() => {
    localStorage.setItem('priceRange', JSON.stringify(priceRange));
    localStorage.setItem('boticaName', boticaName);
  }, [priceRange, boticaName]); // Se ejecuta cuando priceRange o boticaName cambian

  return (
    <FilterContext.Provider value={{ 
      priceRange, 
      updatePriceRange, 
      boticaName, 
      updateBoticaName, 
      filterProducts,
      resetFilters 
    }}>
      {children}
    </FilterContext.Provider>
  );
};


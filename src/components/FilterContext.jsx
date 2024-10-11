import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto del filtro
export const FilterContext = createContext();

// Proveedor del contexto
export const FilterProvider = ({ children }) => {
  const [priceRange, setPriceRange] = useState([0, 100]); // Rango de precio inicial
  const [boticaName, setBoticaName] = useState(''); // Nombre de la botica
  const [marcaName, setMarcaName] = useState(''); // Nombre de la marca

  // Cargar filtros desde localStorage al iniciar
  useEffect(() => {
    const savedPriceRange = JSON.parse(localStorage.getItem('priceRange'));
    const savedBoticaName = localStorage.getItem('boticaName');
    const savedMarcaName = localStorage.getItem('marcaName');

    if (savedPriceRange) {
      setPriceRange(savedPriceRange);
    }
    if (savedBoticaName) {
      setBoticaName(savedBoticaName);
    }
    if (savedMarcaName) {
      setMarcaName(savedMarcaName);
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

  // Función para actualizar el nombre de la marca
  const updateMarcaName = (name) => {
    setMarcaName(name);
  };

  // Función para filtrar productos
  const filterProducts = (products) => {
    return products.filter(product => 
      product.precio >= priceRange[0] && 
      product.precio <= priceRange[1] && 
      product.botica.toLowerCase().includes(boticaName.toLowerCase()) &&
      product.marca.toLowerCase().includes(marcaName.toLowerCase()) 
    );
  };

  // Función para resetear los filtros
  const resetFilters = () => {
    setPriceRange([0, 100]);
    setBoticaName('');
    setMarcaName(''); 
  };

  // Guardar filtros en localStorage al cambiar
  useEffect(() => {
    localStorage.setItem('priceRange', JSON.stringify(priceRange));
    localStorage.setItem('boticaName', boticaName);
    localStorage.setItem('marcaName', marcaName);
  }, [priceRange, boticaName, marcaName]); // Se ejecuta cuando priceRange, boticaName o marcaName cambian

  return (
    <FilterContext.Provider value={{ 
      priceRange, 
      updatePriceRange, 
      boticaName, 
      updateBoticaName,
      marcaName,
      updateMarcaName,
      filterProducts,
      resetFilters 
    }}>
      {children}
    </FilterContext.Provider>
  );
};

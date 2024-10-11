import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto del filtro
export const FilterContext = createContext();

// Proveedor del contexto
export const FilterProvider = ({ children }) => {
  const [priceRange, setPriceRange] = useState([0, 100]); // Rango de precio inicial
  const [boticaName, setBoticaName] = useState([]); // Lista de nombres de boticas
  const [marcaName, setMarcaName] = useState([]); // Lista de nombres de marcas
  const [medicamentoName, setMedicamentoName] = useState(''); // Nombre de medicamento

  useEffect(() => {
    try {
      const savedPriceRange = JSON.parse(localStorage.getItem('priceRange'));
      const savedBoticaName = JSON.parse(localStorage.getItem('boticaName')) || [];
      const savedMarcaName = JSON.parse(localStorage.getItem('marcaName')) || [];
      const savedMedicamentoName = localStorage.getItem('medicamentoName') || "";

      if (savedPriceRange && Array.isArray(savedPriceRange)) {
        setPriceRange(savedPriceRange);
      }
      if (Array.isArray(savedBoticaName)) {
        setBoticaName(savedBoticaName);
      }
      if (Array.isArray(savedMarcaName)) {
        setMarcaName(savedMarcaName);
      }
      if (savedMedicamentoName) {
        setMedicamentoName(savedMedicamentoName);
      }
    } catch (error) {
      console.error("Error parsing localStorage data: ", error);
    }
  }, []);

  // Función para actualizar el rango de precios
  const updatePriceRange = (min, max) => {
    setPriceRange([min, max]);
  };

  // Función para actualizar el nombre de la botica
  const updateBoticaName = (name, isChecked) => {
    setBoticaName(prevState =>
      isChecked ? [...prevState, name] : prevState.filter(item => item !== name)
    );
  };

  // Función para actualizar el nombre de la marca
  const updateMarcaName = (name, isChecked) => {
    setMarcaName(prevState =>
      isChecked ? [...prevState, name] : prevState.filter(item => item !== name)
    );
  };

  // FUnción para actualizar el nombre del medicamento
  const updateMedicamentoName = (name) => {
    setMedicamentoName(name);
  };

  // Función para filtrar productos
  const filterProducts = (products) => {
    return products.filter(product =>
      product.precio >= priceRange[0] &&
      product.precio <= priceRange[1] &&
      (boticaName.length === 0 || boticaName.includes(product.botica)) &&
      (marcaName.length === 0 || marcaName.includes(product.marca)) &&
      (medicamentoName === "" || product.nombre.toLowerCase().includes(medicamentoName.toLowerCase()))
    );
  };

  // Función para resetear los filtros
  const resetFilters = () => {
    setPriceRange([0, 100]);
    setBoticaName([]);
    setMarcaName([]);
    setMedicamentoName('');
  };

  // Guardar filtros en localStorage al cambiar
  useEffect(() => {
    localStorage.setItem('priceRange', JSON.stringify(priceRange));
    localStorage.setItem('boticaName', JSON.stringify(boticaName));
    localStorage.setItem('marcaName', JSON.stringify(marcaName));
    localStorage.setItem('medicamentoName', medicamentoName);
  }, [priceRange, boticaName, marcaName, medicamentoName]); // Se ejecuta cuando priceRange, boticaName o marcaName cambian

  return (
    <FilterContext.Provider value={{
      priceRange,
      updatePriceRange,
      boticaName,
      updateBoticaName,
      marcaName,
      updateMarcaName,
      medicamentoName,
      updateMedicamentoName,
      filterProducts,
      resetFilters
    }}>
      {children}
    </FilterContext.Provider>
  );
};

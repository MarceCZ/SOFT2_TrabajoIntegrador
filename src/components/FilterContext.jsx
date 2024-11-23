import React, { createContext, useState, useEffect } from 'react';
import apiProd from '../api/producto';

// Crear el contexto del filtro
export const FilterContext = createContext();

// Proveedor del contexto
export const FilterProvider = ({ children }) => {
  const [priceRange, setPriceRange] = useState([0, 100]); // Rango de precio inicial
  const [boticaName, setBoticaName] = useState([]); // Lista de nombres de boticas
  const [marcaName, setMarcaName] = useState([]); // Lista de nombres de marcas
  const [medicamentoName, setMedicamentoName] = useState(''); // Nombre de medicamento
  const [allProducts, setAllProducts] = useState([]); // Lista completa de productos
  const [filteredList, setFilteredList] = useState([]); // Lista de productos filtrados
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Estado de error

  // Obtener productos desde la API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiProd.findAllComplete();
      setAllProducts(data); // Guardar todos los productos
      setFilteredList(data); // Inicializar la lista filtrada
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setError("No se pudo cargar los productos. Por favor, inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  // Aplicar filtros automáticamente
  useEffect(() => {
    const applyFilters = () => {
      if (allProducts.length === 0) return; // No hacer nada si no hay productos cargados

      const filtered = allProducts.filter((product) => {
        const precioValido =
          product.precio >= priceRange[0] && product.precio <= priceRange[1];
        const boticaValida =
          boticaName.length === 0 || boticaName.includes(product.botica.nombre);
        const marcaValida =
          marcaName.length === 0 || marcaName.includes(product.marca);
        const medicamentoValido =
          medicamentoName === "" ||
          product.nombre.toLowerCase().includes(medicamentoName.toLowerCase());

        return precioValido && boticaValida && marcaValida && medicamentoValido;
      });

      setFilteredList(filtered); // Actualizar los productos filtrados
    };

    applyFilters(); // Aplicar los filtros cada vez que cambien
  }, [priceRange, boticaName, marcaName, medicamentoName, allProducts]);

  // Resetear los filtros
  const resetFilters = () => {
    setPriceRange([0, 100]);
    setBoticaName([]);
    setMarcaName([]);
    setMedicamentoName('');
  };

  // Cargar filtros de localStorage al iniciar
  useEffect(() => {
    try {
      const savedPriceRange = JSON.parse(localStorage.getItem('priceRange'));
      const savedBoticaName = JSON.parse(localStorage.getItem('boticaName')) || [];
      const savedMarcaName = JSON.parse(localStorage.getItem('marcaName')) || [];
      const savedMedicamentoName = localStorage.getItem('medicamentoName') || "";

      if (savedPriceRange && Array.isArray(savedPriceRange)) {
        setPriceRange(savedPriceRange);
      }
      setBoticaName(savedBoticaName);
      setMarcaName(savedMarcaName);
      setMedicamentoName(savedMedicamentoName);
    } catch (error) {
      console.error("Error parsing localStorage data: ", error);
    }
  }, []);

  // Guardar filtros en localStorage al cambiar
  useEffect(() => {
    localStorage.setItem('priceRange', JSON.stringify(priceRange));
    localStorage.setItem('boticaName', JSON.stringify(boticaName));
    localStorage.setItem('marcaName', JSON.stringify(marcaName));
    localStorage.setItem('medicamentoName', medicamentoName);
  }, [priceRange, boticaName, marcaName, medicamentoName]);

  // Llamar a la API al cargar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <FilterContext.Provider
      value={{
        priceRange,
        updatePriceRange: (min, max) => setPriceRange([min, max]),
        boticaName,
        updateBoticaName: (name, isChecked) =>
          setBoticaName((prev) =>
            isChecked ? [...prev, name] : prev.filter((item) => item !== name)
          ),
        marcaName,
        updateMarcaName: (name, isChecked) =>
          setMarcaName((prev) =>
            isChecked ? [...prev, name] : prev.filter((item) => item !== name)
          ),
        medicamentoName,
        updateMedicamentoName: (name) => setMedicamentoName(name),
        filteredList,
        resetFilters,
        loading,
        error,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

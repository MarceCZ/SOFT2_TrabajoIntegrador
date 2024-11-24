import React, { useContext, useEffect, useState } from 'react';
import ProductoCard from "./ProductoCard";
import Grid from "@mui/material/Grid";
import { FilterContext } from './FilterContext';
import Typography from '@mui/material/Typography';
import api from '../api/producto'; // Importar la API de producto

const ProductoCardList = () => {
  const { priceRange, boticaName, marcaName, medicamentoName } = useContext(FilterContext); 
  const [productList, setProductList] = useState([]); // Estado para almacenar la lista de productos
  const [filteredList, setFilteredList] = useState([]); // Estado para la lista filtrada
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga

  useEffect(() => {
    // Función para obtener los productos del backend usando la API
    const fetchProducts = async () => {
      try {
        const data = await api.findAll(); // Usar la API para obtener los productos
        setProductList(data); // Almacenar los productos en el estado
        setFilteredList(data); // Inicializar la lista filtrada con todos los productos
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false); // Finalizar el estado de carga
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filtrar productos basados en los filtros del contexto
    const newFilteredList = productList.filter((product) => {
      const withinPriceRange = product.precio >= priceRange[0] && product.precio <= priceRange[1];
      const matchesBoticaName = boticaName.length === 0 || boticaName.includes(product.botica);
      const matchesMarcaName = marcaName.length === 0 || marcaName.includes(product.marca);
      const matchMedicamentoName = product.nombre.toLowerCase().includes(medicamentoName.toLowerCase());

      return withinPriceRange && matchesBoticaName && matchesMarcaName && matchMedicamentoName;
    });

    setFilteredList(newFilteredList); // Actualizar la lista filtrada
  }, [priceRange, boticaName, marcaName, medicamentoName, productList]); // Dependencias de useEffect

  return (
    <Grid
      container
      sx={{ marginBottom: '25px', justifyContent: { xs: "center" } }}
    >
      {loading ? (
        <Grid item xs={12}>
          <Typography variant="h6" align="center">Cargando productos...</Typography>
        </Grid>
      ) : filteredList.length === 0 ? (
        <Grid item xs={12}>
          <Typography variant="h6" align="center">No se encontraron productos.</Typography>
        </Grid>
      ) : (
        filteredList.map((e) => (
          <ProductoCard
            key={e.id}
            id={e.id}
            nombre={e.nombre}
            marca={e.marca}
            presentacion={e.presentacion}
            descripcion={e.descripcion}
            contraindicaciones={e.contraindicaciones}
            advertencias={e.advertencias}
            imagen={e.imagen}
            botica={e.botica}
            precio={e.precio}
          />
        ))
      )}
    </Grid>
  );
}

export default ProductoCardList;
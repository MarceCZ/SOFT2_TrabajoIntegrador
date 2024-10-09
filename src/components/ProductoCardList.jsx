import React, { useContext, useEffect, useState } from 'react';
import ProductoCard from "./ProductoCard";
import Grid from "@mui/material/Grid";
import { FilterContext } from './FilterContext';
import Typography from '@mui/material/Typography';

const ProductoCardList = (props) => {
  const { priceRange, boticaName } = useContext(FilterContext); // Extraer los filtros del contexto
  const [filteredList, setFilteredList] = useState(props.list); // Estado para la lista filtrada

  useEffect(() => {
    // Filtrar productos por rango de precios y botica
    const newFilteredList = props.list.filter((product) => {
      const withinPriceRange = product.precio >= priceRange[0] && product.precio <= priceRange[1];
      const matchesBoticaName = product.botica.toLowerCase().includes(boticaName.toLowerCase());

      return withinPriceRange && matchesBoticaName; // Retorna solo los productos que cumplen ambos criterios
    });

    setFilteredList(newFilteredList); // Actualizar el estado de la lista filtrada
  }, [priceRange, boticaName, props.list]); // Dependencias de useEffect

  return (
    <Grid
      container
      sx={{ marginBottom: '25px', justifyContent: { xs: "center" } }}
    >
      {
        filteredList.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6" align="center">No se encontraron productos.</Typography>
          </Grid>
        ) : (
          filteredList.map((e) => {
            return (
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
            );
          })
        )
      }
    </Grid>
  );
}

export default ProductoCardList;

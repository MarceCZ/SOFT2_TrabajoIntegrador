import React, { useContext, useEffect, useState } from 'react';
import ProductoCard from "./ProductoCard";
import Grid from "@mui/material/Grid";
import { FilterContext } from './FilterContext';
import Typography from '@mui/material/Typography';

const ProductoCardList = (props) => {
  // Extraer los filtros del contexto (precio, botica y marca)
  const { priceRange, boticaName, marcaName } = useContext(FilterContext); 
  const [filteredList, setFilteredList] = useState(props.list); // Estado para la lista filtrada

  useEffect(() => {
    // Filtrar productos por rango de precios, botica y marca
    const newFilteredList = props.list.filter((product) => {
      const withinPriceRange = product.precio >= priceRange[0] && product.precio <= priceRange[1];
      const matchesBoticaName = product.botica.toLowerCase().includes(boticaName.toLowerCase());
      const matchesMarcaName = product.marca.toLowerCase().includes(marcaName.toLowerCase());

      // Retorna solo los productos que cumplen los tres criterios
      return withinPriceRange && matchesBoticaName && matchesMarcaName;
    });

    setFilteredList(newFilteredList); // Actualizar el estado de la lista filtrada
  }, [priceRange, boticaName, marcaName, props.list]); // Dependencias de useEffect

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

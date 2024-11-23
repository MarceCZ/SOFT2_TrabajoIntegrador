import React, { useContext, useEffect, useState } from 'react';
import ProductoCard from "./ProductoCard";
import Grid from "@mui/material/Grid";
import { FilterContext } from './FilterContext';
import Typography from '@mui/material/Typography';

const ProductoCardList = () => {
  const { filteredList, loading } = useContext(FilterContext); // Obtener la lista filtrada desde el contexto

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
        filteredList.map((product) => (
          <ProductoCard
            key={product.id}
            id={product.id}
            nombre={product.nombre}
            marca={product.marca}
            presentacion={product.presentacion}
            descripcion={product.descripcion}
            contraindicaciones={product.contraindicaciones}
            advertencias={product.advertencias}
            imagen={product.imagen}
            botica={product.botica?.nombre}
            precio={product.precio}
            receta={product.receta}
          />
        ))
      )}
    </Grid>
  );
};

export default ProductoCardList;

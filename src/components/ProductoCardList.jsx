import React, { useContext, useEffect, useState } from 'react';
import ProductoCard from "./ProductoCard";
import Grid from "@mui/material/Grid";
import { FilterContext } from './FilterContext';
import Typography from '@mui/material/Typography';
import apiProd from '../api/producto'; 

const ProductoCardList = () => {
  const { priceRange, boticaName, marcaName, medicamentoName } = useContext(FilterContext);
  const [productList, setProductList] = useState([]); 
  const [filteredList, setFilteredList] = useState([]); 
  const [loading, setLoading] = useState(true); 

  const fetchProducts = async () => {
    try {
      const data = await apiProd.findAllComplete();
      console.log("Productos obtenidos:", data);
      setProductList(data); 
      setFilteredList(data); 
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchProducts(); // Obtener productos al montar el componente
  }, []);

  useEffect(() => {
    // Filtrar productos por rango de precios, botica, marca y medicamento
    const newFilteredList = productList.filter((product) => {
      const withinPriceRange = product.precio >= priceRange[0] && product.precio <= priceRange[1];
      const matchesBoticaName =
        boticaName.length === 0 ||
        boticaName.some((boticaFilter) => {
          const botica = product.botica; 
          return botica && botica.nombre.toLowerCase() === boticaFilter.toLowerCase();
        });
      const matchesMarcaName = marcaName.length === 0 || marcaName.includes(product.marca);
      const matchMedicamentoName = product.nombre.toLowerCase().includes(medicamentoName.toLowerCase());

      return withinPriceRange && matchesBoticaName && matchesMarcaName && matchMedicamentoName;
    });

    setFilteredList(newFilteredList); // Actualizar la lista filtrada
  }, [priceRange, boticaName, marcaName, medicamentoName, productList]); 

  return (
    <Grid container sx={{ marginBottom: '25px', justifyContent: { xs: "center" } }}>
      {loading ? (
        <Grid item xs={12}>
          <Typography variant="h6" align="center">Cargando productos...</Typography>
        </Grid>
      ) : filteredList.length === 0 ? (
        <Grid item xs={12}>
          <Typography variant="h6" align="center">No se encontraron productos.</Typography>
        </Grid>
      ) : (
        filteredList?.map((e) => (
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
            botica={e.botica.nombre}
            precio={e.precio}
            receta={e.receta}
          />
        ))
      )}
    </Grid>
  )
}

export default ProductoCardList

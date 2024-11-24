import ProductoCard from "./ProductoCard";
import { Box } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { useEffect, useState } from 'react';
import apiProd from '../api/producto';

const CustomCarousel = (props) => {

  const [productList, setProductList] = useState([]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1280, min: 800 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 950, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 650, min: 0 },
      items: 1
    }
  };

  const fetchProducts = async () => {
    try {
      await apiProd.findAllComplete()
        .then(data => {
          console.log("Productos obtenidos:", data);
          setProductList(data);
        });
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box sx={{ justifyContent: 'center', ml: '10%', mr: '9%' }}>
      <Carousel
        responsive={responsive}
        infinite={productList.infinite}
        autoPlay={productList.autoPlay}
      >
        {productList.map((e) => (
          <div key={e.id}>
            <ProductoCard
              id={e.id}
              nombre={e.nombre}
              marca={e.marca}
              presentacion={e.presentacion}
              descripcion={e.descripcion}
              contraindicaciones={e.contraindicaciones}
              advertencias={e.advertencias}
              imagen={e.imagen}
              botica={e.botica ? e.botica.nombre : "Sin información"}
              precio={e.precio}
            />
          </div>
        ))}
      </Carousel>
    </Box>
  )
}

export default CustomCarousel
import { useState, useEffect } from 'react';
import productoApi from '../api/producto';
import boticaApi from '../api/botica';

export const useProducts = (idBotica) => {
  const [productos, setProductos] = useState([]);
  const [nombreBotica, setNombreBotica] = useState('');

  useEffect(() => {
    const loadBoticaData = async () => {
      try {
        const botica = await boticaApi.findOneComplete(idBotica);
        setNombreBotica(botica.nombre);
        setProductos(botica.productos);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    loadBoticaData();
  }, [idBotica]);

  const deleteProduct = async (productId) => {
    try {
      await productoApi.remove(productId);
      setProductos((prevProductos) =>
        prevProductos.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  };

  return { productos, nombreBotica, deleteProduct };
};
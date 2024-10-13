import { useState } from 'react';
import data from '../data/data.json';
import { useParams } from 'react-router-dom';

const useBoticaProducts = () => {
    const { botica } = useParams();  // Obtener el nombre de la botica desde la URL
    const decodedBotica = decodeURIComponent(botica.replace(/-/g, ' '));

    const productosDeBotica = data.productos.filter(producto => producto.botica.toLowerCase() === decodedBotica.toLowerCase());

    const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);
    const boticasDisponibles = [...new Set(productosDeBotica.map(product => product.botica))];
    const marcasDisponibles = [...new Set(productosDeBotica.map(product => product.marca))];

    const toggleFilterDrawer = () => {
        setFilterDrawerOpen(prev => !prev);
    };

    return {
        productosDeBotica,
        boticasDisponibles,
        marcasDisponibles,
        isFilterDrawerOpen,
        toggleFilterDrawer,
        decodedBotica
    };
};

export default useBoticaProducts;

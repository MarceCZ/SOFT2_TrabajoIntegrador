import { useState } from 'react';
import data from '../data/data.json';

const useArmaTuKit = () => {
    const [view, setView] = useState('productos');
    const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);

    const productosData = data.productos;
    const boticasData = data.boticas;

    const boticasDisponibles = [...new Set(productosData.map(product => product.botica))];
    const marcasDisponibles = [...new Set(productosData.map(product => product.marca))];

    const toggleFilterDrawer = () => {
        setFilterDrawerOpen((prev) => !prev);
    };

    return {
        view,
        setView,
        isFilterDrawerOpen,
        toggleFilterDrawer,
        productosData,
        boticasData,
        boticasDisponibles,
        marcasDisponibles,
    };
};

export default useArmaTuKit;

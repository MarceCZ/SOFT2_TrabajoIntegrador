import data from '../data/data.json';

const useProductosData = () => {
    const productosData = data.productos;
    return { productosData };
};

export default useProductosData;

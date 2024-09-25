import Header from '../components/Header';
import ProductoCard from '../components/ProductoCard';
import ProductoBody from '../components/ProductoBody';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import productosData from '../data/productos.json';

const ClientMainPage = () => {

  const productoData= productosData.productos;

  return (
    <div>
      <Header></Header>
      <h1>Comienza a armar tu kit</h1>
      <ButtonGroup variant="outlined" aria-label="Basic button group">
        <Button>Ver productos</Button>
        <Button>Ver tiendas</Button>
      </ButtonGroup>
      <ProductoBody productoData={productoData} />
    </div>
  );
}

export default ClientMainPage 
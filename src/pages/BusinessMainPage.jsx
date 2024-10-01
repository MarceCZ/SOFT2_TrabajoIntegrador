import Header from '../components/Header';
import ProductoCard from '../components/ProductoCard';
import ProductoBody from '../components/ProductoBody';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import productosData from '../data/data.json';
import { Container } from '@mui/material';

const BusinessMainPage = () => {

  const productoData = productosData.productos;

  return (
    <div>
      <Header></Header>
      <Container sx={{display: 'flex', flexDirection: 'column', mt: '30px', mb: '50px'}}>
      <h1 style={{ textAlign: "center" }}>Comienza a armar tu kit</h1>
        <ButtonGroup variant="outlined" aria-label="Basic button group" sx={{ justifyContent: "center" }}>
          <Button>Ver productos</Button>
          <Button>Ver tiendas</Button>
        </ButtonGroup>
      </Container>
      <ProductoBody productoData={productoData} />
    </div>
  );
}

export default BusinessMainPage
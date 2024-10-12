import Header from '../components/Header';
import { Box, Container, Typography, Button } from '@mui/material';
import CustomCarousel from '../components/CustomCarousel.jsx';
import CallToAction from '../components/CallToAction.jsx';
import { useNavigate } from 'react-router-dom';
import data from '../data/data.json';


const ClientMainPage = () => {
  const productosData = data.productos;
  const navigate = useNavigate();

  return (
    <div style={{ margin: '100px auto 0' }}>
      <Header />
      <Box
        sx={{
          backgroundColor: '#1b986e',
          height: '450px',
          width: '95%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: { xs: 'center', md: 'flex-start' },
          color: '#fff',
          textAlign: { xs: 'center', md: 'left' },
          margin: '0 auto',
          borderRadius: '40px',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', md: '80%' },
            padding: '50px',
          }}
        >
          <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: { xs: '2.5rem', md: '3.8rem' }, pb: '15px' }}>
            ¡Bienvenido a MediPlan+!
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'normal', fontSize: { xs: '1.5rem', md: '2rem' } }}>
            Tu salud a un click de distancia
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/como-funciona')}
            sx={{ fontSize: '1.2rem', padding: '10px 40px', backgroundColor: '#4b4b4b', borderRadius: '30px', mt:'20px' }}
          >
            Conoce más
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: '60px', mb: '60px' }}>
        <Container sx={{ display: 'flex', flexDirection: 'column', mb: '40px', alignItems: 'center' }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', textAlign: "center", fontSize: '2.1rem' }}>
            Comienza a armar tu kit
          </Typography>
        </Container>
        <CustomCarousel
          list={productosData}
          infinite={true}
          autoPlay={true}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '10px' }}>
          <Button
            variant="contained"
            onClick={() => navigate('/arma-tu-kit')}
            sx={{ fontSize: '1rem', padding: '10px 20px', backgroundColor: '#4b4b4b', borderRadius: '30px' }}
          >
            Ver más
          </Button>
        </Box>
      </Box>
      <CallToAction />

     
    </div>

  )

};

export default ClientMainPage 
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
    const navigate = useNavigate();
    return (
        <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#f2f2f2',
          mt: '20px'
        }}
      >
        <Box
          sx={{
            flex: 1,
            minHeight:{xs:'250px', md:'450px'},
            width: '100%',
            textAlign: 'center',
            padding: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: `url(https://www.disabilitybenefitscenter.org/sites/default/files/images/blog/senior-citizen-support-network.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
        </Box>
        <Box
          sx={{
            flex: 1,
            textAlign: { xs: 'center', md: 'left' },
            padding: { xs: '80px 50px', md: '40px' }
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: '15px' }}>
            ¡Empieza ahora y cuida tu salud!
          </Typography>
          <Typography variant="body1" sx={{ mb: '25px' }}>
            Con MediPlan, tienes todo lo que necesitas para armar tu propio kit de salud y estar preparado para cualquier situación.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ padding: '10px 20px', fontSize: '1rem', backgroundColor: '#1b986e', borderRadius: '30px' }}
            onClick={() => navigate('/arma-tu-kit')}
          >
            Empieza ahora
          </Button>
        </Box>
      </Box>
    )
}

export default CallToAction
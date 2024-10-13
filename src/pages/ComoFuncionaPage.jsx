import { Box,  Typography, Grid, } from '@mui/material';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import CallToAction from '../components/CallToAction.jsx';
import PasoCard from '../components/ComoFuncionaPage/PasoCard.jsx';
import Paso1 from '../assets/PasosImg/Paso1.png'
import Paso2 from '../assets/PasosImg/Paso2.png'
import Paso3 from '../assets/PasosImg/Paso3.png'
import Paso4 from '../assets/PasosImg/Paso4.png'

const ComoFuncionaPage = () => {
    return (
        <div style={{ margin: '100px auto 0' }}>
            <Header />
            <Box
                sx={{
                    backgroundColor: '#1b986e',
                    height: '220px',
                    width: '95%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    textAlign: 'center',
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
                    <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: { xs: '2rem', md: '3.2rem' }, pb: '15px' }}>
                        ¿Cómo funciona MediPlan+?
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'normal', fontSize: { xs: '1rem', md: '1.4rem' } }}>
                        Arma tu kit • Suscríbete • Recibe tu kit • Deja las preocupaciones
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ margin: { md: '5% 10%', xs: '10% 20%' } }}>
                <Grid container spacing={4}>
                    <PasoCard
                        imageUrl={Paso1}
                        title="1. Arma tu kit"
                        body="Selecciona los productos que deseas añadir a tu kit de salud."
                    />
                    <PasoCard
                        imageUrl={Paso2}
                        title="2. Suscríbete a tu kit"
                        body="Completa los detalles que te solicitamos y confirma tu suscripción."
                    />
                    <PasoCard
                        imageUrl={Paso3}
                        title="3. Recibe tu kit"
                        body="Cada primer día del mes, recibirás el kit que armaste."
                    />
                    <PasoCard
                        imageUrl={Paso4}
                        title="4. Mantente saludable"
                        body="Mantén tu salud bajo control con tu kit personalizado."
                    />
                </Grid>
            </Box>
            <CallToAction />
        </div>
    )
}

export default ComoFuncionaPage
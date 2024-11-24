import React from 'react';
import { Route, Routes } from "react-router-dom";
import ClientMainPage from './pages/ClientMainPage';
import BusinessProductsPage from './pages/BusinessProductsPage';
import BusinessMetricsPage from './pages/BusinessMetricsPage';
import ProductInfoPage from './pages/ProductInfoPage';
import ArmaTuKitPage from './pages/ArmaTuKitPage';
import ComoFuncionaPage from './pages/ComoFuncionaPage';
import LoginPage from './pages/LoginPage';
import RecuperarPage from './pages/RecuperarPage';
import RecuperarNuevaPage from './pages/RecuperarNuevaPage';
import { CartProvider } from './components/CartContext';
import { FilterProvider } from './components/FilterContext';
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckOutPage'
import BoticaProductsPage from './pages/BoticaProductsPage';
import { ThemeProvider } from '@mui/material/styles';
import theme from './themes/theme';
import RutaProtegida from "./components/RutasProtegidas/RutaProtegida";
import RutaProtegidaCliente from "./components/RutasProtegidas/RutaProtegidaCliente";
import RutaPublica from "./components/RutasProtegidas/RutaPublica";
import SignInPage from './pages/SignInPage';
import { AuthProvider } from './components/AuthContext';
import FAQPage from './pages/FAQPage';
import MiPerfilPage from './pages/MiPerfilPage';
import InfoKitPage from './pages/InfoKitPage';
import BusinessRecetasPage from './pages/BusinessRecetasPage';
import EscribenosPage from './pages/EscribenosPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <FilterProvider>
            <Routes>
            <Route path="/signin" element={<RutaPublica><SignInPage /></RutaPublica>} />
              <Route path="/login" element={<RutaPublica><LoginPage /></RutaPublica>} />
              <Route path="/recuperar" element={<RutaPublica><RecuperarPage /></RutaPublica>} />
              <Route path="/restablecer" element={<RutaPublica><RecuperarNuevaPage /></RutaPublica>} />
              <Route path="/" element={<RutaProtegidaCliente><ClientMainPage /></RutaProtegidaCliente>} />
              <Route path='/productsbusiness' element={<RutaProtegida><BusinessProductsPage /></RutaProtegida>} />
              <Route path='/metricsbusiness' element={<RutaProtegida><BusinessMetricsPage /></RutaProtegida>} />
              <Route path='/recetasbusiness' element={<RutaProtegida><BusinessRecetasPage /></RutaProtegida>} />
              <Route path='/productinfo/:id' element={<RutaProtegidaCliente><ProductInfoPage /></RutaProtegidaCliente>} />
              <Route path='/cart' element={<RutaProtegidaCliente><CartPage /></RutaProtegidaCliente>} />
              <Route path='/checkout' element={<RutaProtegidaCliente><CheckoutPage /></RutaProtegidaCliente>} />
              <Route path="/como-funciona" element={<RutaProtegidaCliente><ComoFuncionaPage /></RutaProtegidaCliente>} />
              <Route path="/arma-tu-kit" element={<RutaProtegidaCliente><ArmaTuKitPage /></RutaProtegidaCliente>} />
              <Route path="/boticainfo/:botica" element={<RutaProtegidaCliente><BoticaProductsPage /></RutaProtegidaCliente>} />
              <Route path="/faq" element={<RutaProtegidaCliente><FAQPage/></RutaProtegidaCliente>}/>
              <Route path="/mi-perfil" element={<RutaProtegidaCliente><MiPerfilPage/></RutaProtegidaCliente>}/>
              <Route path="/kitinfo/:id" element={<InfoKitPage />} />
              <Route path="/faq" element={<RutaPublica><FAQPage/></RutaPublica>}/>
              <Route path="/escribenos" element={<RutaProtegidaCliente><EscribenosPage/></RutaProtegidaCliente>} />
            </Routes>
          </FilterProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

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
import RutaProtegida from "./components/RutaProtegida";
import SignInPage from './pages/SignInPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <FilterProvider>
          <Routes>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/recuperar" element={<RecuperarPage />} />
            <Route path="/restablecer" element={<RecuperarNuevaPage />} />
            <Route path="/" element={<ClientMainPage />} />
            <Route path='/productsbusiness' element={<RutaProtegida><BusinessProductsPage /></RutaProtegida>} />
            <Route path='/metricsbusiness' element={<RutaProtegida><BusinessMetricsPage /></RutaProtegida>} />
            <Route path='/productinfo/:nombre/:botica' element={<ProductInfoPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path="/como-funciona" element={<ComoFuncionaPage />} />
            <Route path="/arma-tu-kit" element={<ArmaTuKitPage />} />
            <Route path="/boticainfo/:botica" element={<BoticaProductsPage />} />
          </Routes>
        </FilterProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;

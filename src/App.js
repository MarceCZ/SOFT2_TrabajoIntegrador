import React from 'react'
import {Route, Routes} from "react-router-dom"
import ClientMainPage from './pages/ClientMainPage'
import BusinessMainPage from './pages/BusinessMainPage'
import ProductInfoPage from './pages/ProductInfoPage'
import {CartProvider} from './components/CartContext'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckOutPage'

function App() {
  return (
    <CartProvider>
      <Routes>
      {/*<Route path="/" element={<Home />} /> */}
        <Route path="/" element={<ClientMainPage/>}/>
        <Route path='/mainbusiness' element={<BusinessMainPage/>}/>
        <Route path='/productinfo/:id' element={<ProductInfoPage/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/checkout' element={<CheckoutPage/>}/>
      </Routes>
    </CartProvider>
    
  )
}

export default App

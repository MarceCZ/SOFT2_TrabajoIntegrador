import React from 'react'
import {Route, Routes} from "react-router-dom"
import ClientMainPage from './pages/ClientMainPage'
import BusinessMainPage from './pages/BusinessMainPage'
import ProductInfoPage from './pages/ProductInfoPage'
import ProductoCardList from './components/ProductoCardList'


function App() {
  return (
    <Routes>
      {/*<Route path="/" element={<Home />} /> */}
      <Route path="/" element={<ClientMainPage/>}/>
      <Route path='/mainbusiness' element={<BusinessMainPage/>}/>
      <Route path='/productinfo/:id' element={<ProductInfoPage/>}/>
      <Route path="/" element={<ProductoCardList/>}/>
    </Routes>
  )
}

export default App

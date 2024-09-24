import React from 'react'
import {Route, Routes} from "react-router-dom"
import ClientMainPage from './pages/ClientMainPage'
import BusinessMainPage from './pages/BusinessMainPage'
import ProductInfoPage from './pages/ProductInfoPage'

function App() {
  return (
    <Routes>
      {/*<Route path="/" element={<Home />} /> */}
      <Route path="/" element={<ClientMainPage/>}/>
      <Route path='/mainbusiness' element={<BusinessMainPage/>}/>
      <Route path='/productinfo' element={<ProductInfoPage/>}/>
    </Routes>
  )
}

export default App

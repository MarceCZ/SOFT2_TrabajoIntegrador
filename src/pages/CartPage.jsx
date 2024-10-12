import React from 'react'
import { Toolbar } from '@mui/material'
import Header from '../components/Header'
import CartPageBody from '../components/CartPage/CartPageBody'

const CartPage = () => {
  return (
    <>
      <Header />
      <Toolbar />
      <CartPageBody/>
    </>
  )
}

export default CartPage

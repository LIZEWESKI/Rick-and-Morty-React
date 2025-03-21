import React from 'react'
import ScrollToTop from '../components/ScrollToTop'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default Layout
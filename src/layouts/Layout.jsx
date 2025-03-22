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
      <main className=''>
        <Outlet/>
      </main>
      <Footer/>
    </>
  )
}

export default Layout
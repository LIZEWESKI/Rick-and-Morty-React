import React from 'react'
import ScrollToTop from '../components/ScrollToTop'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <div className='flex flex-col h-screen w-full min-h-screen '>
        <Header/>
        <main className='flex flex-col flex-grow'>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </>
  )
}

export default Layout
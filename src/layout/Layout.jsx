import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'
import Chatbot from '../components/Chatbot'

const Layout = () => {
    return (
        <>
            <Navbar />
            <Chatbot />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SaleBanner from '../components/SaleBanner'

export default function ProductList() {
    return (
        <div className="productList">
            <Header />
            
            <SaleBanner />
            <Footer />
        </div>
    )
}
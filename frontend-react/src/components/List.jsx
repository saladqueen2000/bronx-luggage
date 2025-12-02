import React, { use, useEffect } from 'react'
import { Grid } from '@mui/material'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SaleBanner from '../components/SaleBanner'
import SliderHero from '../components/HomeSlides'
import { CatBtnGroup } from '../components/HomeBtnGroup'
import { ResponsiveCard, ProductCard } from '../components/Cards'
import Backpack3 from '../assets/images/Backpack_image_3.png'
import Bag1 from '../assets/images/Bag_image_1.png'
import Luggage1 from '../assets/images/Luggage_image_1.png'
import '../global.css';
import '../assets/style/Home.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function List() {
    const [products, setProducts] = React.useState([]);
    const fetchData = async()=>{
        try{
            const response = await axios.get("https://fakestoreapi.com/products");
            setProducts(response?.data);
           
            } 
            catch(error){
                console.error('Error fetching data:', error); 
            }
        };
    
    useEffect(() => {
        fetchData();
    }, []);



    return (
        <div className='home'>
            <main className='home__content'>
                <section className="home__popular">
                    <div style={{ display: "flex" }}>
                        <span
                            style={{
                                marginLeft: "75px",
                                marginBottom: "50px",
                                fontFamily: "Poppins",
                                fontSize: "1.75rem",
                                fontWeight: "600",
                                color: "#1B5A7D",
                            }}
                        >
                            Popular products
                        </span>
                        <CatBtnGroup />
                    </div>

                    <Grid
                        container
                        spacing={1.5}
                        sx={{
                            margin: "0px 75px 45px 75px"
                        }}
                    >
                        <Grid size="grow">
                            <ResponsiveCard
                                image={Backpack3}
                            />
                        </Grid>
                        <Grid size={3}>
                            <ProductCard
                                image={Backpack3}
                                title="backpack"
                                price="10.00"
                            />
                        </Grid>
                        <Grid size="grow">
                            <ProductCard
                                image={Backpack3}
                                title="backpack"
                                price="10.00"
                            />
                        </Grid>
                        <Grid size="grow">
                            <ProductCard
                                image={Backpack3}
                                title="backpack"
                                price="10.00"
                            />
                        </Grid>

                    </Grid>

                    
                        
                   
                    <Grid size="3">
                    <div style={{
                       margin: "0px 75px 45px 75px",
                       display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '20px',
                        width: '100%'
                    }}>
                        {products.map((product) => (
                        <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }} >
                        <ProductCard
                            key={product.id}
                            image={product.image}
                            title={product.title}
                            price={product.price}
                        /></Link>
                        ))}
                    </div>
                    </Grid>
                </section>
              
            </main>
           
        </div>
    );
}


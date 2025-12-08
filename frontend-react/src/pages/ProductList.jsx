import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SaleBanner from '../components/SaleBanner'
import FilterSidebar from '../components/FilterSidebar'
import { ProductCard } from '../components/Cards'
import { Grid } from '@mui/material'
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import '../global.css';
import '../assets/style/ProductList.css'
import { Link } from 'react-router-dom'


export default function ProductList() {
    const [list, setList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const find = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            setList(response?.data)
        } catch (error) {
            console.error('Error:', error.response?.data);
        } finally {
            setLoading(false)
        }
    };
    React.useEffect(() => {
        find();
    }, [])
    console.log(list)

    //Phần hiện lên trong lúc loading
    if (loading) {
        return (
            <div className='loadingStyle'>
                <CircularProgress />
            </div>
        );
    };


    return (
        <div className="productList">
            <Header />
            <section className="productList_list">
                <FilterSidebar />

                <Grid container spacing={5} className="productList_list_display">
                    {list.map((p) => (
                        <Grid item xs={12} sm={6} md={4} key={p.id}>
                            <Link to={`/products/${p.id}`} style={{ textDecoration: 'none' }}>
                            <ProductCard
                                image={p.image ?? ""}
                                title={p.title}
                                price={p.price}
                            />
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </section>

            <SaleBanner />
            <Footer />
        </div>
    )
}
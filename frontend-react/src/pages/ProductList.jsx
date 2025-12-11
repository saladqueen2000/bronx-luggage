import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SaleBanner from '../components/SaleBanner'
import FilterSidebar from '../components/FilterSidebar'
import { ProductCard } from '../components/Cards'
import { Grid, List, Pagination } from '@mui/material'
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import '../global.css';
import '../assets/style/ProductList.css'


export default function ProductList() {
    const [list, setList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [page, setPage] = React.useState(1);
    const itemsPerPage = 12;

    const find = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/products');
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

    //Phần phân trang sản phẩm
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // const currentItems = list.slice(startIndex, endIndex);



    return (
        <div className="productList">
            <Header />
            <section className="productList_list">
                <FilterSidebar />

                <div className="-flexColumn">
                    <Grid container spacing={5} className="productList_list_display">
                        {list.map((p) => (
                            <Grid item xs={12} sm={6} md={4} key={p.id}>
                                <ProductCard
                                    image={p.gallery?.[0]?.image_url ?? ""}
                                    title={p.name}
                                    price={p.price}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    <Pagination
                        count={Math.ceil(list.length / itemsPerPage)}
                        page={page}
                        onChange={(e, value) => setPage(value)}
                        shape='rounded'
                        showFirstButton
                        showLastButton
                        className='pagination'
                    />
                </div> 
            </section>

            <SaleBanner />
            <Footer />
        </div>
    )
}
import { Button } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useState } from 'react';
import ProductCategorySection from '../ProductCategorySection/ProductCategorySection';
import ProductSearch from '../ProductSearch/ProductSearch';
import ProductsData from '../ProductsData/ProductsData';
import data from '../../../fakedata.json';
import { Link } from 'react-router-dom';
import useCartData from '../../../Hooks/useCartData';

const productsCategories = [
    {
        value: 'all',
        label: 'All',
    },
    {
        value: 'hoodie',
        label: 'Hoodie',
    },
    {
        value: 't-shirt',
        label: 'T-Shirt',
    },
    {
        value: 'polo',
        label: 'Polo',
    },
    {
        value: 'Jacket',
        label: 'jacket',
    },
];

const productsSize = [
    {
        value: 'all',
        label: 'All',
    },
    {
        value: 'xxl',
        label: 'XXL',
    },
    {
        value: 'xl',
        label: 'XL',
    },
    {
        value: 'l',
        label: 'L',
    },
    {
        value: 'm',
        label: 'M',
    },
    {
        value: 's',
        label: 'S',
    },
];
const ProductListing = () => {
    const [product, setProduct] = useState(data);
    const [category, setCategory] = useState('all');
    const [size, setSize] = useState('all');
    // useContext
    const { setCart, selectedProduct } = useCartData();

    const handleReset = (e) => {
        e.preventDefault();
        setProduct(data);
        setCategory('all');
        setSize('all');
    };
    const handleAddToCart = (e) => {
        e.preventDefault();
        setCart(selectedProduct);
    }
    return (
        <Container>
            {/* category selection section */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
                <ProductCategorySection
                    data={data}
                    product={product}
                    setProduct={setProduct}
                    setCategory={setCategory}
                    size={size}
                    setSize={setSize}
                    category={category}
                    productsCategories={productsCategories}
                    productsSize={productsSize}
                    handleReset={handleReset}
                />

                {/* search and add cart section */}
                <Box sx={{ display: 'flex' }}>
                    <ProductSearch
                        data={data}
                        setProduct={setProduct} />

                    <Box sx={{ ml: 1 }}>
                        <Button onClick={handleAddToCart} variant="contained" >
                            <Link style={{ textDecoration: 'none', color: 'white' }} to='/cart'> Add To Cart</Link>
                        </Button>
                    </Box>

                </Box>
            </Box>

            <Box>
                {
                    product[0]?.title ? <ProductsData
                        product={product}
                        setProduct={setProduct}
                    /> : <> <h3>Sorry No Product found!!</h3></>
                }
            </Box>
        </Container>
    );
};

export default ProductListing;
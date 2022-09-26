import React from 'react';
import { Button, MenuItem, TextField } from '@mui/material';
import { Box } from '@mui/system';
// import RestartAltIcon from '@mui/icons-material/RestartAlt';

const ProductCategorySection = ({ data, product, setProduct, productsCategories, category, setCategory, size, setSize, productsSize, handleReset }) => {
    // filter product by catergory
    const handleCategoryChange = (event) => {
        let category = event.target.value;
        setCategory(category);
        if (category !== 'all') {
            console.log('inside filter without all');
            const filterByCategory = data.filter(product => product.category.toLowerCase().includes(category.toLowerCase()));
            setProduct(filterByCategory);

        } else {
            console.log('inside filter all');
            setProduct(data);
        }
    };
    //filter product by size
    const handleSizeChange = (event) => {
        setSize(event.target.value);
        let size = event.target.value;
        if (size !== 'all' && category !== 'all') {
            console.log('inside size without all', product);
            const filterByCategorySize = data?.filter(products => products.category.toLowerCase().includes(category.toLowerCase()) && products.size.toLowerCase().includes(size.toLowerCase()));
            setProduct(filterByCategorySize);
        }
        else if (size === 'all' && category === 'all') {
            setProduct(data);

        }
        else if (size === 'all') {
            const filterAllSize = data?.filter(products => products.category.toLowerCase().includes(category.toLowerCase()));
            setProduct(filterAllSize);
        }
        else {
            const filterBySize = data?.filter(products => products.size.toLowerCase().includes(size.toLowerCase()));
            setProduct(filterBySize);
        }
    };

    return (
        <Box >
            <TextField
                id="outlined-select-currency"
                select
                label="Category"
                value={category}
                onChange={handleCategoryChange}
                helperText="Select product category"
            >
                {productsCategories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            {/* size selection section */}
            <TextField
                sx={{ mx: 2 }}
                id="outlined-select-currency"
                select
                label="Size"
                value={size}
                onChange={handleSizeChange}
                helperText="Select product Size"
            >
                {productsSize.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            {/* reset button */}
            <Button onClick={handleReset} variant="text">
                {/* <RestartAltIcon /> */}
                Reset</Button>
        </Box>
    );
};

export default ProductCategorySection;
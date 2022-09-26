import { MenuItem, TextField } from '@mui/material';
import React from 'react';



const ProductSearch = ({ data, setProduct }) => {

    const handleSearch = event => {
        const searchTxt = event.target.value;
        const matchedProducts = data.filter(product => product.title.toLowerCase().includes(searchTxt.toLowerCase()));
        setProduct(matchedProducts)
    }
    return (
        <TextField
            id="outlined-select-currency"
            label="search"
            onChange={handleSearch}
            helperText="search product by name"
        >
            {data.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default ProductSearch;
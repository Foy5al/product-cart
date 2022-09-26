import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirm = () => {
    return (
        <Box sx={{ textAlign: 'center' }}>
            <img style={{ height: '80vh', width: '80%' }} src="https://img.freepik.com/free-vector/thank-you-banner-poster-sticker-concept-geometric-memphis-style-with-text-thank-you_136321-1815.jpg?w=1380" alt="thanks_image" />
            <Typography variant='h4'>
                Your Order is Completed !!
                <Link to='/'>Back To Shopping</Link>
            </Typography>
        </Box>
    );
};

export default OrderConfirm;
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (

        <Box sx={{ textAlign: 'center' }}>
            <img style={{ height: '80vh', width: '70%' }} src="https://img.freepik.com/free-vector/internet-network-warning-404-error-page-file-found-web-page-internet-error-page-issue-found-network-404-error-present-by-man-sleep-display_1150-55450.jpg?w=1060&t=st=1664184834~exp=1664185434~hmac=82f0df7453748aac4734147e88e15e329a44629c304d1b830612faea4fc97f46" alt="404_img" />
            <Typography variant='h4'>
                Looks Like you're lost !!
                <Link to='/'>Back To Shopping</Link>
            </Typography>
        </Box>

    );
};

export default NotFound;
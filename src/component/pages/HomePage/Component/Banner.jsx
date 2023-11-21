import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const bannerStyle = {
    padding: '16px',
    backgroundColor: '#2196f3', // or use your primary color
    color: '#fff',
    textAlign: 'center',
    height: '30vh',
};

const Banner = () => {
    return (
        <Paper style={bannerStyle} elevation={3}>
            <Typography variant="h4" component="div">
                Welcome to Our Website!
            </Typography>
            <Typography variant="subtitle1">
                Discover amazing content and services.
            </Typography>
        </Paper>
    );
};

export default Banner;
import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const bannerStyle = {
    padding: '16px',
    backgroundImage: 'url(https://picsum.photos/1600/400)',
    color: '#fff',
    textAlign: 'center',
    height: '30vh',
};

const Banner = () => {
    return (
        <Paper style={bannerStyle} elevation={3}>

            <Typography variant="h4" component="div">
                Welcome to Toeic Master!
            </Typography>
            <Typography variant="subtitle1">
                Discover amazing content and services.
            </Typography>
        </Paper>
    );
};

export default Banner;
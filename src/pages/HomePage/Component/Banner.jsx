import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const bannerStyle = {
    padding: '16px',
    backgroundImage: 'url(https://s3.cloudfly.vn/tas/Backgroundimg%20%281%29.png?AWSAccessKeyId=PV92CA7JDT75TGOERRQL&Signature=UjLSuu9Gz12rsd6Dl5P7sg9MNDA%3D&Expires=1703486413)',
    color: '#fff',
    textAlign: 'center',
    height: '40vh',
};

const Banner = () => {
    return (
        <Paper style={bannerStyle} elevation={3}>

            <Typography variant="h4" component="div">
                Welcome to Toeic Master!
            </Typography>
        </Paper>
    );
};

export default Banner;
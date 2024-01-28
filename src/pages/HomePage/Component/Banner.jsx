import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const bannerStyle = {
    padding: '16px',
    backgroundImage: 'url(https://s3.cloudfly.vn/tas/Backgroundimg%20(2).png?AWSAccessKeyId=PV92CA7JDT75TGOERRQL&Expires=2022028289&Signature=qtpw1byxWy%2FMhZoAkpJL3gB2JXg%3D)',
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
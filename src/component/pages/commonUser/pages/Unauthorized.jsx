import React from 'react';
import { Box, Typography } from '@mui/material';

function Unauthorized() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Typography variant="h1" sx={{ mb: 2 }}>
                Unauthorized
            </Typography>
            <Typography variant="body1">You do not have permission to access this page.</Typography>
        </Box>
    );
}

export default Unauthorized;

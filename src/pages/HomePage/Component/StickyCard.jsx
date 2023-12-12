import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

const StickyCard = ({ id, image, name, description, level, stickyTop }) => {
    return (
        <div
            style={{
                height: '400px',
                width: '350px',
                marginTop: '140px',
                position: 'sticky',
                top: '100px',
                left: '1200px',
                backgroundColor: '#333',
                paddingTop: '16px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                transition: 'margin-top 0.3s ease-in-out', // Thêm hiệu ứng chuyển động
            }}
        >
            <Card Card sx={{ maxWidth: 400, margin: 2 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={name}
                />
                <CardContent>
                    <Typography variant="h6" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Level: {level}
                    </Typography>
                </CardContent>
            </Card >
        </div>
    );
};

export default StickyCard;
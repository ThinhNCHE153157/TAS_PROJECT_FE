import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

const StickyCard = ({ id, image, name, description, level }) => {
    return (
        <div
            style={{
                height: '500px',
                width: '400px',
                marginTop: '140px',
                position: 'sticky',
                top: '100px',
                left: '1200px',
                backgroundColor: '#333',
                paddingTop: '16px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
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

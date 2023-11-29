import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const CourseCard = ({ id, image, name, description, level, price, discount }) => {
    return (
        <Link href={`/Course/${id}`} underline="none" color="inherit">
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
                    <Typography variant="h6" sx={{ color: 'red' }}>
                        1.000.000đ
                    </Typography>
                </CardContent>
            </Card >
        </Link>
    );
};
export default CourseCard;
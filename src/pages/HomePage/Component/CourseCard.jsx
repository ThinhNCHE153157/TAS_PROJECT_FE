import React from 'react';
import Link from '@mui/material/Link';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';

const CourseCard = ({ id, image, name, description, level, price, discount }) => {
    function formatMoneyVND(number) {
        return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
    return (
        <Link href={`/Course/${id}`} underline="none" color="inherit">

            <Card sx={{ width: 320, minHeight: 380, marginTop: "20px" }} >
                <AspectRatio minHeight="120px" maxHeight="200px">
                    <img
                        src={image}
                        loading="lazy"
                        alt={name}
                    />
                </AspectRatio>
                <div>
                    <Typography level="title-lg">{name}</Typography>
                    <Typography level="body-sm">{description}</Typography>
                    <IconButton
                        aria-label="bookmark Bahamas Islands"
                        variant="plain"
                        color="neutral"
                        size="sm"
                        sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
                    >
                        {/* <BookmarkAdd /> */}
                    </IconButton>
                </div>
                <CardContent orientation="horizontal">
                    <div>
                        <Typography level="body-md">Giá:</Typography>
                        <Typography fontSize="lg" fontWeight="lg">
                            {formatMoneyVND(price - price * discount / 100)} &nbsp;
                            {discount > 0 ?
                                <span style={{ color: "white", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "green", fontSize: "13px" }}>-{discount}%</span> :
                                <Typography></Typography>
                            }

                        </Typography>
                        {discount > 0 ?
                            <Typography fontSize="md" fontWeight="lg" sx={{ textDecoration: "line-through", color: "red" }}>
                                {formatMoneyVND(price)}
                            </Typography> : null
                        }
                    </div>
                    <Button
                        variant="solid"
                        size="md"
                        color="primary"
                        aria-label="Explore Bahamas Islands"
                        sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                    >
                        Xem chi tiết
                    </Button>
                </CardContent>
            </Card>
        </Link >
    );
};
export default CourseCard;
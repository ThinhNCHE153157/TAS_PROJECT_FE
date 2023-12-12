import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function ListTestDetail({
    id,
    test_name,
    test_duration,
    test_total_score,
    test_description,
    createUser,
    updateUser,
    createDate,
    updateDate
}) {

    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    return (
        <Card sx={{
            maxWidth: 400,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        }}>
            <CardContent>
                <Typography gutterBottom variant="h4" component="div" align="center">
                    {test_name}
                </Typography>
                <ul>
                    <li>
                        <b>Create User: </b> {createUser}
                    </li>
                    <li>
                        <b>Update User: </b> {updateUser}
                    </li>
                    <li>
                        <b>Duration: </b> {test_duration}
                    </li>
                    <li>
                        {createDate} <b>-</b>{updateDate}
                    </li>
                </ul>
                <Typography variant="body" color="text.secondary">

                    {test_description}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`/ListTest/Test/${id}`} >
                    <Button variant='outlined' sx={{ marginLeft: 'auto' }} align="center">TEST</Button>
                </Link>
            </CardActions>
        </Card>
    );
}
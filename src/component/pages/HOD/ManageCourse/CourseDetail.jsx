import React, { useEffect, useState } from 'react';
import {
    Box,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import Sidebar from '../layout/Sidebar';
import NavBar from '../layout/NavBar';
import { Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteTwoToneIcon from '@mui/icons-material/EditNoteTwoTone';

const CourseDetail = () => {
    const { id } = useParams();
    const [Course, setCourse] = useState({});
    const [rows, setRows] = useState([]);
    useEffect(() => {
        async function getCourse() {
            const requestUrl = 'https://localhost:5000/api/Course/GetCourseById?id=' + id;
            const response = await fetch(requestUrl);
            const responseJSON = await response.json();
            setCourse(responseJSON);
            setRows(responseJSON.tests);
        }
        getCourse();
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Lưu ý rằng tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    return (
        <div>
            <NavBar />
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Paper component="main" sx={{ flexGrow: 1, p: 3, mt: 10, ml: 5, mr: 5, bgcolor: '#F7EFE5' }}>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 'Bold' }}>
                        Course Detail
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography sx={{ mt: 2 }} variant="h6" component="h2">
                                Course Name: {Course.courseId}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{ mt: 2 }} variant="body2" component="p">
                                Course Description: {Course.courseDescription}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Typography sx={{ mt: 2 }}>Course Level: {Course.courseLevel}</Typography>
                    <Typography sx={{ mt: 2 }}>Total Test: {Course.tests?.length}</Typography>
                </Paper>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Paper component="main" sx={{ flexGrow: 1, p: 3, mt: 5, ml: 5, mr: 5, bgcolor: '#F7EFE5' }}>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 'Bold' }}>
                        List Test
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Test Id</TableCell>
                                    <TableCell align="center">Test Name</TableCell>
                                    <TableCell align="center">UpdateUser&nbsp;</TableCell>
                                    <TableCell align="center">UpdateDate&nbsp;</TableCell>
                                    <TableCell align="center">Action&nbsp;</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {row.testId}
                                        </TableCell>
                                        <TableCell align="center">{row.testName}</TableCell>
                                        <TableCell align="center">{row.updateUser}</TableCell>
                                        <TableCell align="center">{formatDate(row.updateDate)}</TableCell>
                                        <TableCell align="center">
                                            <IconButton aria-label="delete" size="large">
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton>
                                                <EditNoteTwoToneIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </div>
    );
};

export default CourseDetail;

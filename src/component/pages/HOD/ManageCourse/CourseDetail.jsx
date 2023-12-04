import React, { useEffect, useState } from 'react';
import {
    Box,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TextField,
} from '@mui/material';
import Sidebar from '../layout/Sidebar';
import NavBar from '../layout/NavBar';
import { Paper } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import EditNoteTwoToneIcon from '@mui/icons-material/EditNoteTwoTone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { BASE_URL } from '../../../../Utils/Constants';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


const CourseDetail = () => {
    const token = localStorage.getItem('token').toString();
    const [refresh, setRefresh] = useState(false);
    const { id } = useParams();
    const [Course, setCourse] = useState({});
    const [rows, setRows] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [testUpdate, setTestUpdate] = useState({});
    const [openAdd, setOpenAdd] = useState(false);

    //region add test
    const [TestName, setTestName] = useState('');
    const [TestDuration, setTestDuration] = useState(0);
    const [TestTotalScore, setTestTotalScore] = useState(0);
    const [TestDescription, setTestDescription] = useState('');
    //endregion

    const handleClickAddOpen = () => {
        setOpenAdd(true);
    };
    const handleAdd = async () => {
        const tests = {
            "testName": TestName,
            "testDuration": TestDuration,
            "testTotalScore": TestTotalScore,
            "testDescription": TestDescription,
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', "Authorization": `Bearer ${token}` },
            body: JSON.stringify({
                "courseId": id,
                'tests': tests,
            })
        };
        await fetch(`${BASE_URL}Test/CreateTestForCourse`, requestOptions)
        setRefresh(!refresh);
        setOpenAdd(false);
    };

    const handleClickUpdateOpen = (testIdUpdate) => {
        setTestUpdate(testIdUpdate);
        console.log(testIdUpdate);
        setOpenUpdate(true);
    };
    const handleClose = () => {
        setOpenUpdate(false);
        setOpenAdd(false);
    };

    const handleUpdate = async (tId) => {
        console.log(tId);
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', "Authorization": `Bearer ${token}` },
        };
        await fetch(`${BASE_URL}Test/UpdateStatus?TestId=${tId}`, requestOptions)
        setRefresh(!refresh);
        setOpenUpdate(false);
    }

    useEffect(() => {
        async function getCourse() {
            const requestUrl = `${BASE_URL}Course/GetCourseById?id=` + id;
            const response = await fetch(requestUrl);
            const responseJSON = await response.json();
            setCourse(responseJSON);
            setRows(responseJSON.tests);
        }
        getCourse();
    }, [id, refresh]);

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
                                    <TableCell align="center">Test Name</TableCell>
                                    <TableCell align="center">UpdateUser&nbsp;</TableCell>
                                    <TableCell align="center">UpdateDate&nbsp;</TableCell>
                                    <TableCell align="center">Status&nbsp;</TableCell>
                                    <TableCell align="center">Action&nbsp;</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={row.testId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="center">{row.testName}</TableCell>
                                        <TableCell align="center">{row.updateUser}</TableCell>
                                        <TableCell align="center">{formatDate(row.updateDate)}</TableCell>
                                        <TableCell align="center">{row.isDeleted ? "Deactive" : "Active"}</TableCell>
                                        <TableCell align="center">
                                            <React.Fragment >
                                                <IconButton onClick={() => handleClickUpdateOpen(row.testId)} aria-label="delete" size="large">
                                                    {row.isDeleted ? <ToggleOffOutlinedIcon /> : <ToggleOnOutlinedIcon />}
                                                </IconButton>
                                                <Dialog
                                                    open={openUpdate}
                                                    onClose={handleClose}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                >
                                                    <DialogTitle id="alert-dialog-title">
                                                        {row.isDeleted ? "Do you want to active this test?" : "Do you want to deactive this test?"}
                                                    </DialogTitle>
                                                    <DialogActions>
                                                        <Button onClick={handleClose}>Cancel</Button>
                                                        <Button onClick={(e) => {
                                                            e.preventDefault();
                                                            handleUpdate(testUpdate);
                                                        }} autoFocus>
                                                            Update
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </React.Fragment>
                                            <Link to={`/admin/coursedetail/${Course.courseId}/${row.testId}`}>
                                                <IconButton>
                                                    <EditNoteTwoToneIcon />
                                                </IconButton>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid component="main" justifyContent="center"
                        alignItems="center" sx={{ flexGrow: 1, display: "flex", mt: 2 }}>
                        <React.Fragment >
                            <Button sx={{ mr: 2 }} variant='contained' onClick={handleClickAddOpen} >Add Test</Button>
                            <Dialog open={openAdd} onClose={handleClose}>
                                <DialogTitle>Add Test</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Test Name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={(e) => setTestName(e.target.value)}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        label="Test Duration"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={(e) => setTestDuration(e.target.value)}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        label="Test Total Score"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={(e) => setTestTotalScore(e.target.value)}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        label="Test description"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={(e) => setTestDescription(e.target.value)}
                                    />
                                    <Button sx={{ mt: 2 }} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                        Upload file questions
                                        <VisuallyHiddenInput type="file" />
                                    </Button>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={handleAdd}>Add</Button>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
                    </Grid>
                </Paper>
            </Box>
        </div >
    );
};

export default CourseDetail;

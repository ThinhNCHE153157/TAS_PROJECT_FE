import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import Sidebar from '../layout/Sidebar';
import NavBar from '../layout/NavBar';
import { Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { set } from 'react-hook-form';
import { BASE_URL } from '../../../Utils/Constants';


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

const TestDetail = () => {
    const token = localStorage.getItem('token').toString();
    const { courseId, testId } = useParams();
    const [Test, setTest] = useState({});
    const [Question, setQuestion] = useState([]);

    const [refresh, setRefresh] = useState(false); // This is for refresh data after edit
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEditTest, setOpenEditTest] = useState(false);

    const [questionId, setQuestionId] = useState(''); // This is for Update question
    const [description, setDescription] = useState('');
    const [resultA, setResultA] = useState('');
    const [resultB, setResultB] = useState('');
    const [resultC, setResultC] = useState('');
    const [resultD, setResultD] = useState('');
    const [correctResult, setCorrectResult] = useState('');

    //#region Test
    const [testName, setTestName] = useState('');
    const [testDescription, setTestDescription] = useState('');
    const [testDuration, setTestDuration] = useState('');
    const [testTotalScore, setTestTotalScore] = useState('');
    //#endregion


    const handleClickEditTest = (name, des, duration, score) => {
        setTestName(name);
        setTestDescription(des);
        setTestDuration(duration);
        setTestTotalScore(score);
        setOpenEditTest(true);
    }
    const handleEditTest = async () => {
        const requestOptions = {
            method: 'put',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', "Authorization": `Bearer ${token}` },
            body: JSON.stringify({
                testId: testId,
                testName: testName,
                testDescription: testDescription,
                testDuration: testDuration,
                testTotalScore: testTotalScore,
            })
        };
        await fetch(`${BASE_URL}Test/UpdateTest`, requestOptions)
        setRefresh(!refresh);
        setOpenEditTest(false);
    }

    const handleClickAddOpen = () => {
        setOpenAdd(true);
    };
    const handleAdd = async () => {
        const questionNavigation = {
            resultA: resultA,
            resultB: resultB,
            resultC: resultC,
            resultD: resultD,
            correctResult: correctResult,
        }
        const requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', "Authorization": `Bearer ${token}` },
            body: JSON.stringify({
                description: description,
                image: "null",
                type: "null",
                note: "null",
                questionNavigation: questionNavigation,
                testId: testId,
            })
        };
        await fetch(`${BASE_URL}Question/CreateQuestion`, requestOptions)
        setRefresh(!refresh);
        setOpenAdd(false);
    }

    const handleClickOpen = (id, des, a, b, c, d, correct) => {
        setQuestionId(id);
        setDescription(des);
        setResultA(a);
        setResultB(b);
        setResultC(c);
        setResultD(d);
        setCorrectResult(correct);

        setOpen(true);
    };

    const handleClickDeleteOpen = (name) => {
        setOpenDelete(true);
    };
    const handleUpdate = async () => {
        const questionNavigation = {
            questionId: questionId,
            resultA: resultA,
            resultB: resultB,
            resultC: resultC,
            resultD: resultD,
            correctResult: correctResult,
        }
        const requestOptions = {
            method: 'put',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', "Authorization": `Bearer ${token}` },
            body: JSON.stringify({
                questionId: questionId,
                description: description,
                image: "null",
                type: "null",
                note: "null",
                questionNavigation: questionNavigation,
            })
        };
        await fetch(`${BASE_URL}Question/UpdateQuestion`, requestOptions)
        setRefresh(!refresh);
        setOpen(false);
    }
    const handleClose = () => {
        setOpenEditTest(false);
        setOpenAdd(false);
        setOpenDelete(false);
        setOpen(false);
    }

    const handleDelete = async (id) => {
        const requestOptions = {
            method: 'delete',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', "Authorization": `Bearer ${token}` }
        };
        await fetch(`${BASE_URL}Question/DeleteQuestion?questionId=${id}`, requestOptions)
        setRefresh(!refresh);
        setOpenDelete(false);
    }

    useEffect(() => {
        async function getTest() {
            const requestOptions = {
                method: 'get',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', "Authorization": `Bearer ${token}` }
            };
            const response = await fetch(`${BASE_URL}Test/GetTestById?testId=${testId}`, requestOptions)
            const responseJSON = await response.json();
            setTest(responseJSON);
        }
        getTest();

    }, [testId, token, refresh]);

    useEffect(() => {
        async function getQuestion() {
            const requestOptions = {
                method: 'get',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', "Authorization": `Bearer ${token}` }
            };
            const response = await fetch(`${BASE_URL}Question/GetQuestionByTestId?TestId=${testId}`, requestOptions)
            const responseJSON = await response.json();
            setQuestion(responseJSON);

        }
        getQuestion();
    }, [refresh, token, testId]);

    return (
        <div>
            <NavBar />
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Paper component="main" sx={{ flexGrow: 1, p: 3, mt: 10, ml: 5, mr: 5, bgcolor: '#F7EFE5' }}>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 'Bold' }}>
                        Test Detail: {Test.testName}
                        <React.Fragment >
                            <Button sx={{ float: 'right' }} variant='contained' onClick={() => handleClickEditTest(Test.testName, Test.testDescription, Test.testDuration, Test.testTotalScore)}>
                                Edit Test
                            </Button>
                            <Dialog open={openEditTest} onClose={handleClose}>
                                <DialogTitle>Edit Test</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Test Name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={testName}
                                        onChange={(e) => setTestName(e.target.value)}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Test Description"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={testDescription}
                                        onChange={(e) => setTestDescription(e.target.value)}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        label="Test Duration"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={testDuration}
                                        onChange={(e) => setTestDuration(e.target.value)}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        label="Test Total Score"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={testTotalScore}
                                        onChange={(e) => setTestTotalScore(e.target.value)}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={handleEditTest}>Edit</Button>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography sx={{ mt: 2 }} variant="h6" component="h2">
                                Total Question: {Question.length}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{ mt: 2 }} variant="body2" component="p">
                                Test Description: {Test.testDescription}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Typography sx={{ mt: 2 }}>Test Duration: {Test.testDuration}</Typography>
                    <Typography sx={{ mt: 2 }}>Test Total Score: {Test.testTotalScore}</Typography>

                    <Typography sx={{ mt: 4, fontWeight: 'bold' }} component="h2">List Question:</Typography>

                    <Grid container spacing={2}>
                        {Question.map((question) => (
                            <Grid item xs={6} key={question.questionId}>
                                <Card sx={{ mt: 2 }} >
                                    <CardContent>
                                        <Typography variant="h6" component="h2">
                                            {question.description}
                                            <React.Fragment >
                                                <Button sx={{ float: 'right' }} onClick={() => handleClickOpen(question.questionId, question.description, question.resultA, question.resultB, question.resultC, question.resultD, question.correctResult)}>
                                                    Edit
                                                </Button>
                                                <Dialog open={open} onClose={handleClose}>
                                                    <DialogTitle>Edit Question</DialogTitle>
                                                    <DialogContent>
                                                        <TextField
                                                            autoFocus
                                                            margin="dense"
                                                            id="name"
                                                            label="Question"
                                                            type="text"
                                                            fullWidth
                                                            variant="standard"
                                                            value={description}
                                                            onChange={(e) => setDescription(e.target.value)}
                                                        />
                                                        <TextField
                                                            margin="dense"
                                                            id="name"
                                                            label="Answer A"
                                                            type="text"
                                                            fullWidth
                                                            variant="standard"
                                                            value={resultA}
                                                            onChange={(e) => setResultA(e.target.value)}
                                                        />
                                                        <TextField
                                                            margin="dense"
                                                            id="name"
                                                            label="Answer B"
                                                            type="text"
                                                            fullWidth
                                                            variant="standard"
                                                            value={resultB}
                                                            onChange={(e) => setResultB(e.target.value)}
                                                        />
                                                        <TextField
                                                            margin="dense"
                                                            id="name"
                                                            label="Answer C"
                                                            type="text"
                                                            fullWidth
                                                            variant="standard"
                                                            value={resultC}
                                                            onChange={(e) => setResultC(e.target.value)}
                                                        />
                                                        <TextField
                                                            margin="dense"
                                                            id="name"
                                                            label="Answer D"
                                                            type="text"
                                                            fullWidth
                                                            variant="standard"
                                                            value={resultD}
                                                            onChange={(e) => setResultD(e.target.value)}
                                                        />
                                                        <TextField
                                                            margin="dense"
                                                            id="name"
                                                            label="Correct Answer"
                                                            type="text"
                                                            fullWidth
                                                            variant="standard"
                                                            value={correctResult}
                                                            onChange={(e) => setCorrectResult(e.target.value)}
                                                        />
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={handleClose}>Cancel</Button>
                                                        <Button onClick={handleUpdate}>Update</Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </React.Fragment>
                                            <React.Fragment >
                                                <Button name={"Button" + question.questionId} sx={{ float: 'right' }} onClick={(e) => handleClickDeleteOpen(e.target.name)}>Delete</Button>
                                                <Dialog
                                                    open={openDelete}
                                                    onClose={handleClose}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                >
                                                    <DialogTitle id="alert-dialog-title">
                                                        {"Do you want to delete this question?"}
                                                    </DialogTitle>
                                                    <DialogActions>
                                                        <Button onClick={handleClose}>Cancel</Button>
                                                        <Button onClick={(e) => {
                                                            e.preventDefault();
                                                            handleDelete(question.questionId)
                                                        }} autoFocus>
                                                            Delete
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </React.Fragment>
                                        </Typography>

                                        <Typography
                                            sx={{ mt: 1, color: "A" === question.correctResult ? 'green' : 'red' }}
                                        >
                                            Option A:&nbsp; &nbsp;{question.resultA}
                                        </Typography>
                                        <Typography
                                            sx={{ mt: 1, color: "B" === question.correctResult ? 'green' : 'red' }}
                                        >
                                            Option B:&nbsp; &nbsp;{question.resultB}
                                        </Typography>
                                        <Typography
                                            sx={{ mt: 1, color: "C" === question.correctResult ? 'green' : 'red' }}
                                        >
                                            Option C:&nbsp; &nbsp;{question.resultC}
                                        </Typography>
                                        <Typography
                                            sx={{ mt: 1, color: "D" === question.correctResult ? 'green' : 'red' }}
                                        >
                                            Option D:&nbsp; &nbsp;{question.resultD}
                                        </Typography>
                                        <Typography
                                            sx={{ mt: 1, color: 'green', fontWeight: 'bold' }}
                                        >
                                            Correct Answer:&nbsp; &nbsp;{question.correctResult}
                                        </Typography>

                                    </CardContent>

                                </Card>
                            </Grid>
                        ))
                        }
                    </Grid>
                    <Grid component="main" justifyContent="center"
                        alignItems="center" sx={{ flexGrow: 1, display: "flex", mt: 2 }}>
                        <React.Fragment >
                            <Button sx={{ mr: 2 }} variant='contained' onClick={handleClickAddOpen} >Add Question</Button>
                            <Dialog open={openAdd} onClose={handleClose}>
                                <DialogTitle>Add Question</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Question"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        label="Answer A"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={(e) => setResultA(e.target.value)}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        label="Answer B"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={(e) => setResultB(e.target.value)}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        label="Answer C"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={(e) => setResultC(e.target.value)}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        label="Answer D"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={(e) => setResultD(e.target.value)}
                                    />
                                    <FormControl fullWidth sx={{ mt: 2 }}>
                                        <InputLabel id="demo-simple-select-label">Correct Answer</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Correct Answer"
                                            onChange={(e) => setCorrectResult(e.target.value)}
                                        >
                                            <MenuItem value={"A"}>A</MenuItem>
                                            <MenuItem value={"B"}>B</MenuItem>
                                            <MenuItem value={"C"}>C</MenuItem>
                                            <MenuItem value={"D"}>D</MenuItem>
                                        </Select>
                                    </FormControl>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={handleAdd}>Add</Button>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Upload file
                            <VisuallyHiddenInput type="file" />
                        </Button>
                    </Grid>
                </Paper>
            </Box>
        </div >
    );
};

export default TestDetail;

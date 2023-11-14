import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import Sidebar from '../layout/Sidebar';
import NavBar from '../layout/NavBar';
import { Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@mui/material';

const TestDetail = () => {
    const token = localStorage.getItem('token').toString();
    const { courseId, testId } = useParams();
    const [Test, setTest] = useState({});
    const [Question, setQuestion] = useState([]);

    const [refresh, setRefresh] = useState(false); // This is for refresh data after edit
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [questionId, setQuestionId] = useState(''); // This is for Update question
    const [description, setDescription] = useState('');
    const [resultA, setResultA] = useState('');
    const [resultB, setResultB] = useState('');
    const [resultC, setResultC] = useState('');
    const [resultD, setResultD] = useState('');
    const [correctResult, setCorrectResult] = useState('');

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

    const handleClickDeleteOpen = () => {
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
        await fetch(`https://localhost:5000/api/Question/UpdateQuestion`, requestOptions)
        setRefresh(!refresh);
        setOpen(false);
    }
    const handleClose = () => {
        setOpenDelete(false);
        setOpen(false);
    }

    const handleDelete = async (id) => {
        const requestOptions = {
            method: 'delete',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', "Authorization": `Bearer ${token}` }
        };
        await fetch(`https://localhost:5000/api/Question/DeleteQuestion?questionId=${id}`, requestOptions)
        setRefresh(!refresh);
    }

    useEffect(() => {
        async function getTest() {
            const requestOptions = {
                method: 'get',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', "Authorization": `Bearer ${token}` }
            };
            const response = await fetch(`https://localhost:5000/api/Test/GetTestById?testId=${testId}`, requestOptions)
            const responseJSON = await response.json();
            setTest(responseJSON);
        }
        getTest();

    }, [testId, token]);
    console.log(Test);

    useEffect(() => {
        async function getQuestion() {
            const requestOptions = {
                method: 'get',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', "Authorization": `Bearer ${token}` }
            };
            const response = await fetch(`https://localhost:5000/api/Question/GetQuestionByTestId?TestId=${testId}`, requestOptions)
            const responseJSON = await response.json();
            setQuestion(responseJSON);

        }
        getQuestion();
    }, [refresh, token, testId]);

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
                        Test Detail: {Test.testName}
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

                    <Typography sx={{ mt: 4 }}>List Question:</Typography>

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
                                                <Button sx={{ float: 'right' }} onClick={handleClickDeleteOpen}>Delete</Button>
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
                                                        <Button onClick={() => handleDelete(question.questionId)} autoFocus>
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
                        <Button sx={{ justifyContent: "center" }} variant='contained' >Add Question</Button>
                    </Grid>
                </Paper>
            </Box>
        </div >
    );
};

export default TestDetail;
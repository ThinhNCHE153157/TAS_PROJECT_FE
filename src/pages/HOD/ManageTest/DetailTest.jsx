import React, { useState, useEffect } from 'react';
import {
    Button,
    Container,
    Paper,
    Typography,
    List,
    Grid,
    ListItemText,
    Radio,
} from '@mui/material';
import NavBar from '../layout/NavBar'

const questionsPerPage = 5;

const testData = {
    timeLimitInMinutes: 30, // Thời gian kiểm tra 5 phút
    questions: [
        {
            question: 'Which of the following are negative consequences of meaningless work?',
            answers: ['đáp án A', 'đáp án B', 'đáp án C', 'đáp án D'],
            correctAnswer: 'A',
        },
        {
            question: 'Câu hỏi 2?',
            answers: ['A', 'B', 'C', 'D'],
            correctAnswer: 'B',
        },
        {
            question: 'Câu hỏi 3?',
            answers: ['Câu hỏi A', 'Câu hỏi B', 'Câu hỏi C', 'Câu hỏi D'],
            correctAnswer: 'B',
        },
        {
            question: 'Câu hỏi 4?',
            answers: ['Test A', 'Test B', 'Test C', 'Test D'],
            correctAnswer: 'B',
        },
        {
            question: 'Câu hỏi 4?',
            answers: ['Test A', 'Test B', 'Test C', 'Test D'],
            correctAnswer: 'B',
        },
        {
            question: 'Câu hỏi 4?',
            answers: ['Test A', 'Test B', 'Test C', 'Test D'],
            correctAnswer: 'B',
        },
        {
            question: 'Câu hỏi 4?',
            answers: ['Test A', 'Test B', 'Test C', 'Test D'],
            correctAnswer: 'B',
        },
        {
            question: 'Câu hỏi 4?',
            answers: ['Test A', 'Test B', 'Test C', 'Test D'],
            correctAnswer: 'B',
        },
    ]
};


const DetailTest = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(
        () => {
            const savedTimeLeft = localStorage.getItem('timeLeft');
            return savedTimeLeft ? parseInt(savedTimeLeft, 10) : testData.timeLimitInMinutes * 60;
        }
    );

    useEffect(() => {
        if (timeLeft > 0) {
            const countdown = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => {
                clearInterval(countdown);
                localStorage.setItem('timeLeft', timeLeft);
            };
        }
    }, [timeLeft]);

    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = Math.min(startIndex + questionsPerPage, testData.questions.length);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleAnswerClick = (questionIndex, selectedAnswer) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: selectedAnswer,
        });
    };

    const handleSubmit = () => {
        let totalScore = 0;

        for (let i = startIndex; i < endIndex; i++) {
            if (selectedAnswers[i] === testData.questions[i].correctAnswer) {
                totalScore++;
            }
        }

        alert(`Kết quả: ${totalScore} / ${questionsPerPage}`);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };


    return (
        <div>
            <NavBar />
            <Container maxWidth="xl" style={{ padding: '60px' }}>
                <Grid container className='container'>
                    <Grid item xl={2.5} style={{ marginRight: '10px' }}>
                        <Paper elevation={3} style={{ padding: '20px' }}>
                            <Typography variant="h6" gutterBottom>
                                NỘI DỤNG
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xl={6.8} style={{ marginRight: '10px' }}>
                        <Paper elevation={3} style={{ padding: '20px' }}>
                            <Typography variant="h4" gutterBottom>
                                Bài kiểm tra
                            </Typography>
                            {testData.questions.slice(startIndex, endIndex).map((question, index) => (
                                <div className="question-list" key={startIndex + index}>
                                    <Typography variant="h6" gutterBottom>
                                        Câu hỏi {startIndex + index + 1}/{testData.questions.length}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {question.question}
                                    </Typography>
                                    <List>
                                        {question.answers.map((answer, answerIndex) => (
                                            <div key={answerIndex} className="list-item">
                                                <Radio
                                                    checked={selectedAnswers[startIndex + index] === answer}
                                                    onClick={() =>
                                                        handleAnswerClick(startIndex + index, answer)
                                                    }
                                                />
                                                <ListItemText primary={answer} />
                                            </div>
                                        ))}
                                    </List>
                                </div>
                            ))}
                            <div className="navigation">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNextPage}
                                    disabled={endIndex >= testData.questions.length}
                                >
                                    Next
                                </Button>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xl={2.5} style={{ marginRight: '10px' }}>
                        <Paper style={{ padding: '90px', position: 'fixed' }}>
                            <Typography variant="h6" gutterBottom>
                                Thời gian còn lại: {formatTime(timeLeft)}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleSubmit()}
                            >
                                Summit
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
                <style>
                    {`
            .container {
                position: fixed;
                top: 70px;
                left: 0;
                width: 100%;
                height: 90%;
                overflow: auto;
            }
            .question-list {
              margin-bottom: 20px;
            }
    
            .list-item {
              display: flex;
              align-items: center;
            }
    
            .list-item .MuiRadio-root {
              margin-right: 8px;
            }
    
            .navigation {
              display: flex;
              justify-content: space-between;
            }
          `}
                </style>
            </Container>
        </div>
    );
};

export default DetailTest;
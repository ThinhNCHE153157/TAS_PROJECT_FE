import React, { useState, useEffect } from 'react';
import {
    Button,
    Container,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Radio,
} from '@mui/material';

const questionsPerPage = 5;

const questions = [
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
];

const DetailTest = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

    useEffect(() => {
        if (timeLeft > 0) {
            const countdown = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearInterval(countdown);
        }
    }, [timeLeft]);

    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = Math.min(startIndex + questionsPerPage, questions.length);

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
            if (selectedAnswers[i] === questions[i].correctAnswer) {
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
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: '20px', display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
                <div>
                    <Typography variant="h4" gutterBottom>
                        Bài kiểm tra
                    </Typography>
                    {questions.slice(startIndex, endIndex).map((question, index) => (
                        <div className="question-list" key={startIndex + index}>
                            <Typography variant="h6" gutterBottom>
                                Câu hỏi {startIndex + index + 1}/{questions.length}
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
                            disabled={endIndex >= questions.length}
                        >
                            Next
                        </Button>
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                        Thời gian còn lại
                    </Typography>
                    <Typography variant="h4">
                        {formatTime(timeLeft)}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
            </Paper>
            <style>
                {`
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
    );
};

export default DetailTest;
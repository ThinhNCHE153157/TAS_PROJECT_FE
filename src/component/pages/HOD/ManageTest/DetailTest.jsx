import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { Button, Container, Paper, Typography, List, ListItem, ListItemText, Divider, Radio } from '@mui/material';



const questions = [
    {
        question: 'Câu hỏi 1?',
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
];

const DetailTest = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleAnswerClick = (selectedAnswer) => {
        questions[currentQuestion].selectedAnswer = selectedAnswer;
    };

    const handleSubmit = () => {
        let totalScore = 0;
        for (const question of questions) {
            if (question.selectedAnswer === question.correctAnswer) {
                totalScore++;
            }
        }

        alert(`Kết quả: ${totalScore} / ${questions.length}`);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Bài kiểm tra
                </Typography>
                <div className="question-list">
                    <Typography variant="h6" gutterBottom>
                        Câu hỏi {currentQuestion + 1}/{questions.length}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {questions[currentQuestion].question}
                    </Typography>
                    <List>
                        {questions[currentQuestion].answers.map((answer, index) => (
                            <div key={index} className="list-item">
                                <Radio
                                    checked={questions[currentQuestion].selectedAnswer === answer}
                                />
                                <ListItemText primary={answer} />
                            </div>
                        ))}
                    </List>
                </div>
                <div className="navigation">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handlePreviousQuestion()}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleNextQuestion()}
                    >
                        Next
                    </Button>

                </div>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleSubmit()}
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
}
export default DetailTest;

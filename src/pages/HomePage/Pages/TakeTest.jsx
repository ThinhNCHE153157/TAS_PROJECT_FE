import React, { useEffect, useState } from 'react';
import Header from '../../../layout/Header';
import Footer from '../../../layout/Footer';
import { GetlistQuestionOfTest } from '../../../Services/TestService';
import { Grid } from '@mui/material';
import { Button, Typography } from '@mui/joy';

const questions = [
    {
        question: 'What is the capital of France?',
        options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        correctAnswer: 'Paris',
    },
    {
        question: 'Which programming language is this app built with?',
        options: ['Java', 'Python', 'JavaScript', 'C++'],
        correctAnswer: 'JavaScript',
    },
];

const TakeTest = () => {
    const [Listquestions, setListQuestions] = useState([]);
    useEffect(() => {
        const QuestionData = async () => {
            const data = await GetlistQuestionOfTest(1);
            setListQuestions(data);
        };
        QuestionData();
    }, []);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
    const [showResults, setShowResults] = useState(false);

    const handleOptionSelect = (selectedOption) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestion] = selectedOption;
        setUserAnswers(newAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
    };

    const handleRestartQuiz = () => {
        setCurrentQuestion(0);
        setUserAnswers(Array(questions.length).fill(null));
        setShowResults(false);
    };

    const calculateScore = () => {
        let score = 0;
        questions.forEach((question, index) => {
            if (question.correctAnswer === userAnswers[index]) {
                score += 1;
            }
        });
        return score;
    };
    return (
        <>
            <Header />
            <div class="container-fluid" style={{ marginTop: "100.47px", minHeight: "100vh" }}>
                <div className="App" style={{ position: "relative" }}>
                    <div style={{ position: "absolute", right: "100px", top: "10px" }}>
                        <Button >Nộp bài</Button> &nbsp;&nbsp;&nbsp;
                        <span style={{ fontSize: "20px" }}>Thời gian:</span>
                    </div>
                    <Grid container spacing={2} sx={{ flexGrow: 1, minHeight: "90vh", }}>
                        <Grid xs={6} md={6} style={{ backgroundColor: "#ccc" }}>
                            <div style={{ marginLeft: "50px", marginTop: "50px" }}>
                                <Typography fontSize={20} >Câu hỏi:</Typography>
                            </div>
                            <div style={{ marginLeft: "50px", marginTop: "20px", marginRight: "50px", height: "70vh", backgroundColor: "#fff" }}>
                                <div>
                                    <img src='' />
                                </div>
                            </div>
                        </Grid>
                        <Grid xs={6} md={6} sx={{ backgroundColor: "#ccc" }}>
                            <div style={{ marginLeft: "50px", marginTop: "50px" }}>
                                <Typography fontSize={20} >Trả lời:</Typography>
                            </div>
                            <div style={{ marginLeft: "50px", marginTop: "20px", marginRight: "50px", height: "70vh", backgroundColor: "#fff", position: "relative" }}>
                                {showResults ? (
                                    <div>
                                        <h2>Results</h2>
                                        <p>Your Score: {calculateScore()} out of {questions.length}</p>
                                        <button onClick={handleRestartQuiz}>Restart Quiz</button>
                                    </div>
                                ) : (
                                    <>
                                        <div style={{ marginLeft: "20px", position: "absolute", top: "20px" }}>
                                            <h4>{questions[currentQuestion].question}</h4>
                                            <div>
                                                {questions[currentQuestion].options.map((option, index) => (
                                                    <div key={index}>
                                                        <input
                                                            type="radio"
                                                            id={option}
                                                            name="answer"
                                                            value={option}
                                                            checked={userAnswers[currentQuestion] === option}
                                                            onChange={() => handleOptionSelect(option)}
                                                        />
                                                        <label htmlFor={option}>{option}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>)}
                            </div>
                            <Button onClick={handleNextQuestion}>Next</Button>
                        </Grid>
                    </Grid>

                    {/* {showResults ? (
                        <div>
                            <h2>Results</h2>
                            <p>Your Score: {calculateScore()} out of {questions.length}</p>
                            <button onClick={handleRestartQuiz}>Restart Quiz</button>
                        </div>
                    ) : (
                        <>
                            <div>
                                <h2>Question {currentQuestion + 1}</h2>
                                <p>{questions[currentQuestion].question}</p>
                                <div>
                                    {questions[currentQuestion].options.map((option, index) => (
                                        <div key={index}>
                                            <input
                                                type="radio"
                                                id={option}
                                                name="answer"
                                                value={option}
                                                checked={userAnswers[currentQuestion] === option}
                                                onChange={() => handleOptionSelect(option)}
                                            />
                                            <label htmlFor={option}>{option}</label>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={handleNextQuestion}>Next</button>
                            </div>
                            <div> */}

                    {/* {Listquestions.map((question) => (
                                    <div>
                                        <h2>Question {currentQuestion + 1}</h2>
                                        <p>{question.question}</p>
                                        <div>
                                            {question.options.map((option, index) => (
                                                <div key={index}>
                                                    <input
                                                        type="radio"
                                                        id={option}
                                                        name="answer"
                                                        value={option}
                                                        checked={userAnswers[currentQuestion] === option}
                                                        onChange={() => handleOptionSelect(option)}
                                                    />
                                                    <label htmlFor={option}>{option}</label>
                                                </div>
                                            ))}
                                        </div>
                                        <button onClick={handleNextQuestion}>Next</button>
                                    </div>
                                ))} */}
                    {/* </div>
                        </>
                    )} */}
                </div >
            </div >
            <Footer />
        </>

    );
}

export default TakeTest;

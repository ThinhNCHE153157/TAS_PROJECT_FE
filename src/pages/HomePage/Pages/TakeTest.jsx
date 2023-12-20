import React, { useEffect, useState } from 'react';
import Header from '../../../layout/Header';
import Footer from '../../../layout/Footer';
import { GetlistQuestionOfTest } from '../../../Services/TestService';
import { Grid } from '@mui/material';
import { Button, Typography } from '@mui/joy';

const questions = [
    {
        "id": "1",
        "question": "What is the capital of France?",
        "correctAnswer": "Paris",
        "options": ["Paris", 'abvdd', 'asdfasdfasdf', 'asdkfjh3iouwe'],
        "partId": "1"
    },
    {
        "id": "2",
        "question": "Who painted the Mona Lisa?",
        "correctAnswer": "Leonardo da Vinci",
        "options": ["Canberra", 'Leonardo da Vinci', 'asdfasdfasdf', 'asdkfjh3iouwe'],
        "partId": "2"
    },
    {
        "id": "3",
        "question": "What is the largest planet in our solar system?",
        "correctAnswer": "Jupiter",
        "options": ["Canberra", 'abvdd', 'Jupiter', 'asdkfjh3iouwe'],
        "partId": "3"
    },
    {
        "id": "4",
        "question": "What is the chemical symbol for gold?",
        "correctAnswer": "Au",
        "options": ["Canberra", 'abvdd', 'Au', 'asdkfjh3iouwe'],
        "partId": "4"
    },
    {
        "id": "5",
        "question": "Who wrote the play Romeo and Juliet?",
        "correctAnswer": "William Shakespeare",
        "options": ["Canberra", 'abvdd', 'asdfasdfasdf', 'William Shakespeare'],
        "partId": "5"
    },
    {
        "id": "6",
        "question": "What is the tallest mountain in the world?",
        "correctAnswer": "Mount Everest",
        "options": ["Canberra", 'abvdd', 'Mount Everest', 'asdkfjh3iouwe'],
        "partId": "6"
    },
    {
        "id": "7",
        "question": "What is the formula for water?",
        "correctAnswer": "H2O",
        "options": ["Canberra", 'H2O', 'asdfasdfasdf', 'asdkfjh3iouwe'],
        "partId": "7"
    },
    {
        "id": "8",
        "question": "Who is the current president of the United States?",
        "correctAnswer": "Joe Biden",
        "options": ["Canberra", 'abvdd', 'asdfasdfasdf', 'Joe Biden'],
        "partId": "1"
    },
    {
        "id": "9",
        "question": "What is the largest ocean on Earth?",
        "correctAnswer": "Pacific Ocean",
        "options": ["Canberra", 'Pacific Ocean', 'asdfasdfasdf', 'asdkfjh3iouwe'],
        "partId": "2"
    },
    {
        "id": "10",
        "question": "What is the square root of 64?",
        "correctAnswer": "8",
        "options": ["Canberra", 'abvdd', '8', 'asdkfjh3iouwe'],
        "partId": "3"
    },
    {
        "id": "11",
        "question": "Who invented the telephone?",
        "correctAnswer": "Alexander Graham Bell",
        "options": ["Canberra", 'Alexander Graham Bell', 'asdfasdfasdf', 'asdkfjh3iouwe'],
        "partId": "4"
    },
    {
        "id": "12",
        "question": "What is the capital of Japan?",
        "correctAnswer": "Tokyo",
        "options": ["Canberra", 'abvdd', 'Tokyo', 'asdkfjh3iouwe'],
        "partId": "5"
    },
    {
        "id": "13",
        "question": "What is the boiling point of water in Celsius?",
        "correctAnswer": "100",
        "options": ["Canberra", '100', 'asdfasdfasdf', 'asdkfjh3iouwe'],
        "partId": "6"
    },
    {
        "id": "14",
        "question": "Who wrote the novel Pride and Prejudice?",
        "correctAnswer": "Jane Austen",
        "options": ["Canberra", 'abvdd', 'Jane Austen', 'asdkfjh3iouwe'],
        "partId": "7"
    },
    {
        "id": "15",
        "question": "What is the largest country in the world by land area?",
        "correctAnswer": "Russia",
        "options": ["Canberra", 'Russia', 'asdfasdfasdf', 'asdkfjh3iouwe'],
        "partId": "1"
    },
    {
        "id": "16",
        "question": "What is the symbol for the element oxygen?",
        "correctAnswer": "O",
        "options": ["Canberra", 'O', 'asdfasdfasdf', 'asdkfjh3iouwe'],
        "partId": "2"
    },
    {
        "id": "17",
        "question": "Who discovered gravity?",
        "correctAnswer": "Isaac Newton",
        "options": ["Canberra", 'abvdd', 'Isaac Newton', 'asdkfjh3iouwe'],
        "partId": "3"
    },
    {
        "id": "18",
        "question": "What is the capital of Australia?",
        "correctAnswer": "Canberra",
        "options": ["Canberra", 'abvdd', 'asdfasdfasdf', 'asdkfjh3iouwe'],
        "partId": "4"
    },
    {
        "id": "19",
        "question": "What is the square root of 81?",
        "correctAnswer": "9",
        "options": ["Canberra", '9', 'asdfasdfasdf', 'asdkfjh3iouwe'],
        "partId": "5"
    },
    {
        "id": "20",
        "question": "Who painted the Starry Night?",
        "correctAnswer": "Vincent van Gogh",
        "options": ["Vincent van Gogh", 'abvdd', 'asdfasdfasdf', 'asdkfjh3iouwe'],
        "partId": "6"
    }
]

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

import React, { useState } from 'react';
import Header from '../../../layout/Header';
import Footer from '../../../layout/Footer';

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
            <div class="container" style={{ marginTop: "69.47px", minHeight: "100vh" }}>
                <div className="row" style={{ marginTop: "100px", marginBottom: "10px" }}>
                    <div className="col-12">
                        <h1>Multiple Choice Test</h1>
                    </div>
                </div>
                <div className="App">

                    {showResults ? (
                        <div>
                            <h2>Results</h2>
                            <p>Your Score: {calculateScore()} out of {questions.length}</p>
                            <button onClick={handleRestartQuiz}>Restart Quiz</button>
                        </div>
                    ) : (
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
                    )}
                </div>
            </div>
            <Footer />
        </>

    );
}

export default TakeTest;

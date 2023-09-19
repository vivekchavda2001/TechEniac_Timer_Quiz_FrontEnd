import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GameComponent = () => {
  const operators = ["+", "-", "*", "/"];
  const questionTimeout = 30000;
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const onStartGameClickHandler = () => {
    navigate("/game");
  };
  const generateUniqueEquation = () => {
    const num1 = generateRandomNumber(0, 9);
    const num2 = generateRandomNumber(0, 9);
    const operator = operators[generateRandomNumber(0, 3)];
    return { num1, operator, num2, correctAnswer: eval(`${num1} ${operator} ${num2}`) };
  };
  const [currentEquation, setCurrentEquation] = useState(
    generateUniqueEquation()
  );
  const [answers, setAnswers] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);
  const [timer, setTimer] = useState(questionTimeout);
  const generateRandomAnswers = (correctAnswer) => {
    const uniqueAnswers = new Set();
    uniqueAnswers.add(correctAnswer);
    while (uniqueAnswers.size < 4) {
      const randomAnswer = generateRandomNumber(-20, 20);
      uniqueAnswers.add(randomAnswer);
    }
    return Array.from(uniqueAnswers);
  };
  useEffect(() => {
    const randomAnswers = generateRandomAnswers(currentEquation.correctAnswer);
    setAnswers(randomAnswers);
    const questionTimer = setTimeout(() => {
      handleAnswerClick(null);
    }, questionTimeout);
    setTimer(questionTimeout);
    return () => {
      clearTimeout(questionTimer);
    };
  }, [currentEquation]);
  const handleAnswerClick = (selectedAnswer) => {
    clearTimeout(timer);
    const isCorrect = selectedAnswer === currentEquation.correctAnswer;
    const userAnswer = selectedAnswer !== null ? selectedAnswer : "Timed Out";
    const questionRecord = {
      question: `${currentEquation.num1} ${currentEquation.operator} ${currentEquation.num2}`,
      correctAnswer: currentEquation.correctAnswer,
      userAnswer,
      isCorrect,
    };
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setGameHistory((prevHistory) => [...prevHistory, questionRecord]);
    setCurrentEquation(generateUniqueEquation());
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1000);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="game-container">
        {gameHistory.length < 10 ? (
          <>
            <div className="timer">
              Time Left: {Math.ceil(timer / 1000)} seconds
            </div>
            <div className="game-row">
              <input
                className="game-field"
                type="text"
                value={currentEquation.num1}
                readOnly
              />
              <input
                className="game-field"
                type="text"
                value={currentEquation.operator}
                readOnly
              />
              <input
                className="game-field"
                type="text"
                value={currentEquation.num2}
                readOnly
              />
            </div>
            <div>
              {answers.map((answer, index) => (
                <button
                  key={index}
                  className="answer-button"
                  onClick={() => handleAnswerClick(answer)}
                >
                  {answer}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="game-history">
            <h2 className="game-history-title">Game History Score is : {score}/10</h2>
            <ul className="game-history-list">
              {gameHistory.map((record, index) => (
                <li key={index} className="game-history-item">
                  Question: {record.question} | Correct Answer: {record.correctAnswer} | Your Answer: {record.userAnswer} | {record.isCorrect ? "Correct" : "Incorrect"}
                </li>
              ))}
            </ul>
            <div className="button-container">
              <button className="primary-button" onClick={onStartGameClickHandler}>Home Page</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default GameComponent;

import React, { useState } from "react";

import Progress from "./components/Progress";
import Quesiton from "./components/Question";
import "./App.css";
import Answers from "./components/Answers";
import {questions} from "./questions/questions"

function App() {
  const [currentQuesiton, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState("");

  const question = questions[currentQuesiton];
  const handleClick = (e) => {
    setCurrentAnswer(e.target.value);
    setError("");
  };

  const renderError = () => {
    if (!error) {
      return;
    }

    return <div className="error">{error}</div>;
  };

  const renderResultMark = (question, answer) => {
    if (question.correct_answer === answer.answer) {
      return <span className="correct">Correct</span>;
    }

    return <span className="failed">Failed</span>;
  };

  const renderResultsData = () => {
    return answers.map((answer) => {
      const question = questions.find(
        (question) => question.id === answer.questionId
      );

      return (
        <div key={question.id}>
          {question.question} - {renderResultMark(question, answer)}
        </div>
      );
    });
  };

  const restart = () => {
    setAnswers([]);
    setCurrentAnswer("");
    setCurrentQuestion(0);
    setShowResults(false);
  };
  const next = () => {
    const answer = { questionId: question.id, answer: currentAnswer };
    answers.push(answer);
    setAnswers(answers);
    setCurrentAnswer("");

    if (!currentAnswer) {
      setError("Please select an option");
      return;
    }

    if (currentQuesiton + 1 < questions.length) {
      setCurrentQuestion(currentQuesiton + 1);
      return;
    }

    setShowResults(true);
  };

  if (showResults) {
    return (
      <div className="container results">
        <h2>Results</h2>
        <ul>{renderResultsData()}</ul>
        <button className="btn btn-primary" onClick={restart}>
          Restart
        </button>
      </div>
    );
  } else {
    return (
      <div className="container">
        <Progress total={questions.length} current={currentQuesiton + 1} />
        <Quesiton question={question.question} />
        {renderError()}
        <Answers
          question={question}
          currentAnswer={currentAnswer}
          handleClick={handleClick}
        />
        <button className="btn btn-primary" onClick={next}>
          Confirm and Continue
        </button>
      </div>
    );
  }
}

export default App;

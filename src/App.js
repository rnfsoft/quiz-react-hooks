import React, { useReducer } from "react";

import Progress from "./components/Progress";
import Quesiton from "./components/Question";
import "./App.css";
import Answers from "./components/Answers";
import {questions} from "./questions/questions"

const SET_CURRENT_ANSWER = 'SET_CURRENT_ANSWER';
const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION';
const SET_ERROR = 'SET_ERROR';
const SET_SHOW_RESULTS = 'SET_SHOW_RESULTS';
const SET_ANSWERS = 'SET_ANSWERS';
const RESET_QUIZ = 'RESET_QUIZ';

function quizReducer(state, action){
  switch(action.type){
    case SET_CURRENT_ANSWER:
      return{
        ...state,
        currentAnswer: action.currentAnswer,
      };
    case SET_CURRENT_QUESTION:
      return{
        ...state,
        currentQuestion: action.currentQuestion,
      };
    case SET_ERROR:
      return{
        ...state,
        error: action.error,
      };

    case SET_SHOW_RESULTS:
      return{
        ...state,
        showResults: action.showResults,
      };

    case SET_ANSWERS:
      return{
        ...state,
        answers: action.answers,
      };

    case RESET_QUIZ:
      return{
        ...state,
        answers:[],
        currentQuestion:0,
        currentAnswer: '',
        showResults: false,
        error:''
      }
    default:
      return state;
  }
}


function App() {
  // const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [currentAnswer, setcurrentAnswer] = useState("");
  // const [answers, setAnswers] = useState([]);
  // const [showResults, setShowResults] = useState(false);
  // const [error, setError] = useState("");

  const initialState ={
    currentQuestion: 0,
    currentAnswer: '',
    answers: [],
    showResults: false,
    error: '',
  }

  const [state, dispatch] = useReducer(quizReducer, initialState);
  const {currentQuestion, currentAnswer, answers, showResults, error} = state;

  const question = questions[currentQuestion];
  const handleClick = (e) => {
    dispatch({type: SET_CURRENT_ANSWER, currentAnswer: e.target.value});
    dispatch({type: SET_ERROR, currentAnswer: ''});

    // setcurrentAnswer(e.target.value);
    // setError("");
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
    dispatch({type:RESET_QUIZ});
    // setAnswers([]);
    // setcurrentAnswer("");
    // setCurrentQuestion(0);
    // setShowResults(false);
  };
  const next = () => {
    const answer = { questionId: question.id, answer: currentAnswer };
    if (!currentAnswer) {
      dispatch({type: SET_ERROR, error: 'Please select an option'});
      // setError("Please select an option");
      return;
    }

    answers.push(answer);
    dispatch({type: SET_ANSWERS, answers: answers});
    dispatch({type: SET_CURRENT_ANSWER, currentAnswer: ''});

    // setAnswers(answers);
    // setcurrentAnswer("");



    if (currentQuestion + 1 < questions.length) {
      dispatch({type: SET_CURRENT_QUESTION, currentQuestion: currentQuestion+1});
      // setCurrentQuestion(currentQuestion + 1);
      return;
    }
    dispatch({type: SET_SHOW_RESULTS, showResults:true});
    // setShowResults(true);
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
        <Progress total={questions.length} current={currentQuestion + 1} />
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

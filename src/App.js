import { useEffect, useState } from "react";
import styled from "styled-components";

import "./App.css";
import Feedback from "./components/feedback";
import GameOver from "./components/gameover";

import PageCenter from "./components/page-center";
import Question from "./components/question";
import Summary from "./components/summary";

import { getPointsFromDifficulty } from "./util";

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FancyButton = styled.button`
  border-radius: 8px;
  margin: 0 16px 0 16px;
  width: 64px;
  font-size: 64px;
  background: none;
  border: none;
  white-space: normal;
  word-wrap: break-word;
  font-weight: bold;

  &:hover {
    border: 2px;

    background-color: darkgrey;
    cursor: pointer;
  }
`;

function App() {
  // redux is overkill for this but
  // most of this states should be in redux
  const [points, setPoints] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      //This network call should be in an action

      const response = await fetch("https://opentdb.com/api.php?amount=5");
      const questions = await response.json();

      //this logic should be in a reducer
      const enrichedResults = questions.results.map((answer) => {
        //pseudo randomize the list of answers
        answer.allAnswers = [
          answer.correct_answer,
          ...answer.incorrect_answers,
        ].sort(() => (Math.random() > 0.5 ? 1 : -1));
        answer.points = getPointsFromDifficulty(answer.difficulty);
        return answer;
      });

      setQuestions(enrichedResults);
      setIsLoaded(true);
    }
    fetchData();
  }, []);

  if (!isLoaded) {
    return <PageCenter>LOADING...</PageCenter>;
  }

  // react-router is overkill for this scenario
  // but this should be a route
  if (isGameOver) {
    return <GameOver points={points}></GameOver>;
  }

  const activeQuestion = questions[activeQuestionIndex];

  const { allAnswers, category, correct_answer, difficulty, question } =
    activeQuestion;

  const activeAnswer = answers[activeQuestionIndex];
  const isAnswerCorrect = activeAnswer === correct_answer;

  return (
    //usually I organize the app in a hierarchical structure and I do not put all the component in App.js
    //but for this scenario i think it's ok
    <div className="App">
      <Summary points={points} numberOfAnswers={answers.length}></Summary>
      <FlexWrapper>
        <FancyButton
          aria-label="previous question"
          disabled={activeQuestionIndex === 0}
          onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
        >
          {"<"}
        </FancyButton>
        <Question
          selectedAnswer={activeAnswer}
          answers={allAnswers}
          category={category}
          difficulty={difficulty}
          onAnswer={(a) => {
            setAnswers([...answers, a]);
            if (a === correct_answer) {
              setPoints(points + activeQuestion.points);
            }
          }}
          readOnly={answers.length > activeQuestionIndex}
          text={question}
        />

        {activeQuestionIndex !== questions.length - 1 ? (
          <FancyButton
            aria-label="next question"
            disabled={answers.length <= activeQuestionIndex}
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            {">"}
          </FancyButton>
        ) : (
          <FancyButton
            disabled={answers.length <= activeQuestionIndex}
            onClick={() => setIsGameOver(true)}
          >
            END
          </FancyButton>
        )}
      </FlexWrapper>
      {activeAnswer && <Feedback correct={isAnswerCorrect}></Feedback>}
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import "./App.css";
import Feedback from "./components/feedback";
import GameOver from "./components/gameover";

import PageCenter from "./components/page-center";
import Question from "./components/question";
import Summary from "./components/summary";
import { fetchTrivia } from "./feature/trivia/triviaSlice";
import {
  incrementPointsByAmount,
  setActiveQuestionIndex,
  setAnswers,
} from "./feature/game/gameSlice";

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
  const dispatch = useDispatch();
  const { loading, questions } = useSelector((state) => state.trivia);
  const { points, activeQuestionIndex, answers } = useSelector(
    (state) => state.game
  );

  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    dispatch(fetchTrivia());
  }, [dispatch]);

  if (loading) {
    return (
      <PageCenter>
        <p data-testid="loadingTriviaId">LOADING...</p>
      </PageCenter>
    );
  }

  // react-router is overkill for this scenario
  // but this should be a route
  if (isGameOver) {
    return <GameOver />;
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
          onClick={() =>
            dispatch(setActiveQuestionIndex(activeQuestionIndex - 1))
          }
        >
          {"<"}
        </FancyButton>
        <Question
          selectedAnswer={activeAnswer}
          answers={allAnswers}
          category={category}
          difficulty={difficulty}
          onAnswer={(a) => {
            dispatch(setAnswers([...answers, a]));
            if (a === correct_answer) {
              dispatch(incrementPointsByAmount(activeQuestion.points));
            }
          }}
          readOnly={answers.length > activeQuestionIndex}
          text={question}
        />

        {activeQuestionIndex !== questions.length - 1 ? (
          <FancyButton
            aria-label="next question"
            disabled={answers.length <= activeQuestionIndex}
            onClick={() =>
              dispatch(setActiveQuestionIndex(activeQuestionIndex + 1))
            }
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

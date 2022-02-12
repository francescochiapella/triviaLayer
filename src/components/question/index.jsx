import DOMPurify from "dompurify";

import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  margin: 16px;
  text-align: center;
  font-size: 32px;
`;

const QuestionInfoText = styled.p`
  font-size: 20px;
`;

const Question = ({
  answers,
  category,
  difficulty,
  onAnswer,
  selectedAnswer,
  text,
  readOnly,
}) => {
  return (
    <Wrapper>
      <QuestionInfoText>
        Category: <b>{category}</b> <br></br> Difficulty : <b>{difficulty}</b>
      </QuestionInfoText>
      {/* I hate use dangerouslySetInnerHTML due to XSS vulnerability, but its the fastest way to avoid html entities character, the XSS issue should be neutralized by DOMPurify*/}
      <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}></p>
      {answers.map((answer) => (
        <div key={answer}>
          <input
            checked={selectedAnswer === answer}
            disabled={readOnly}
            type="radio"
            name="triviaAnswers"
            id={answer}
            value={answer}
            onChange={(e) => onAnswer(e.target.value)}
          ></input>
          <label
            htmlFor={answer}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(answer) }}
          ></label>
        </div>
      ))}
    </Wrapper>
  );
};

Question.propTypes = {
  answers: PropTypes.array,
  category: PropTypes.string,
  difficulty: PropTypes.string,
  onAnswer: PropTypes.func,
  selectedAnswer: PropTypes.string,
  text: PropTypes.string,
  readOnly: PropTypes.bool,
};

export default Question;

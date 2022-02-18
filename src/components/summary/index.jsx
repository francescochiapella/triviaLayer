import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  margin: 16px;
  text-align: center;
  font-size: 16px;
`;

const Summary = ({ points, numberOfAnswers }) => {
  return (
    <Wrapper>
      <p>
        Your score is: <b>{points} points</b>
      </p>
      <p>
        You answered:&nbsp;
        <b>
          {numberOfAnswers} question
          {numberOfAnswers > 1 ? "s" : ""}
        </b>
      </p>
    </Wrapper>
  );
};

Summary.propTypes = {
  numberOfAnswers: PropTypes.number,
  points: PropTypes.number,
};

export default Summary;

import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 16px;
  text-align: center;
`;

const Correct = styled.p`
  font-weight: 700;
  font-size: 64px;
`;
const Wrong = styled.p`
  font-weight: 700;
  font-size: 64px;
`;

const Feedback = ({ correct }) => (
  <Wrapper>
    {correct ? (
      <Correct>You are Correct!!!</Correct>
    ) : (
      <Wrong>You are Wrong!!!</Wrong>
    )}
  </Wrapper>
);

Feedback.propTypes = {
  correct: PropTypes.bool,
};

export default Feedback;

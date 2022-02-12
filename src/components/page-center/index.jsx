import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  position: absolute;
  width: 600px;
  height: 800px;
  top: 50%;
  left: 50%;
  margin: -400px 0 0 -300px;
  text-align: center;
  font-size: 64px;
`;

const PageCenter = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

PageCenter.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PageCenter;

import styled from "styled-components";
import PropTypes from "prop-types";
import moment from "moment";

const PlayerInfo = styled.p`
  font-size: 24px;
`;

const TopPlayer = ({ date, point, position, user }) => (
  <PlayerInfo>
    {position}) <b>{user}</b> with <b>{point ? point : 0}</b> points on{" "}
    <b>{moment(date, "DD/MM/YYYY, hh:mm:ss").format("DD/MM/YYYY")}</b>
  </PlayerInfo>
);

TopPlayer.propTypes = {
  date: PropTypes.string,
  points: PropTypes.string,
  position: PropTypes.number,
  user: PropTypes.string,
};

export default TopPlayer;

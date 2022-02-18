import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import { fetchTopPlayers } from "../../feature/leader-board/leadersSlice";

import { sendScore } from "../../util";
import PageCenter from "../page-center";
import TopPlayer from "../top-player";

const FancyButton = styled.button`
  border-radius: 8px;

  width: 290px;
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

const FancyInput = styled.input`
  border-radius: 8px;
  font-size: 50px;
`;

const GameOver = () => {
  const dispatch = useDispatch();
  const { points } = useSelector((state) => state.game);
  const { topPlayers } = useSelector((state) => state.leaders);

  const [isSendName, setIsSendName] = useState(false);
  const [isleaderboard, setIseaderboard] = useState(false);

  const [name, setName] = useState("");
  useEffect(() => {
    async function fetchData() {
      if (isleaderboard) {
        dispatch(fetchTopPlayers());
      }
    }
    fetchData();
  }, [dispatch, isleaderboard]);

  if (isleaderboard) {
    return (
      <PageCenter>
        <>
          <p>LEADERBOARD</p>
          {topPlayers.map((p, i) => (
            <TopPlayer key={p.user} position={i + 1} {...p}></TopPlayer>
          ))}
        </>
      </PageCenter>
    );
  }
  if (isSendName) {
    return (
      <PageCenter>
        <>
          <p>Insert your Name</p>
          <FancyInput
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></FancyInput>
          <p></p>
          <FancyButton
            disabled={name === ""}
            onClick={async () => {
              await sendScore(name, points);
              setIseaderboard(true);
            }}
          >
            SEND!
          </FancyButton>
        </>
      </PageCenter>
    );
  }

  return (
    <PageCenter>
      <>
        {" "}
        <p> GAME OVER!</p>
        <p>
          Your final score is <b>{points}</b>
        </p>
        <p>Would you like to save your score? </p>
        <FancyButton onClick={() => setIsSendName(true)}>YES!</FancyButton>
        <FancyButton onClick={() => window.location.reload()}>
          No ;(
        </FancyButton>
      </>
    </PageCenter>
  );
};

GameOver.propTypes = {
  points: PropTypes.string,
};

export default GameOver;

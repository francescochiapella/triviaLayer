import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { getTopPlayers, sendScore } from "../../util";
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

const GameOver = ({ points }) => {
  const [isSendName, setIsSendName] = useState(false);
  const [isleaderboard, setIseaderboard] = useState(false);
  const [topPlayers, setTopPlayers] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (isleaderboard) {
        const response = await fetch(
          "https://sheet.best/api/sheets/96d2364e-c1f5-47b3-bc43-0e476fbcf0a2"
        );
        const scores = await response.json();
        // const scores = [
        //   { user: "Frappa", point: "1", date: "12/2/2022, 22:11:22" },
        //   { user: "Frappa", point: "4", date: "12/2/2022, 22:12:01" },
        //   { user: "Frappa1", point: "2", date: "12/2/2022, 22:11:22" },
        //   { user: "Frappa2", point: "2", date: "12/2/2022, 22:12:01" },
        //   { user: "Frappa3", point: "1", date: "12/2/2022, 22:11:22" },
        //   { user: "Frappa3", point: "2", date: "12/2/2022, 22:12:01" },
        //   { user: "Frappa2", point: "10", date: "12/2/2022, 22:12:01" },
        //   { user: "Frappa1", point: "2", date: "12/2/2022, 22:11:22" },
        //   { user: "Frappa", point: "11", date: "12/2/2022, 22:12:01" },
        //   { user: "chiara", point: "", date: "12/2/2022, 22:12:01" },
        //   { user: "chiara1", point: "", date: "12/2/2022, 22:12:01" },
        //   { user: "chiara2", point: "", date: "12/2/2022, 22:12:01" },
        //   { user: "chiara3", point: "", date: "12/2/2022, 22:12:01" },
        //   { user: "chiara4", point: "", date: "12/2/2022, 22:12:01" },
        //   { user: "chiara5", point: "", date: "12/2/2022, 22:12:01" },
        //   { user: "chiara6", point: "", date: "12/2/2022, 22:12:01" },
        //   { user: "chiara7", point: "", date: "12/2/2022, 22:12:01" },
        //   { user: "chiara8", point: "", date: "12/2/2022, 22:12:01" },
        // ];

        const result = getTopPlayers(scores, 10);
        setTopPlayers(result);
      }
    }
    fetchData();
  }, [isleaderboard]);

  if (isleaderboard) {
    return (
      <PageCenter>
        <p>LEADERBOARD</p>
        {topPlayers.map((p, i) => (
          <TopPlayer position={i + 1} {...p}></TopPlayer>
        ))}
      </PageCenter>
    );
  }
  if (isSendName) {
    return (
      <PageCenter>
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
      </PageCenter>
    );
  }

  return (
    <PageCenter>
      {" "}
      <p> GAME OVER!</p>
      <p>
        Your final score is <b>{points}</b>
      </p>
      <p>Would you like to save your score? </p>
      <FancyButton onClick={() => setIsSendName(true)}>YES!</FancyButton>
      <FancyButton onClick={() => window.location.reload()}>No ;(</FancyButton>
    </PageCenter>
  );
};

GameOver.propTypes = {
  points: PropTypes.string,
};

export default GameOver;

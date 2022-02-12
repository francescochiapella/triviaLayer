export const getPointsFromDifficulty = (difficulty) => {
  switch (difficulty) {
    case "easy":
      return 1;
    case "medium":
      return 2;
    case "hard":
      return 3;
    default:
      return 1;
  }
};

export const sendScore = async (user, point) => {
  await fetch(
    "https://sheet.best/api/sheets/96d2364e-c1f5-47b3-bc43-0e476fbcf0a2",
    // "www.google.it",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        point: +point,
        date: new Date(Date.now()).toLocaleString(),
      }),
    }
  );
};

//this function should be unitTested
export const getTopPlayers = (scores, numberOfPlayer) => {
  //get the max score for each uniq user
  let result = Object.values(
    scores.reduce((scores, value) => {
      scores[value.user] =
        scores[value.user] && +scores[value.user].point > +value.point
          ? scores[value.user]
          : value;

      return scores;
    }, {})
  );

  result = result.sort((s1, s2) => +s2.point - +s1.point);

  return result.slice(0, numberOfPlayer);
};

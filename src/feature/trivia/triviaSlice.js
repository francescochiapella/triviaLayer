import { createSlice } from "@reduxjs/toolkit";
import { getPointsFromDifficulty } from "../../util";

const initialState = {
  loading: true,
  questions: [],
};

export const triviaSlice = createSlice({
  name: "trivia",
  initialState,
  reducers: {
    triviaLoading: (state) => {
      state.loading = true;
    },
    triviaReceived: (state, action) => {
      const enrichedResults = action.payload.results.map((answer) => {
        //pseudo randomize the list of answers
        answer.allAnswers = [
          answer.correct_answer,
          ...answer.incorrect_answers,
        ].sort(() => (Math.random() > 0.5 ? 1 : -1));
        answer.points = getPointsFromDifficulty(answer.difficulty);
        return answer;
      });

      state.loading = false;
      state.questions = enrichedResults;
    },
  },
});

export const { triviaLoading, triviaReceived } = triviaSlice.actions;

export const fetchTrivia = () => async (dispatch) => {
  dispatch(triviaLoading());
  const response = await fetch("https://opentdb.com/api.php?amount=10");

  dispatch(triviaReceived(await response.json()));
};

export default triviaSlice.reducer;

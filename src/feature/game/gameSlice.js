import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  points: 0,
  answers: [],
  activeQuestionIndex: 0,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    incrementPointsByAmount: (state, action) => {
      state.points = state.points + action.payload;
    },
    setActiveQuestionIndex: (state, action) => {
      state.activeQuestionIndex = action.payload;
    },
    setAnswers: (state, action) => {
      state.answers = action.payload;
    },
  },
});

export const { incrementPointsByAmount, setActiveQuestionIndex, setAnswers } =
  gameSlice.actions;

export default gameSlice.reducer;

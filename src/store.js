import { configureStore } from "@reduxjs/toolkit";
import triviaReducer from "./feature/trivia/triviaSlice";
import gameReducer from "./feature/game/gameSlice";
import leadersReducer from "./feature/leader-board/leadersSlice";

export const store = configureStore({
  reducer: {
    trivia: triviaReducer,
    game: gameReducer,
    leaders: leadersReducer,
  },
});

import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import triviaReducer from "../feature/trivia/triviaSlice";
import gameReducer from "../feature/game/gameSlice";
import leadersReducer from "../feature/leader-board/leadersSlice";

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        trivia: triviaReducer,
        game: gameReducer,
        leaders: leadersReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render };

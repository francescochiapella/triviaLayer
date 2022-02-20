import { createSlice } from "@reduxjs/toolkit";
import { getTopPlayers } from "../../util";

const initialState = {
  loading: true,
  topPlayers: [],
};

export const leadersBoardSlice = createSlice({
  name: "leadersBoard",
  initialState,
  reducers: {
    topPlayersLoading: (state) => {
      state.loading = true;
    },
    topPlayersReceived: (state, action) => {
      state.loading = false;
      state.topPlayers = getTopPlayers(action.payload, 10);
    },
  },
});

export const { topPlayersReceived, topPlayersLoading } =
  leadersBoardSlice.actions;

export const fetchTopPlayers = () => async (dispatch) => {
  dispatch(topPlayersLoading());
  const response = await fetch(
    "https://sheet.best/api/sheets/96d2364e-c1f5-47b3-bc43-0e476fbcf0a2"
  );

  dispatch(topPlayersReceived(await response.json()));
};

export default leadersBoardSlice.reducer;

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
  const response = await fetch(
    "https://sheet.best/api/sheets/96d2364e-c1f5-47b3-bc43-0e476fbcf0a2"
  );
  dispatch(topPlayersReceived(await response.json()));
};

export default leadersBoardSlice.reducer;

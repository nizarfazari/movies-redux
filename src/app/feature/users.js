import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { API_TMDB_URL, BASE_URL } from "../../utils/API/api";

const initialState = {
  login: [],
  registers: [],
  dataMe: [],
  loading: false,
};

export const getUserMe = createAsyncThunk("users/getUserMe", async () => {
  let config = {
    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` },
  };
  const res = await axios.get("https://notflixtv.herokuapp.com/api/v1/users/me", config);
  return res.data.data;
});

export const loginUser = createAsyncThunk("users/loginUser", async (payload) => {
  const res = await axios.post("https://notflixtv.herokuapp.com/api/v1/users/login", payload);
  return res.data.data.token;
});

export const regUser = createAsyncThunk("users/regUser", async (payload) => {
  const res = await axios.post("https://notflixtv.herokuapp.com/api/v1/users", payload);
  return res.data.data.token;
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [getUserMe.pending]: (state) => {
      state.loading = true;
    },
    [getUserMe.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.dataMe = payload;
    },
    [getUserMe.rejected]: (state) => {
      state.loading = false;
    },
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.login = payload;
    },
    [loginUser.rejected]: (state) => {
      state.loading = false;
    },
    [regUser.pending]: (state) => {
      state.loading = true;
    },
    [regUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.registers = payload;
    },
    [regUser.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default usersSlice.reducer;

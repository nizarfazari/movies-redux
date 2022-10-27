import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { API_TMDB_URL, BASE_URL } from "../../utils/API/api";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
const initialState = {
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
  try {
    const res = await axios.post("https://notflixtv.herokuapp.com/api/v1/users/login", payload);
    localStorage.setItem("token", JSON.stringify(res.data.data.token));
    Swal.fire({
      position: "mid",
      icon: "success",
      title: "Login success",
      showConfirmButton: false,
      timer: 1000,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.message,
    });
  }
});

export const loginGoogle = createAsyncThunk("users/loginGoogle", async (response) => {
  try {
    let decoded = jwt_decode(response.credential);
    localStorage.setItem("token", response.credential);
    localStorage.setItem("profile", JSON.stringify({ imageUrl: decoded.picture, givenName: decoded.given_name, familyName: decoded.family_name }));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Login success",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error.response.data.message}`,
    });
  }
});

export const regUser = createAsyncThunk("users/regUser", async (payload) => {
  try {
    const res = await axios.post("https://notflixtv.herokuapp.com/api/v1/users", payload);
    localStorage.setItem("token", JSON.stringify(res.data.data.token));
    Swal.fire({
      position: "mid",
      icon: "success",
      title: "Register Success",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error.response.data.message}`,
    });
  }
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

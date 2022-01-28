import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { loginState } from "./loginState";

const apiUrl = "http://localhost:8000";
const token = localStorage.localJWT;

/**
 * 1. initialStateを作成 or import
 */
const initialState = loginState;

/**
 * ex1). 非同期処理を作る or importする
 */
export const fetchAsyncLogin = createAsyncThunk("login/post", async (auth) => {
  const response = await axios.post(`${apiUrl}/authen/jwt/create`, auth, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
});

export const fetchAsyncRegister = createAsyncThunk(
  "login/register",
  async (auth) => {
    const response = await axios.post(`${apiUrl}/api/register`, auth, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
);

export const fetchAsyncProfile = createAsyncThunk("login/get", async () => {
  const response = await axios.get(`${apiUrl}/myself`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  return response.data;
});

/**
 * 2. sliceを作る
 */
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    editUsername: (state, action) => (state.authen.username = action.payload),
    editPassword: (state, action) => (state.authen.password = action.payload),
    toggleMode: (state, _action) => (state.isLoginView = !state.isLoginView),
  },

  /**
   * ex2). 非同期処理の結果であるPromiseの状態に応じて処理する
   */
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      localStorage.setItem("localJWT", action.payload.access);
      action.payload.access && (window.location.href = "/tasks");
    });

    builder.addCase(fetchAsyncProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

/**
 * 3. useDispatchで使えるようにする
 * (=コンポーネントからactionをdispatchできるようにする)
 */
export const { editUsername, editPassword, toggleMode } = loginSlice.actions;

/**
 * 4. useSelectorで使えるようにする
 * (=コンポーネントからstoreのstateを参照できるようにする)
 * @param state
 */
export const selectAuthen = (state) => state.login.authen;
export const selectIsLoginView = (state) => state.login.isLoginView;
export const selectProfile = (state) => state.login.profile;

/**
 * 5. sliceをexportする
 */
export default loginSlice.reducer;

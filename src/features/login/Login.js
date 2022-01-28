import React from "react";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncLogin,
  fetchAsyncRegister,
  fetchAsyncProfile,
  editUsername,
  editPassword,
  toggleMode,
  selectAuthen,
  selectIsLoginView,
  selectProfile,
} from "./loginSlice";
import styles from "./Login.module.css";

const Login = () => {
  const a = "gsgs";
  const b = "gdg";
  const btnDisabler = a === "" || b === "";
  console.log({ btnDisabler });
  return (
    <div>
      ここから先は暇な時に自分でログイン有りのTODOアプリを作ってみる方が勉強になるので一旦中止
    </div>
  );
};

export default Login;

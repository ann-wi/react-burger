import React from "react";
import { AppHeader } from "../components/AppHeader/AppHeader";

import loginStyles from "./login-styles.module.css";

export const LoginPage = () => {
  return (
    <>
      <AppHeader />
      <div className={loginStyles.loginContainer}>
        <form action="" className={loginStyles.loginForm}>
          <label>
            E-mail
            <input type="email" />
          </label>
          <label>
            Пароль
            <input type="password" />
          </label>
          <button type="submit">O</button>
        </form>
      </div>
    </>
  );
};

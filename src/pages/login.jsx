import React from "react";

import loginStyles from "./login-styles.module.css";

export const LoginPage = () => {
  return (
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
  );
};

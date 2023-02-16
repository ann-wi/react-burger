import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { registerUserApi } from "../services/actions/server-actions";
import { registerUser } from "../services/actions/registerUser";

import registerStyles from "./register-styles.module.css";

export const RegistrationPage = () => {
  const dispatch = useDispatch();
  const newUser = useSelector((state) => state.reactBurgerReducer.regFormInfo);

  const onChange = (e) => {
    dispatch(registerUser({ [e.target.name]: e.target.value }));
  };

  const submitReg = (e) => {
    e.prevenDefault();

    dispatch(registerUser(newUser));
    dispatch(registerUserApi(newUser));
  };

  return (
    <div className={registerStyles.registerContainer}>
      <h2>Регистрация</h2>
      <form action="" className={registerStyles.registerForm}>
        <input
          className={registerStyles.registerInput}
          type="text"
          name="name"
          value={newUser.name}
          onChange={onChange}
          placeholder="Имя"
        />
        <input
          className={`${registerStyles.registerInput} mt-6 text text_type_main-default`}
          type="email"
          name="email"
          value={newUser.email}
          onChange={onChange}
          placeholder="E-mail"
        />
        <input
          className={`${registerStyles.registerInput} mt-6 text text_type_main-default`}
          type="password"
          name="password"
          value={newUser.password}
          onChange={onChange}
          placeholder="Пароль"
        />
        <button
          className={`${registerStyles.button} mt-6 text text_type_main-default`}
          onClick={submitReg}
        >
          <p className={registerStyles.buttonText}>Зарегистрироваться</p>
        </button>
      </form>
    </div>
  );
};

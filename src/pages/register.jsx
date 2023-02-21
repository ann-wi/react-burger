import React from "react";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
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
      <h1 className="text text_type_main-medium">Регистрация</h1>
      <form action="" className={registerStyles.registerForm}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={onChange}
          value="Mia"
          name="name"
          size={"default"}
          extraClass="mt-6 mb-6"
        />
        <EmailInput
          onChange={onChange}
          value="@email"
          name={"email"}
          placeholder="E-mail"
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={onChange}
          value="pass"
          name={"password"}
          extraClass="mb-6"
        />
        <Button type="primary" size="medium" extraClass="mb-20">
          <p
            className={`${registerStyles.buttonText} text text_type_main-default`}
          >
            Зарегистрироваться
          </p>
        </Button>
      </form>
      <div className={registerStyles.buttonsContainer}>
        <p
          className={`${registerStyles.buttonText} text text_type_main-default`}
        >
          Уже зарегистрированы?
        </p>
        <Button htmlType="button" type="secondary" size="medium">
          Войти
        </Button>
      </div>
    </div>
  );
};

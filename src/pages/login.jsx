import {
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../services/actions/user/loginUser";
import { authUser } from "../services/actions/user/server-actions-user";
import { getCookie } from "../utils/cookiesFunction";

import loginStyles from "./login-styles.module.css";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const isAuthorized = getCookie("accessToken");

  const navigate = useNavigate();
  const navToReg = () => {
    navigate("/register");
  };

  const navToForgotPass = () => {
    navigate("/forgot-password");
  };

  const handleChange = (e) => {
    dispatch(loginUser(e.target.name, e.target.value));
  };

  const submitLogin = (e) => {
    e.preventDefault();
    console.log("clicked!!!", e, user);
    dispatch(authUser(user));

    if (isAuthorized) {
      navigate("/profile");
    }
  };

  return (
    <div className={loginStyles.loginContainer}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <form className={loginStyles.loginForm} onSubmit={submitLogin}>
        <EmailInput
          onChange={handleChange}
          value={user.email}
          name="email"
          placeholder="E-mail"
          isIcon={false}
          extraClass="mt-6 mb-6"
        />
        <PasswordInput
          onChange={handleChange}
          value={user.password}
          name="password"
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          <p className={`text text_type_main-default`}>Войти</p>
        </Button>
      </form>
      <div className={loginStyles.buttonsContainer}>
        <p className={`${loginStyles.buttonText} text text_type_main-default`}>
          Вы — новый пользователь?
        </p>
        <Button
          onClick={navToReg}
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass="pl-2 pr-2 pt-2 pb-2"
        >
          Зарегистрироваться
        </Button>
      </div>
      <div className={loginStyles.buttonsContainer}>
        <p className={`${loginStyles.buttonText} text text_type_main-default`}>
          Забыли пароль?
        </p>
        <Button
          onClick={navToForgotPass}
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass="pl-2 pr-2 pt-2 pb-2"
        >
          Восстановить пароль
        </Button>
      </div>
    </div>
  );
};

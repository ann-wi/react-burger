import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { forgotPassword } from "../services/actions/user/forgotPassword";
import { forgotPasswordSendEmail } from "../services/actions/user/server-actions-user";

import forgotPasswordStyles from "./forgot-password-styles.module.css";

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(
    (state) => state.userReducer.userIsAuthorized
  );
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const navToLog = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    dispatch(forgotPassword(email));
  };

  const submitEmail = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordSendEmail(email));
    navigate("/reset-password");
  };

  if (isAuthorized) return <Navigate to={"/"} replace />;

  return (
    <div className={forgotPasswordStyles.passwordContainer}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <form
        className={forgotPasswordStyles.passwordForm}
        onSubmit={submitEmail}
      >
        <EmailInput
          onChange={handleChange}
          value={email}
          name={"email"}
          placeholder="Укажите e-mail"
          isIcon={false}
          extraClass="mt-6 mb-6"
        />
        <Button
          type="primary"
          size="medium"
          extraClass="mb-20"
          htmlType="submit"
        >
          <p className={`text text_type_main-default`}>Восстановить</p>
        </Button>
      </form>
      <div className={forgotPasswordStyles.buttonsContainer}>
        <p
          className={`${forgotPasswordStyles.buttonText} text text_type_main-default`}
        >
          Вспомнили пароль?
        </p>
        <Button
          onClick={navToLog}
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass="pl-2 pr-2"
        >
          Войти
        </Button>
      </div>
    </div>
  );
};

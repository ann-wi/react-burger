import {
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { authUser } from "../services/actions/server-actions-user";
import { useForm } from "../hooks/useForm";

import loginStyles from "./login-styles.module.css";
import { FC } from "react";
import { useDispatch, useSelector } from "../utils/storeTypes";

export const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(
    (state) => state.userReducer.userIsAuthorized
  );
  const navigate = useNavigate();
  const location = useLocation();

  const { formData, onChange, setFormData, onSubmit } = useForm(
    {
      email: "",
      password: "",
    },
    () => {
      dispatch(authUser(formData));
    }
  );

  const navToReg = () => {
    navigate("/register");
  };

  const navToForgotPass = () => {
    navigate("/forgot-password");
  };

  if (isAuthorized)
    return <Navigate to={`${location?.state?.from || "/"}`} replace />;

  return (
    <div className={loginStyles.loginContainer}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <form className={loginStyles.loginForm} onSubmit={onSubmit}>
        <EmailInput
          onChange={onChange}
          value={formData.email}
          name="email"
          placeholder="E-mail"
          isIcon={false}
          extraClass="mt-6 mb-6"
        />
        <PasswordInput
          onChange={onChange}
          value={formData.password}
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

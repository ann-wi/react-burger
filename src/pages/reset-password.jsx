import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../services/actions/user/resetPassword";
import { resetUserPassword } from "../services/actions/user/server-actions-user";

import resetPasswordStyles from "./reset-password-styles.module.css";

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const userIsValid = useSelector((state) => state.userReducer.userIsValid);
  const user = useSelector((state) => state.userReducer.user);
  const code = useSelector((state) => state.userReducer.code);

  const navigate = useNavigate();

  const navToLogin = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    dispatch(resetPassword(e.target.name, e.target.value));
  };

  const submitResetPass = (e) => {
    e.preventDefault();
    dispatch(resetUserPassword(user.password, code));

    navigate("/login");
  };

  return (
    <div className={resetPasswordStyles.passwordContainer}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <form
        className={resetPasswordStyles.passwordForm}
        onSubmit={submitResetPass}
      >
        <PasswordInput
          onChange={handleChange}
          value={user.password}
          name="password"
          extraClass="mt-6 mb-6"
          placeholder="Введите новый пароль"
        />
        <Input
          onChange={handleChange}
          value={code}
          name="code"
          placeholder="E-Введите код из письма"
          extraClass="mb-6"
        />
        <Button
          type="primary"
          size="medium"
          extraClass="mb-20"
          htmlType="submit"
        >
          <p className={` text text_type_main-default`}>Сохранить</p>
        </Button>
      </form>
      <div className={resetPasswordStyles.buttonsContainer}>
        <p
          className={`${resetPasswordStyles.buttonText} text text_type_main-default`}
        >
          Вспомнили пароль?
        </p>
        <Button
          onClick={navToLogin}
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

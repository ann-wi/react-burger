import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { resetUserPassword } from "../services/actions/server-actions-user";

import resetPasswordStyles from "./reset-password-styles.module.css";

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { formData, onChange, setFormData, onSubmit } = useForm(
    {
      password: "",
      code: "",
    },
    () => {
      navigate("/login");
      dispatch(resetUserPassword(formData));
    }
  );

  const navToLogin = () => {
    navigate("/login");
  };

  return (
    <div className={resetPasswordStyles.passwordContainer}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <form className={resetPasswordStyles.passwordForm} onSubmit={onSubmit}>
        <PasswordInput
          onChange={onChange}
          value={formData.password}
          name="password"
          extraClass="mt-6 mb-6"
          placeholder="Введите новый пароль"
        />
        <Input
          onChange={onChange}
          value={formData.code}
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

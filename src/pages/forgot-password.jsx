import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { forgotPasswordSendEmail } from "../services/actions/user/server-actions-user";
import { useForm } from "../hooks/useForm";

import forgotPasswordStyles from "./forgot-password-styles.module.css";

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthorized = useSelector(
    (state) => state.userReducer.userIsAuthorized
  );

  const { formData, onChange, setFormData, onSubmit } = useForm(
    { email: "" },
    () => {
      navigate("/reset-password");
      dispatch(forgotPasswordSendEmail(formData));
    }
  );

  const navToLog = () => {
    navigate("/login");
  };

  if (isAuthorized) return <Navigate to="/profile" />;

  return (
    <div className={forgotPasswordStyles.passwordContainer}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <form className={forgotPasswordStyles.passwordForm} onSubmit={onSubmit}>
        <EmailInput
          onChange={onChange}
          value={formData.email}
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

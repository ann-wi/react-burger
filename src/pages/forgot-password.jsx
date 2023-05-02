import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";

import forgotPasswordStyles from "./forgot-password-styles.module.css";

export const ForgotPasswordPage = () => {
  const onChange = (e) => {
    console.log("change!");
  };

  const navigate = useNavigate();
  const navToLog = () => {
    navigate("/login");
  };

  return (
    <div className={forgotPasswordStyles.passwordContainer}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <form action="" className={forgotPasswordStyles.passwordForm}>
        <EmailInput
          onChange={onChange}
          value="@email"
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

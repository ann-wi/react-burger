import {
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";

import loginStyles from "./login-styles.module.css";

export const LoginPage = () => {
  const onChange = (e) => {
    console.log("change!");
  };

  return (
    <div className={loginStyles.loginContainer}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <form action="" className={loginStyles.loginForm}>
        <EmailInput
          onChange={onChange}
          value="@email"
          name={"email"}
          placeholder="E-mail"
          isIcon={false}
          extraClass="mt-6 mb-6"
        />
        <PasswordInput
          onChange={onChange}
          value="pass"
          name={"password"}
          extraClass="mb-6"
        />
        <Button type="primary" size="medium" extraClass="mb-20">
          <p
            className={`${loginStyles.buttonText} text text_type_main-default`}
          >
            Войти
          </p>
        </Button>
      </form>
      <div className={loginStyles.buttonsContainer}>
        <p className={`${loginStyles.buttonText} text text_type_main-default`}>
          Вы — новый пользователь?
        </p>
        <Button htmlType="button" type="secondary" size="medium">
          Зарегистрироваться
        </Button>
      </div>
      <div className={loginStyles.buttonsContainer}>
        <p className={`${loginStyles.buttonText} text text_type_main-default`}>
          Забыли пароль?
        </p>
        <Button htmlType="button" type="secondary" size="medium">
          Восстановить пароль
        </Button>
      </div>
    </div>
  );
};

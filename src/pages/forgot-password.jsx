import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import forgotPasswordStyles from "./forgot-password-styles.module.css";

export const ForgotPasswordPage = () => {
  const onChange = (e) => {
    console.log("change!");
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
        <Button type="primary" size="medium" extraClass="mb-20">
          <p
            className={`${forgotPasswordStyles.buttonText} text text_type_main-default`}
          >
            Восстановить
          </p>
        </Button>
      </form>
      <div className={forgotPasswordStyles.buttonsContainer}>
        <p
          className={`${forgotPasswordStyles.buttonText} text text_type_main-default`}
        >
          Вспомнили пароль?
        </p>
        <Button htmlType="button" type="secondary" size="medium">
          Войти
        </Button>
      </div>
    </div>
  );
};

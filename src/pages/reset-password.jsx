import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import resetPasswordStyles from "./reset-password-styles.module.css";

export const ResetPasswordPage = () => {
  const onChange = (e) => {
    console.log("change!");
  };

  return (
    <div className={resetPasswordStyles.passwordContainer}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <form action="" className={resetPasswordStyles.passwordForm}>
        <PasswordInput
          onChange={onChange}
          value="pass"
          name={"password"}
          extraClass="mt-6 mb-6"
          placeholder="Введите новый пароль"
        />
        <Input
          onChange={onChange}
          value="0000"
          name={"code"}
          placeholder="E-Введите код из письма"
          isIcon={false}
          extraClass="mb-6"
        />
        <Button type="primary" size="medium" extraClass="mb-20">
          <p
            className={`${resetPasswordStyles.buttonText} text text_type_main-default`}
          >
            Сохранить
          </p>
        </Button>
      </form>
      <div className={resetPasswordStyles.buttonsContainer}>
        <p
          className={`${resetPasswordStyles.buttonText} text text_type_main-default`}
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

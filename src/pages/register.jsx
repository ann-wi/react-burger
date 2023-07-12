import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { registerNewUser } from "../services/actions/user/server-actions-user";
import { useForm } from "../hooks/useForm";

import registerStyles from "./register-styles.module.css";

export const RegistrationPage = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(
    (state) => state.userReducer.userIsAuthorized
  );

  const navigate = useNavigate();

  const { formData, onChange, setFormData, onSubmit } = useForm(
    {
      name: "",
      email: "",
      password: "",
    },
    () => {
      dispatch(registerNewUser(formData));
    }
  );

  const navToLog = () => {
    navigate("/login");
  };

  if (isAuthorized) return <Navigate to="/profile" />;

  return (
    <div className={registerStyles.registerContainer}>
      <h1 className="text text_type_main-medium">Регистрация</h1>
      <form className={registerStyles.registerForm} onSubmit={onSubmit}>
        <Input
          type="text"
          value={formData.name}
          name="name"
          placeholder="Имя"
          onChange={onChange}
          size={"default"}
          extraClass="mt-6 mb-6"
        />
        <EmailInput
          onChange={onChange}
          value={formData.email}
          name="email"
          placeholder="E-mail"
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={onChange}
          extraClass="mb-6"
          value={formData.password}
          name="password"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          <p
            className={`${registerStyles.buttonText} text text_type_main-default`}
          >
            Зарегистрироваться
          </p>
        </Button>
      </form>
      <div className={registerStyles.buttonsContainer}>
        <p className={`${registerStyles.linkText} text text_type_main-default`}>
          Уже зарегистрированы?
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

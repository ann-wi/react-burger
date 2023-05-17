import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/actions/registerUser";
import { registerNewUser } from "../services/actions/server-actions";

import registerStyles from "./register-styles.module.css";

export const RegistrationPage = () => {
  const dispatch = useDispatch();
  const newUser = useSelector((state) => state.reactBurgerReducer.user);

  const navigate = useNavigate();
  const navToLog = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    dispatch(registerUser(e.target.name, e.target.value));
  };

  const submitReg = (e) => {
    e.preventDefault();
    console.log("clicked!!!", e, newUser);
    dispatch(registerNewUser(newUser));
  };

  return (
    <div className={registerStyles.registerContainer}>
      <h1 className="text text_type_main-medium">Регистрация</h1>
      <form className={registerStyles.registerForm} onSubmit={submitReg}>
        <Input
          type="text"
          value={newUser.name}
          name="name"
          placeholder="Имя"
          onChange={handleChange}
          size={"default"}
          extraClass="mt-6 mb-6"
        />
        <EmailInput
          onChange={handleChange}
          value={newUser.email}
          name="email"
          placeholder="E-mail"
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={handleChange}
          extraClass="mb-6"
          value={newUser.password}
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

import React from "react";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../services/actions/registerUser";

import profileStyles from "./profile-styles.module.css";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const newUser = useSelector((state) => state.reactBurgerReducer.regFormInfo);

  const onChange = (e) => {
    dispatch(registerUser({ [e.target.name]: e.target.value }));
  };

  return (
    <div className={profileStyles.profile}>
      <div className={profileStyles.profilePagesLinks}>
        <Button htmlType="button" type="secondary" size="large">
          <p className="text text_type_main-medium">Профиль</p>
        </Button>
        <Button htmlType="button" type="secondary" size="large">
          <p className="text text_type_main-medium">История заказов</p>
        </Button>
        <Button htmlType="button" type="secondary" size="large">
          <p className="text text_type_main-medium">Выход</p>
        </Button>
        <p>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <form action="" className={profileStyles.registerForm}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={onChange}
          value="Mia"
          name="name"
          icon="EditIcon"
          size={"default"}
          extraClass="mt-6 mb-6"
        />
        <EmailInput
          onChange={onChange}
          value="@email"
          name={"email"}
          placeholder="E-mail"
          isIcon={true}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={onChange}
          value="pass"
          name={"password"}
          extraClass="mb-6"
          icon="EditIcon"
        />
      </form>
    </div>
  );
};

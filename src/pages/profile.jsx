import React, { useEffect } from "react";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import profileStyles from "./profile-styles.module.css";
import { ProfileNavigation } from "../components/ProfileNavigation/ProfileNavigation";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  changeUserInfo,
} from "../services/actions/user/server-actions-user";
import { changeUser } from "../services/actions/user/changeUser";
import { useForm } from "../hooks/useForm";

export const ProfilePage = () => {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  const { formData, onChange, setFormData } = useForm({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      dispatch(getUserProfile());
      setFormData({ name: user.name, email: user.email, password: "" });
    }
  }, []);

  const handleChange = (e) => {
    dispatch(changeUser(e.target.name, e.target.value));
  };

  const cancelChanges = () => {
    dispatch(getUserProfile());
  };

  const submitChange = (e) => {
    e.preventDefault();
    dispatch(changeUserInfo(user));
  };

  return (
    <div className={profileStyles.container}>
      <ProfileNavigation active={true} isActive={false} />
      <form className={profileStyles.inputList} onSubmit={submitChange}>
        <Input
          value={formData.name}
          onChange={handleChange}
          type={"text"}
          placeholder={"Имя"}
          name={"name"}
          extraClass="ml-1 mt-6"
          icon={"EditIcon"}
          error={false}
        />
        <Input
          value={formData.email}
          onChange={handleChange}
          placeholder={"Email"}
          name={"email"}
          icon={"EditIcon"}
          extraClass="mt-6"
        />
        <PasswordInput
          value={formData.password}
          name={"password"}
          onChange={handleChange}
          extraClass="ml-1 mt-6"
          icon={"EditIcon"}
        />
        <div>
          <Button
            type={"secondary"}
            size={"medium"}
            htmlType={"button"}
            onClick={cancelChanges}
            extraClass="pt-6"
          >
            Отмена
          </Button>
          <Button type={"primary"} size={"medium"} htmlType={"submit"}>
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
};

import React, { useEffect } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import profileStyles from "./profile-styles.module.css";
import { ProfileNavigation } from "../components/ProfileNavigation/ProfileNavigation";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  changeUserInfo,
} from "../services/actions/server-actions";
import { changeUser } from "../services/actions/changeUser";

export const ProfilePage = () => {
  const name = useSelector((state) => state.reactBurgerReducer.user.name);
  const email = useSelector((state) => state.reactBurgerReducer.user.email);
  const user = useSelector((state) => state.reactBurgerReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getUserProfile());
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
      <form onSubmit={submitChange}>
        <ul className={profileStyles.inputList}>
          <li className={`mt-6`}>
            <Input
              value={name}
              onChange={handleChange}
              type={"text"}
              placeholder={"Имя"}
              name={"name"}
              extraClass="ml-1"
              icon={"EditIcon"}
              error={false}
            />
          </li>
          <li className={`mt-6`}>
            <Input
              value={email}
              onChange={handleChange}
              placeholder={"Email"}
              name={"email"}
              icon={"EditIcon"}
            />
          </li>
          <li className={`mt-6`}>
            <PasswordInput
              value={user.password}
              name={"password"}
              onChange={handleChange}
              extraClass="ml-1"
              icon={"EditIcon"}
            />
          </li>
          <li className={profileStyles.li}>
            <div>
              <Button
                type={"secondary"}
                size={"medium"}
                htmlType={"button"}
                onClick={cancelChanges}
              >
                Отмена
              </Button>
              <Button type={"primary"} size={"medium"} htmlType={"submit"}>
                Сохранить
              </Button>
            </div>
          </li>
        </ul>
      </form>
    </div>
  );
};

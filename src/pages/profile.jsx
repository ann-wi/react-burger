import { useEffect, useState } from "react";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import profileStyles from "./profile-styles.module.css";
import { ProfileNavigation } from "../components/ProfileNavigation/ProfileNavigation";
import { useDispatch, useSelector } from "react-redux";
import { changeUserInfo } from "../services/actions/server-actions-user";
import { useForm } from "../hooks/useForm";

export const ProfilePage = () => {
  const userName = useSelector((state) => state.userReducer.user.name);
  const userEmail = useSelector((state) => state.userReducer.user.email);
  const [controlsDisabled, setControlsDisabled] = useState(true);
  const dispatch = useDispatch();

  const { formData, setFormData, onSubmit } = useForm(
    {
      name: "",
      email: "",
      password: "",
    },
    () => {
      dispatch(changeUserInfo(formData));
      setControlsDisabled(true);
    }
  );

  useEffect(() => {
    setFormData({ name: userName, email: userEmail, password: "" });
  }, [userName, userEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setControlsDisabled(false);
  };

  const cancelChanges = () => {
    setFormData({ name: userName, email: userEmail, password: "" });
    setControlsDisabled(true);
  };

  return (
    <div className={profileStyles.container}>
      <ProfileNavigation active={true} isActive={false} />
      <form className={profileStyles.inputList} onSubmit={onSubmit}>
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
        <EmailInput
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
          extraClass="ml-1 mt-6 mb-6"
          icon={"EditIcon"}
        />
        <div>
          {controlsDisabled ? (
            <>
              <Button
                type={"secondary"}
                size={"medium"}
                htmlType={"button"}
                onClick={cancelChanges}
                extraClass="pt-6"
                disabled={true}
              >
                Отмена
              </Button>
              <Button
                type={"primary"}
                size={"medium"}
                htmlType={"submit"}
                disabled={true}
              >
                Сохранить
              </Button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </form>
    </div>
  );
};

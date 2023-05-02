import {
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";

import profileFormStyles from "./profile-form-styles.module.css";

export const ProfileForm = () => {
  const dispatch = useDispatch();
  const newUser = useSelector((state) => state.reactBurgerReducer.regFormInfo);

  const onChange = (e) => {
    console.log("change!");
  };

  return (
    <form action="" className={profileFormStyles.registerForm}>
      <Input
        onChange={onChange}
        type="text"
        placeholder="Имя"
        value={newUser.name}
        name="name"
        icon="EditIcon"
        size={"default"}
        extraClass="mt-6 mb-6"
      />
      <EmailInput
        onChange={onChange}
        value={newUser.email}
        name={"email"}
        placeholder="E-mail"
        isIcon={true}
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={onChange}
        value={newUser.password}
        name={"password"}
        extraClass="mb-6"
        icon="EditIcon"
      />
    </form>
  );
};

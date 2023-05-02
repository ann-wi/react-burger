import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Outlet, useNavigate } from "react-router-dom";
import profileNavStyles from "./profile-navigation-styles.module.css";

export const ProfileNavigation = () => {
  const navigate = useNavigate();
  const navToProfile = () => {
    navigate("/profile-form");
  };

  const navToOrders = () => {
    navigate("/orders");
  };
  return (
    <div className={`${profileNavStyles.profile} mt-30`}>
      <div className={`${profileNavStyles.profilePagesLinks} mr-15`}>
        <Button
          onClick={navToProfile}
          htmlType="button"
          type="secondary"
          size="large"
          extraClass="pl-1 pr-1"
        >
          <p className="text text_type_main-medium">Профиль</p>
        </Button>
        <Button
          onClick={navToOrders}
          htmlType="button"
          type="secondary"
          size="large"
          extraClass="pl-1 pr-1"
        >
          <p className="text text_type_main-medium">История заказов</p>
        </Button>
        <Button
          htmlType="button"
          type="secondary"
          size="large"
          extraClass="pl-1 pr-1 mb-20"
        >
          <p className="text text_type_main-medium">Выход</p>
        </Button>
        <p
          className={`${profileNavStyles.pageDescription} pl-1 ext text_type_main-default`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <Outlet />
    </div>
  );
};

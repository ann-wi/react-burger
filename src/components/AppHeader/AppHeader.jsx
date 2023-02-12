import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header-styles.module.css";

import { useNavigate } from "react-router-dom";

export function AppHeader() {
  const navigate = useNavigate();
  function onClickProfile() {
    navigate("/profile");
  }

  function onClickHome() {
    navigate("/");
  }

  function onClickLogin() {
    navigate("/login");
  }

  return (
    <header className={headerStyles.header}>
      <nav className="pt-4 pb-4">
        <ul className={headerStyles.navigation}>
          <li className={headerStyles.navConstructor}>
            <button className={`${headerStyles.button} `} onClick={onClickHome}>
              <BurgerIcon type="primary" />
              <h3
                className={`${headerStyles.buttonTextConstr} ml-2 text text_type_main-default`}
              >
                Конструктор
              </h3>
            </button>
          </li>
          <li className={headerStyles.navOrders}>
            <button className={`${headerStyles.button} p-5`}>
              <ListIcon type="secondary" />
              <h3
                className={`${headerStyles.buttonText} ml-2 text text_type_main-default`}
              >
                Лента заказов
              </h3>
            </button>
          </li>
          <li className={headerStyles.logo}>
            <Logo />
          </li>
          <li className={headerStyles.navProfile}>
            <button
              className={`${headerStyles.button} p-5`}
              onClick={onClickLogin}
            >
              <ProfileIcon type="secondary" />
              <h2
                className={`${headerStyles.buttonText} ml-2 text text_type_main-default`}
              >
                Личный кабинет
              </h2>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

//export default AppHeader;

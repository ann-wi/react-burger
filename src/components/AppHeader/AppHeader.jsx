import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header-styles.module.css";

import { NavLink, Outlet, useNavigate } from "react-router-dom";

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

  function onClickRegister() {
    navigate("/register");
  }

  return (
    <>
      <header className={headerStyles.header}>
        <nav className="pt-4 pb-4">
          <ul className={headerStyles.navigation}>
            <li className={headerStyles.navConstructor}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${headerStyles.activeLink}`
                    : `${headerStyles.button}`
                }
                to="/"
              >
                <BurgerIcon type="primary" />
                <h3
                  className={`${headerStyles.buttonTextConstr} ml-2 text text_type_main-default`}
                >
                  Конструктор
                </h3>
              </NavLink>
            </li>
            <li className={headerStyles.navOrders}>
              <NavLink className={`${headerStyles.button} p-5`} to="/feed">
                <ListIcon type="secondary" />
                <h3
                  className={`${headerStyles.buttonText} ml-2 text text_type_main-default`}
                >
                  Лента заказов
                </h3>
              </NavLink>
            </li>
            <li className={headerStyles.logo}>
              <Logo />
            </li>
            <li className={headerStyles.navProfile}>
              <NavLink className={`${headerStyles.button} p-5`} to="/profile">
                <ProfileIcon type="secondary" />
                <h2
                  className={`${headerStyles.buttonText} ml-2 text text_type_main-default`}
                >
                  Личный кабинет
                </h2>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

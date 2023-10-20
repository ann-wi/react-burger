import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header-styles.module.css";

import { NavLink, Outlet } from "react-router-dom";

export function AppHeader() {
  return (
    <>
      <header className={headerStyles.header}>
        <nav className="pt-4 pb-4">
          <ul className={headerStyles.navigation}>
            <li className={headerStyles.navConstructor}>
              <NavLink to="/" className={`${headerStyles.button} p-5`}>
                {({ isActive }) => (
                  <>
                    <BurgerIcon type={isActive ? "primary" : "secondary"} />
                    <h3
                      className={
                        isActive
                          ? `${headerStyles.activeLink} ml-2 text text_type_main-default`
                          : `${headerStyles.buttonTextConstr} ml-2 text text_type_main-default`
                      }
                    >
                      Конструктор
                    </h3>
                  </>
                )}
              </NavLink>
            </li>
            <li className={headerStyles.navOrders}>
              <NavLink className={`${headerStyles.button} p-5`} to="/feed">
                {({ isActive }) => (
                  <>
                    <ListIcon type={isActive ? "primary" : "secondary"} />
                    <h3
                      className={
                        isActive
                          ? `${headerStyles.activeLink} ml-2 text text_type_main-default`
                          : `${headerStyles.buttonText} ml-2 text text_type_main-default`
                      }
                    >
                      Лента заказов
                    </h3>
                  </>
                )}
              </NavLink>
            </li>
            <li className={headerStyles.logo}>
              <Logo />
            </li>
            <li className={headerStyles.navProfile}>
              <NavLink className={`${headerStyles.button} p-5`} to="/profile">
                {({ isActive }) => (
                  <>
                    <ProfileIcon type={isActive ? "primary" : "secondary"} />
                    <h3
                      className={
                        isActive
                          ? `${headerStyles.activeLink} ml-2 text text_type_main-default`
                          : `${headerStyles.buttonText} ml-2 text text_type_main-default`
                      }
                    >
                      Личный кабинет
                    </h3>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

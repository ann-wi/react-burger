import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header-styles.module.css";

function AppHeader() {
  return (
    <header className={headerStyles.header}>
      <nav className="pt-4 pb-4">
        <ul className={headerStyles.navigation}>
          <li>
            <BurgerIcon type="primary" />
            Конструктор
          </li>
          <li>
            <ListIcon type="secondary" />
            Лента заказов
          </li>
          <li>
            <Logo />
          </li>
          <li>
            <ProfileIcon type="secondary" />
            Личный кабинет
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;

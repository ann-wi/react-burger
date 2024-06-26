import React, { FC } from "react";
import { useDispatch } from "../../utils/storeTypes";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import { userLogout } from "../../services/actions/server-actions-user";
import profileNavigationStyles from "./profile-navigation-styles.module.css";

export const ProfileNavigation: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const clickLogout = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(userLogout());

    <Navigate to="/login" replace state={{ from: location.pathname }} />;
  };

  return (
    <ul className={profileNavigationStyles.navList}>
      <li>
        <NavLink to="/profile" className={profileNavigationStyles.navLink}>
          <p className={`${profileNavigationStyles.text}`}>Профиль</p>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/profile/orders"
          className={profileNavigationStyles.navLink}
        >
          <p className={`${profileNavigationStyles.text}`}>История заказов</p>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          className={profileNavigationStyles.navLink}
          onClick={clickLogout}
        >
          <p className={`${profileNavigationStyles.text}`}>Выход</p>
        </NavLink>
      </li>
      <p className={`${profileNavigationStyles.about}`}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </ul>
  );
};

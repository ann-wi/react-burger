import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../services/actions/user/server-actions-user";
import profileNavigationStyles from "./profile-navigation-styles.module.css";

export const ProfileNavigation = (props) => {
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logoutUser());
  };

  return (
    <ul className={profileNavigationStyles.navList}>
      <li>
        <NavLink to={"/profile"} className={profileNavigationStyles.navLink}>
          <p
            className={`${profileNavigationStyles.text} ${
              props.active && profileNavigationStyles.active
            }`}
          >
            Профиль
          </p>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/profile/orders"}
          className={profileNavigationStyles.navLink}
        >
          <p
            className={`${profileNavigationStyles.text} ${
              props.isActive && profileNavigationStyles.active
            }`}
          >
            История заказов
          </p>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/login"}
          className={profileNavigationStyles.navLink}
          onClick={logoutUser}
        >
          <p className={profileNavigationStyles.text}>Выход</p>
        </NavLink>
      </li>
      <p
        className={`${profileNavigationStyles.about} ${
          props.isActive && profileNavigationStyles.disabled
        }`}
      >
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </ul>
  );
};

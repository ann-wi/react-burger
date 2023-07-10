import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import { userLogout } from "../../services/actions/user/server-actions-user";
import profileNavigationStyles from "./profile-navigation-styles.module.css";

export const ProfileNavigation = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const clickLogout = (e) => {
    e.preventDefault();
    dispatch(userLogout());

    <Navigate to="/login" replace state={{ from: location.pathname }} />;
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
          to={"/"}
          className={profileNavigationStyles.navLink}
          onClick={clickLogout}
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

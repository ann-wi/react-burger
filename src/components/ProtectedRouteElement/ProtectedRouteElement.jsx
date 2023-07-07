import { Navigate, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export const ProtectedRouteElement = ({ element, onlyUnAuth = false }) => {
  const location = useLocation();
  const isAuthChecked = useSelector((state) => state.userReducer.isAuthChecked);
  const user = useSelector((state) => state.userReducer.user);

  if (user) {
    console.log(user);
  }

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    console.log(isAuthChecked);
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    console.log("login");
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ element }) => (
  <ProtectedRouteElement onlyUnAuth={true} element={element} />
);

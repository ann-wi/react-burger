import { Navigate, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export const ProtectedRouteElement = ({ element }) => {
  const location = useLocation();
  const isAuthorized = useSelector(
    (state) => state.userReducer.userIsAuthorized
  );

  return isAuthorized ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
};

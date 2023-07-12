import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export const ProtectedRouteElement = ({ onlyAuth = false, element }) => {
  const location = useLocation();
  const isAuthorized = useSelector(
    (state) => state.userReducer.userIsAuthorized
  );

  if (!onlyAuth && isAuthorized) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (onlyAuth && !isAuthorized) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};

ProtectedRouteElement.propTypes = {
  onlyAuth: PropTypes.bool,
};

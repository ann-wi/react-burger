import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { FC, HTMLProps, ReactElement, ReactNode } from "react";
import { useSelector } from "../../utils/storeTypes";

export interface IProtectedRouteElement {
  onlyAuth?: boolean;
  element: ReactElement;
}

export const ProtectedRouteElement: FC<IProtectedRouteElement> = ({
  onlyAuth = false,
  element,
}) => {
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

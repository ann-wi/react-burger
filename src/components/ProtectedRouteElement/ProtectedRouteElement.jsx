import { Navigate, Route } from "react-router-dom";
import { getCookie } from "../../utils/cookiesFunction";
import { useLocation } from "react-router-dom";

export const ProtectedRouteElement = ({
  mustBeAuthorized,
  children,
  ...rest
}) => {
  const isAuthorized = getCookie("accessToken");
  const location = useLocation();

  if (!mustBeAuthorized && isAuthorized) {
    const { from } = location.state || { from: { pathname: "/" } };
    return (
      <Route {...rest}>
        <Navigate to={from} />
      </Route>
    );
  }

  if (mustBeAuthorized && !isAuthorized) {
    return (
      <Route {...rest}>
        <Navigate to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
};

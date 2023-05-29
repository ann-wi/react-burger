import { Navigate, Route, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookiesFunction";
import { useSelector } from "react-redux";
import { getUserProfile } from "../../services/actions/user/server-actions-user";
import { useEffect, useState } from "react";

// add prop types
export const ProtectedRouteElement = ({ element, mustBeAuthorized }) => {
  const isAuthorized = useSelector(
    (state) => state.userReducer.userIsAuthorized
  );
  const location = useLocation();

  const [isUserLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    console.log(isAuthorized);
  }, []);

  return isAuthorized ? element : <Navigate to="/login" replace />;
};

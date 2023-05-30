import { Navigate, Route } from "react-router-dom";
import { getCookie } from "../../utils/cookiesFunction";
import { useSelector } from "react-redux";
import { getUserProfile } from "../../services/actions/user/server-actions-user";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
// add prop types
export const ProtectedRouteElement = ({ element, mustBeAuthorized }) => {
  const isAuthorized = useSelector(
    (state) => state.userReducer.userIsAuthorized
  );

  return (
    <>
      {!mustBeAuthorized && isAuthorized ? (
        <Navigate to={element} />
      ) : mustBeAuthorized && !isAuthorized ? (
        <Navigate to="/login" replace />
      ) : null}
    </>
  );
};

ProtectedRouteElement.propTypes = {
  element: PropTypes.object,
  mustBeAuthorized: PropTypes.bool,
};

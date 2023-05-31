import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export const ProtectedRouteElement = ({ element, mustBeAuthorized }) => {
  const isAuthorized = useSelector(
    (state) => state.userReducer.userIsAuthorized
  );

  return (
    <>
      {!mustBeAuthorized && isAuthorized ? (
        element
      ) : mustBeAuthorized && !isAuthorized ? (
        <Navigate to="/login" replace />
      ) : (
        element
      )}
    </>
  );
};

ProtectedRouteElement.propTypes = {
  element: PropTypes.object,
  mustBeAuthorized: PropTypes.bool,
};

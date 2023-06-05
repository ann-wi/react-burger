import {
  Routes,
  Route,
  useLocation,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppHeader } from "../AppHeader/AppHeader";
import { HomePage } from "../../pages/homepage";
import { LoginPage } from "../../pages/login";
import { RegistrationPage } from "../../pages/register";
import { ForgotPasswordPage } from "../../pages/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password";
import { NotFoundPage } from "../../pages/not-found-404";
import { ProfilePage } from "../../pages/profile";
import { ProfileOrdersPage } from "../../pages/profile-orders";
import { IngredientPage } from "../../pages/ingredient-page";

import { getIngredientDetails } from "../../services/actions/constructor/ingredientDetails";
import { getIngredients } from "../../services/actions/constructor/server-actions-constructor";
import { getUserProfile } from "../../services/actions/user/server-actions-user";
import { refreshUserToken } from "../../services/actions/user/server-actions-user";
import { getCookie } from "../../utils/cookiesFunction";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import ModalPageSwitch from "../../services/hocs/ModalPageFunc";
import { ProtectedRouteElement } from "../ProtectedRouteElement/ProtectedRouteElement";

import { openModal } from "../../services/actions/user/openModal";
import { closeModal } from "../../services/actions/user/closeModal";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const currentIngredient = useSelector(
    (state) => state.constructorReducer.currentIngredient
  );

  const ingredients = useSelector(
    (state) => state.constructorReducer.ingredients
  );
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] =
    useState(false);

  const visible = useSelector(
    (state) => state.constructorReducer.modalIngrVisible
  );

  const cookie = getCookie("accessToken");
  const userRefreshToken = getCookie("refreshToken");

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (!cookie && userRefreshToken) {
      dispatch(refreshUserToken());
    } else if (cookie && userRefreshToken) {
      dispatch(getUserProfile());
    }
  }, [cookie, userRefreshToken]);

  function closePopups() {
    setIsIngredientDetailsOpened(false);
    navigate(-1);
  }

  const handleIngredientClick = (ingredient) => {
    //dispatch(openModal("ingredientDetails"));
    dispatch(getIngredientDetails(ingredient));
  };

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<AppHeader active={true} isActive={false} />}>
          <Route
            index
            element={<HomePage openIngrPopup={handleIngredientClick} />}
          />
          <Route path="ingredients/:id" element={<IngredientPage />} />
          <Route
            path="register"
            element={
              <ProtectedRouteElement
                element={<RegistrationPage />}
                mustBeAuthorized={false}
              />
            }
          />
          <Route
            path="login"
            element={
              <ProtectedRouteElement
                element={<LoginPage />}
                mustBeAuthorized={false}
              />
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRouteElement
                element={<ProfilePage />}
                mustBeAuthorized={true}
              />
            }
          />
          <Route path="profile/orders" element={<ProfileOrdersPage />} />
          <Route
            path="forgot-password"
            element={
              <ProtectedRouteElement
                element={<ForgotPasswordPage />}
                mustBeAuthorized={false}
              />
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRouteElement
                element={<ResetPasswordPage />}
                mustBeAuthorized={false}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="ingredients/:id"
            element={
              visible && (
                <Modal onCloseClick={closePopups}>
                  <IngredientDetails />
                </Modal>
              )
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;

import { Routes, Route, useLocation, useParams } from "react-router-dom";
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

import { getIngredientDetails } from "../../services/actions/constructor/ingredientDetails";
import { getIngredients } from "../../services/actions/constructor/server-actions-constructor";
import { getUserProfile } from "../../services/actions/user/server-actions-user";
import { refreshUserToken } from "../../services/actions/user/server-actions-user";
import { getCookie } from "../../utils/cookiesFunction";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { ProtectedRouteElement } from "../ProtectedRouteElement/ProtectedRouteElement";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const background = location.state && location.state.background;

  const cookie = getCookie("accessToken");
  const userRefreshToken = getCookie("refreshToken");

  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] =
    useState(false);
  const currentIngredient = useSelector(
    (state) => state.constructorReducer.currentIngredient
  );

  const ingredients = useSelector(
    (state) => state.constructorReducer.ingredients
  );

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
  }

  const handleIngredientClick = (ingredient) => {
    setIsIngredientDetailsOpened(true);
    console.log(ingredient);

    const findIngr = ingredients.find((i) => i._id === id);
    dispatch(getIngredientDetails(ingredient));
    console.log(currentIngredient);
  };

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<AppHeader />}>
          <Route
            index
            element={<HomePage clickFunc={handleIngredientClick} />}
          />
          <Route
            path="ingredients/:id"
            element={
              <Modal onCloseClick={closePopups}>
                <IngredientDetails ingredient={currentIngredient} />
              </Modal>
            }
          />
          <Route path="register" element={<RegistrationPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="profile/orders" element={<ProfileOrdersPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password"
            element={<ProtectedRouteElement element={<ResetPasswordPage />} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="ingredients/:id"
            element={
              isIngredientDetailsOpened && (
                <Modal onCloseClick={closePopups}>
                  <IngredientDetails ingredient={currentIngredient} />
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

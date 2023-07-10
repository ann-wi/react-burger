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
import Order from "../Order/Order";

import { getIngredientDetails } from "../../services/actions/constructor/ingredientDetails";
import { getIngredients } from "../../services/actions/constructor/server-actions-constructor";
import {
  checkUserAuth,
  getUser,
} from "../../services/actions/user/server-actions-user";
import { refreshUserToken } from "../../services/actions/user/server-actions-user";
import { getCookie } from "../../utils/cookies-storage";
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

  const visible = useSelector((state) => state.constructorReducer.modalVisible);

  const cookie = getCookie("accessToken");
  const userRefreshToken = getCookie("refreshToken");

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  function closePopups() {
    setIsIngredientDetailsOpened(false);
    navigate(-1);
  }

  const orderDetails = useSelector(
    (state) => state.constructorReducer.orderNumber
  );

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<AppHeader active={true} isActive={false} />}>
          <Route index element={<HomePage />} />
          <Route path="ingredients/:id" element={<IngredientPage />} />
          <Route path="register" element={<RegistrationPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="profile"
            element={<ProtectedRouteElement element={<ProfilePage />} />}
          />
          <Route
            path="profile/orders"
            element={<ProtectedRouteElement element={<ProfileOrdersPage />} />}
          />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
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
          <Route
            path="order"
            element={
              <ProtectedRouteElement
                element={
                  visible && (
                    <Modal onCloseClick={closePopups}>
                      <Order orderNumber={orderDetails} />
                    </Modal>
                  )
                }
              />
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;

//<ProtectedRouteElement element={} />

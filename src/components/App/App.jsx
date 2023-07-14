import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
import { FeedPage } from "../../pages/feed";
import { Order } from "../Order/Order";

import { getIngredients } from "../../services/actions/constructor/server-actions-constructor";
import {
  getUser,
  reloginUser,
} from "../../services/actions/user/server-actions-user";
import { IngredientDetails } from "../IngredientDetails/IngredientDetails";
import { Modal } from "../Modal/Modal";
import { ProtectedRouteElement } from "../ProtectedRouteElement/ProtectedRouteElement";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const user = useSelector((state) => state.userReducer.user);

  const visible = useSelector((state) => state.constructorReducer.modalVisible);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(reloginUser());
  }, [dispatch]);

  function closePopups() {
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
          <Route
            path="register"
            element={
              <ProtectedRouteElement
                onlyAuth={false}
                element={<RegistrationPage />}
              />
            }
          />
          <Route
            path="login"
            element={
              <ProtectedRouteElement onlyAuth={false} element={<LoginPage />} />
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRouteElement
                onlyAuth={true}
                element={<ProfilePage />}
              />
            }
          />
          <Route
            path="profile/orders"
            element={
              <ProtectedRouteElement
                onlyAuth={true}
                element={<ProfileOrdersPage />}
              />
            }
          />
          <Route
            path="forgot-password"
            element={
              <ProtectedRouteElement
                onlyAuth={false}
                element={<ForgotPasswordPage />}
              />
            }
          />
          <Route
            path="reset-password"
            element={
              <ProtectedRouteElement
                onlyAuth={false}
                element={<ResetPasswordPage />}
              />
            }
          />
          <Route path="feed" element={<FeedPage />} />
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
                onlyAuth={true}
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

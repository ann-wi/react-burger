import { Routes, Route } from "react-router-dom";
import { AppHeader } from "../AppHeader/AppHeader";
import { HomePage } from "../../pages/homepage";
import { LoginPage } from "../../pages/login";
import { RegistrationPage } from "../../pages/register";
import { ForgotPasswordPage } from "../../pages/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password";
import { NotFoundPage } from "../../pages/not-found-404";
import { ProfileForm } from "../ProfileForm/ProfileForm";
import { ProfileNavigation } from "../ProfileNavigation/ProfileNavigation";
import { ProfileOrders } from "../ProfileOrders/ProfileOrders";

import { ProtectedRouteElement } from "../ProtectedRouteElement/ProtectedRouteElement";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppHeader />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegistrationPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfileNavigation />}>
            <Route index element={<ProfileForm />} />
            <Route path="profile-orders" element={<ProfileOrders />} />
          </Route>
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/"
            element={<ProtectedRouteElement element={<ResetPasswordPage />} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

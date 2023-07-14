import { ProfileNavigation } from "../components/ProfileNavigation/ProfileNavigation";
import profileOrdersStyles from "./profile-orders-styles.module.css";

export const ProfileOrdersPage = () => {
  return (
    <div className={profileOrdersStyles.container}>
      <ProfileNavigation isActive={true} active={false} />
    </div>
  );
};

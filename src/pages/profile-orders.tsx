import { useEffect } from "react";
import { ProfileNavigation } from "../components/ProfileNavigation/ProfileNavigation";
import { WS_CONNECTION_START, WS_CONNECTION_STOP } from "../utils/constants";
import profileOrdersStyles from "./profile-orders-styles.module.css";
import { LinkOrderInfo } from "../components/LinkOrderInfo/LinkOrderInfo";
import { reloginUser } from "../services/actions/server-actions-user";
import { useDispatch, useSelector } from "../utils/storeTypes";

export const ProfileOrdersPage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.wsReducer.data.orders);
  const ingredients = useSelector(
    (state) => state.constructorReducer.ingredients
  );

  useEffect(() => {
    dispatch(reloginUser());
    dispatch({
      type: WS_CONNECTION_START,
      payload: {
        url: "wss://norma.nomoreparties.space/orders",
        isAuth: true,
      },
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_STOP,
      });
    };
  }, [dispatch]);

  return (
    <div className={profileOrdersStyles.container}>
      <ProfileNavigation />
      <div className={profileOrdersStyles.listContainer}>
        {ingredients && data && (
          <LinkOrderInfo orders={data} isReversed={true} />
        )}
      </div>
    </div>
  );
};

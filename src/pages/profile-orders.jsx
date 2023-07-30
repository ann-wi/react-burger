import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ProfileOrderItem } from "../components/ProfileOrderItem/ProfileOrderItem";
import { ProfileNavigation } from "../components/ProfileNavigation/ProfileNavigation";
import { WS_CONNECTION_START, WS_CONNECTION_STOP } from "../utils/constants";
import profileOrdersStyles from "./profile-orders-styles.module.css";

export const ProfileOrdersPage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.wsReducer.data.orders);
  const ingredients = useSelector(
    (state) => state.constructorReducer.ingredients
  );
  const navigate = useNavigate();

  useEffect(() => {
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
      <ProfileNavigation isActive={true} active={false} />
      <div className={profileOrdersStyles.listContainer}>
        {ingredients && data && (
          <main className={profileOrdersStyles.box}>
            <div className={profileOrdersStyles.orderLayout}>
              <section>
                <ul className={profileOrdersStyles.orderBox}>
                  {data
                    .map((order) => (
                      <ProfileOrderItem key={order._id} order={order} />
                    ))
                    .reverse()}
                </ul>
              </section>
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

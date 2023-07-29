import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WS_CONNECTION_START, WS_CONNECTION_STOP } from "../../utils/constants";
import profileOrdersStyles from "./profile-orders-styles.module.css";

export const ProfileOrders = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.wsReducer.data);

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

  useEffect(() => {
    console.log(data);
  });

  return (
    <>
      {data.orders && (
        <div className={profileOrdersStyles.container}>
          <ProfileNavigation isActive={true} active={false} />
          <div className={profileOrdersStyles.listContainer}>
            {data.orders
              ?.map((item, index) => {
                return (
                  <Link
                    className={profileOrdersStyles.link}
                    to={`/profile/orders/${item._id}`}
                    key={item._id}
                    onClick={handleModalOpen}
                  >
                    <OrderCard order={item} key={index} />
                  </Link>
                );
              })
              .reverse()}
          </div>
        </div>
      )}
    </>
  );
};

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  getAuthOrders,
  getOrders,
} from "../../services/actions/constructor/sendGetOrder";
import { OrderInfoPage } from "../../pages/orders-info-page";

export const RenderOrderInfo = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();

  const data = useSelector((state) => state.wsReducer.data.orders);
  const ingredientsData = useSelector(
    (state) => state.constructorReducer.ingredients
  );

  useEffect(() => {
    location.pathname.indexOf("/profile/orders") !== -1
      ? dispatch(getAuthOrders())
      : dispatch(getOrders());
  }, [dispatch]);

  let order = data.orders?.find((order) => order._id === id);

  return (
    <>
      <OrderInfoPage order={order} ingredients={ingredientsData} />
    </>
  );
};

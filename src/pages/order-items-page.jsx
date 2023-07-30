import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { RenderOrderInfo } from "../components/RenderOrderInfo/RenderOrderInfo";
import {
  getAuthOrders,
  getOrders,
} from "../services/actions/constructor/sendGetOrder";
import { OrderInfoPage } from "./orders-info-page";

export const OrderItemsPage = () => {
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

  const findOrder = (id) => {
    const elem = data.find((i) => i._id === id);
    return elem;
  };

  const theOrder = findOrder(id);

  if (!theOrder) return null;

  return (
    <div>
      <OrderInfoPage order={theOrder} ingredients={ingredientsData} />
    </div>
  );
};

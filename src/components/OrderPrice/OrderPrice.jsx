import React, { useContext } from "react";
import OrderPriceContext from "../../context/order-price-context";

const OrderPrice = () => {
  const { orderPrice } = useContext(OrderPriceContext);

  return <p className={`text text_type_digits-medium`}>{orderPrice}</p>;
};

export default OrderPrice;

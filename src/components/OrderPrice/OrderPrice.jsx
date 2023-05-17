import { useSelector } from "react-redux";

const OrderPrice = () => {
  const orderPrice = useSelector((state) => state.constructorReducer.orderSum);

  return <p className={`text text_type_digits-medium`}>{orderPrice}</p>;
};

export default OrderPrice;

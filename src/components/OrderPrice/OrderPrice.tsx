import { FC } from "react";
import { useSelector } from "../../utils/storeTypes";

export const OrderPrice: FC = () => {
  const orderPrice = useSelector((state) => state.constructorReducer.orderSum);

  return <p className={`text text_type_digits-medium`}>{orderPrice}</p>;
};

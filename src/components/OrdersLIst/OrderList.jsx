import orderListStyles from "./order-list-styles.module.css";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const OrderList = ({ reverse }) => {
  const data = useSelector((state) => state.wsReducer.data.orders);
  const ingredients = useSelector(
    (state) => state.constructorReducer.ingredients
  );

  return (
    <>
      {ingredients && data && (
        <main className={orderListStyles.box}>
          <div className={orderListStyles.orderLayout}>
            <section>
              <ul className={orderListStyles.orderBox}></ul>
            </section>
          </div>
        </main>
      )}
    </>
  );
};

import { useSelector } from "../../utils/storeTypes";
import orderListStyles from "./order-list-styles.module.css";

export const OrderList = () => {
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

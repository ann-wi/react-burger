import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderPriceContext from "../../context/order-price-context";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstuctor/BurgerConstructor";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientsDetails";
import Order from "../Order/Order";
import appStyles from "./app-styles.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { getIngredientDetails } from "../../services/actions/ingredietDetails";
import { getIngredients } from "../../services/actions/server-actions";

const App = () => {
  const dispatch = useDispatch();
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] =
    useState(false);
  const [isOrderOpened, setIsOrderOpened] = useState(false);

  const currentIngredient = useSelector(
    (state) => state.reactBurgerReducer.currentIngredient
  );

  const [orderPrice, setOrderPrice] = useState(0);
  const orderDetails = useSelector(
    (state) => state.reactBurgerReducer.orderNumber
  );

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  function closePopups() {
    setIsIngredientDetailsOpened(false);
    setIsOrderOpened(false);
  }

  const handleIngredientClick = (ingredient) => {
    dispatch(getIngredientDetails(ingredient));
    setIsIngredientDetailsOpened(true);
  };

  const handleOrderClick = () => {
    setIsOrderOpened(true);
  };

  return (
    <>
      <AppHeader />
      <main className={appStyles.app}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients onClickPopup={handleIngredientClick} />
          <OrderPriceContext.Provider value={{ orderPrice, setOrderPrice }}>
            <BurgerConstructor onClickPopup={handleOrderClick} />
          </OrderPriceContext.Provider>
        </DndProvider>
      </main>
      {isIngredientDetailsOpened && (
        <Modal onCloseClick={closePopups}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
      {isOrderOpened && (
        <Modal onCloseClick={closePopups}>
          <Order orderNumber={orderDetails} />
        </Modal>
      )}
    </>
  );
};

export default App;

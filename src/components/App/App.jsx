import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import BurgerContext from "../../context/burger-context";
import OrderPriceContext from "../../context/order-price-context";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstuctor/BurgerConstructor";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientsDetails";
import Order from "../Order/Order";
import appStyles from "./app-styles.module.css";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { getIngredientDetails } from "../../services/actions/ingredietDetails";
import { getIngredientsList } from "../../services/actions/burgerIngredients";
import { addIngredient } from "../../services/actions/addIngredient";
//import { getOrderNumber } from "../../services/actions/orderDetails";
import { getIngredients } from "../../services/actions/server-actions";

const App = () => {
  const dispatch = useDispatch();
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] =
    useState(false);
  const [isOrderOpened, setIsOrderOpened] = useState(false);
  //const [ingredients, setIngredients] = useState([]); // in store
  const ingredients = useSelector(
    (state) => state.reactBurgerReducer.ingredients
  );

  //const [currentIngredient, setCurrentIngredient] = useState({}); // in store
  const currentIngredient = useSelector(
    (state) => state.reactBurgerReducer.currentIngredient
  );
  const [orderPrice, setOrderPrice] = useState(0);
  //const [orderDetails, setOrderDetalis] = useState(0); // in store
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

  const handleEscKeydown = (event) => {
    event.key === "Escape" && closePopups();
  };

  const handleIngredientClick = (ingredient) => {
    //setCurrentIngredient(ingredient);
    dispatch(getIngredientDetails(ingredient));
    setIsIngredientDetailsOpened(true);
  };

  const handleOrderClick = () => {
    setIsOrderOpened(true);
  };

  //const handleIngredientAddition = (ingredient) => {
  //  dispatch(addIngredient(ingredient));
  //};

  return (
    <BurgerContext.Provider value={ingredients}>
      <AppHeader />
      <main className={appStyles.app}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients
            ingredients={ingredients}
            onClickPopup={handleIngredientClick}
          />
          <OrderPriceContext.Provider value={{ orderPrice, setOrderPrice }}>
            <BurgerConstructor
              ingredients={ingredients}
              onClickPopup={handleOrderClick}
              //setOrderDetalis={setOrderDetalis}
            />
          </OrderPriceContext.Provider>
        </DndProvider>
      </main>
      {isIngredientDetailsOpened && (
        <Modal onCloseClick={closePopups} onEscKeydown={handleEscKeydown}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
      {isOrderOpened && (
        <Modal onCloseClick={closePopups} onEscKeydown={handleEscKeydown}>
          <Order orderNumber={orderDetails} />
        </Modal>
      )}
    </BurgerContext.Provider>
  );
};

export default App;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import homepageStyles from "./homepage-styles.module.css";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstuctor/BurgerConstructor";
import IngredientDetails from "../components/IngredientDetails/IngredientsDetails";
import Order from "../components/Order/Order";
import Modal from "../components/Modal/Modal";

import { getIngredientDetails } from "../services/actions/ingredientDetails";
import { getIngredients } from "../services/actions/server-actions";

export const HomePage = () => {
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
      <main className={homepageStyles.app}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients onClickPopup={handleIngredientClick} />
          <BurgerConstructor onClickPopup={handleOrderClick} />
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

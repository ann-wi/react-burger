import React, { useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import BurgerContext from "../../context/burger-context";
import OrderPriceContext from "../../context/order-price-context";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstuctor/BurgerConstructor";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientsDetails";
import Order from "../Order/Order";
import appStyles from "./app-styles.module.css";

export const apiBurger = "https://norma.nomoreparties.space/api/";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

const App = () => {
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] =
    useState(false);
  const [isOrderOpened, setIsOrderOpened] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState({});
  const [orderPrice, setOrderPrice] = useState(0);
  const [orderDetails, setOrderDetalis] = useState(0);

  function closePopups() {
    setIsIngredientDetailsOpened(false);
    setIsOrderOpened(false);
  }

  const handleEscKeydown = (event) => {
    event.key === "Escape" && closePopups();
  };

  useEffect(() => {
    fetch(`${apiBurger}ingredients`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(checkResponse)
      .then((res) => {
        setIngredients(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleIngredientClick = (ingredient) => {
    setCurrentIngredient(ingredient);
    setIsIngredientDetailsOpened(true);
  };

  const handleOrderClick = () => {
    setIsOrderOpened(true);
  };

  return (
    <BurgerContext.Provider value={ingredients}>
      <AppHeader />
      <main className={appStyles.app}>
        <BurgerIngredients
          ingredients={ingredients}
          onClickPopup={handleIngredientClick}
        />
        <OrderPriceContext.Provider value={{ orderPrice, setOrderPrice }}>
          <BurgerConstructor
            ingredients={ingredients}
            onClickPopup={handleOrderClick}
            setOrderDetalis={setOrderDetalis}
          />
        </OrderPriceContext.Provider>
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

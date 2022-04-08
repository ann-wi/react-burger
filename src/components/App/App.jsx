import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstuctor/BurgerConstructor";
import Popup from "../Popup/Popup";
import IngredientDetails from "../IngredientDetails/IngredientsDetails";
import Order from "../Order/Order";
import appStyles from "./app-styles.module.css";

function App() {
  const apiBurger = "https://norma.nomoreparties.space/api/ingredients";
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = React.useState(false);
  const [isOrderOpened, setIsOrderOpened] = React.useState(false);
  const [ingredients, setIngredients] = React.useState([]);
  const [currentIngredient, setCurrentIngredient] = React.useState({});

  const closePopups = () => {
    setIsIngredientDetailsOpened(false);
    setIsOrderOpened(false);
  };

  const handleEscKeydown = (event) => {
    event.key === "Escape" && closePopups();
  };

  React.useEffect(() => {
    fetch(`${apiBurger}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((res) => setIngredients(res.data))
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
    <>
      <AppHeader />
      <main className={appStyles.app}>
        <BurgerIngredients ingredients={ingredients} onClickPopup={handleIngredientClick} />
        <BurgerConstructor ingredients={ingredients} onClickPopup={handleOrderClick} />
      </main>
      {isIngredientDetailsOpened && (
        <Popup onCloseClick={closePopups} onEscKeydown={handleEscKeydown}>
          <IngredientDetails ingredient={currentIngredient} />
        </Popup>
      )}
      {isOrderOpened && (
        <Popup onCloseClick={closePopups} onEscKeydown={handleEscKeydown}>
          <Order />
        </Popup>
      )}
    </>
  );
}

export default App;

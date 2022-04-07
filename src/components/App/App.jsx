import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstuctor/BurgerConstructor";
import Popup from "../Popup/Popup";
import IngredientDetails from "../IngredientDetails/IngredientsDetails";
import appStyles from "./app-styles.module.css";

function App() {
  const apiBurger = "https://norma.nomoreparties.space/api/ingredients";
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = React.useState(false);
  const [ingredients, setIngredients] = React.useState([]);
  const [currentIngredient, setCurrentIngredient] = React.useState({});

  const closePopups = () => {
    setIsIngredientDetailsOpened(false);
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
      .then((res) => res.json())
      .then((res) => setIngredients(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleIngredientClick = (ingredient) => {
    setCurrentIngredient(ingredient);
    setIsIngredientDetailsOpened(true);
  };

  return (
    <>
      <AppHeader />
      <main className={appStyles.app}>
        <BurgerIngredients ingredients={ingredients} onClickPopup={handleIngredientClick} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
      {isIngredientDetailsOpened && (
        <Popup onCloseClick={closePopups} onEscKeydown={handleEscKeydown}>
          <IngredientDetails ingredient={currentIngredient} />
        </Popup>
      )}
    </>
  );
}

export default App;

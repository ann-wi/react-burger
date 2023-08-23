import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import homepageStyles from "./homepage-styles.module.css";
import { BurgerIngredients } from "../components/BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../components/BurgerConstuctor/BurgerConstructor";

export const HomePage = () => {
  return (
    <main className={homepageStyles.app}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
};

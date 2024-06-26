import { FC, useRef, useState } from "react";
import ingredientsStyles from "./burger-ingredients-styles.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient } from "../Ingredient/Ingredient";
import { Scrollbar } from "smooth-scrollbar-react";
import { useSelector } from "../../utils/storeTypes";

export const BurgerIngredients: FC = () => {
  const ingredients = useSelector(
    (state) => state.constructorReducer.ingredients
  );

  const tabBuns = useRef<HTMLInputElement>(null);
  const tabSauces = useRef<HTMLInputElement>(null);
  const tabMain = useRef<HTMLInputElement>(null);
  const [currentTabBuns, setCurrentTabBuns] = useState(false);
  const [currentTabSauces, setCurrentTabSauces] = useState(false);
  const [currentTabMain, setCurrentTabMain] = useState(false);

  const handleScrollTabs = () => {
    if (!tabBuns.current || !tabSauces.current || !tabMain.current) return;
    if (tabBuns.current.getBoundingClientRect().top >= 284) {
      setCurrentTabBuns(true);
      setCurrentTabSauces(false);
      setCurrentTabMain(false);
    } else if (tabSauces.current.getBoundingClientRect().top >= 284) {
      setCurrentTabSauces(true);
      setCurrentTabBuns(false);
      setCurrentTabMain(false);
    } else if (tabMain.current.getBoundingClientRect().top >= 284) {
      setCurrentTabMain(true);
      setCurrentTabBuns(false);
      setCurrentTabSauces(false);
    }
  };

  return (
    <>
      <section className={`${ingredientsStyles.elements} pt-10 mr-10`}>
        <h1 className={`${ingredientsStyles.title} text text_type_main-medium`}>
          Соберите бургер
        </h1>
        <div className={`${ingredientsStyles.tabs} mt-5 mb-10`}>
          <Tab
            value="one"
            active={currentTabBuns}
            onClick={() => console.log("Buns")}
          >
            Булки
          </Tab>
          <Tab
            value="two"
            active={currentTabSauces}
            onClick={() => console.log("Sauces")}
          >
            Соусы
          </Tab>
          <Tab
            value="three"
            active={currentTabMain}
            onClick={() => console.log("Main")}
          >
            Начинки
          </Tab>
        </div>
        <div className={`${ingredientsStyles.products}`}>
          <Scrollbar damping={0.07} onScroll={handleScrollTabs}>
            <div className={ingredientsStyles.list} ref={tabBuns}>
              <h3
                className={`${ingredientsStyles.sectionTitle} mb-6 text text_type_main-medium`}
              >
                Булки
              </h3>
              <div className={ingredientsStyles.cards}>
                {ingredients
                  .filter((ingredient: any) => ingredient.type === "bun")
                  .map((ingredient: any) => (
                    <Ingredient
                      ingrType={"burgerBun"}
                      key={ingredient._id}
                      ingredient={ingredient}
                    />
                  ))}
              </div>
            </div>
            <div className={ingredientsStyles.list} ref={tabSauces}>
              <h3
                className={`${ingredientsStyles.sectionTitle} mt-10 mb-6 text text_type_main-medium`}
              >
                Соусы
              </h3>
              <div className={ingredientsStyles.cards}>
                {ingredients
                  .filter((ingredient) => ingredient.type === "sauce")
                  .map((ingredient) => (
                    <Ingredient
                      ingrType={"ingredient"}
                      key={ingredient._id}
                      ingredient={ingredient}
                    />
                  ))}
              </div>
            </div>
            <div className={ingredientsStyles.list} ref={tabMain}>
              <h3
                className={`${ingredientsStyles.sectionTitle} mt-10 mb-6 text text_type_main-medium`}
              >
                Начинки
              </h3>
              <div className={ingredientsStyles.cards}>
                {ingredients
                  .filter((ingredient) => ingredient.type === "main")
                  .map((ingredient) => (
                    <Ingredient
                      ingrType={"ingredient"}
                      key={ingredient._id}
                      ingredient={ingredient}
                    />
                  ))}
              </div>
            </div>
          </Scrollbar>
        </div>
      </section>
    </>
  );
};

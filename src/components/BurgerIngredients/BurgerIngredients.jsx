import { useRef, useState } from "react";
import ingredientsStyles from "./burger-ingredients-styles.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../Ingredient/Ingredient";
import { Link, useLocation } from "react-router-dom";
import { Scrollbar } from "smooth-scrollbar-react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const BurgerIngredients = ({ onClickPopup }) => {
  const location = useLocation();

  const ingredients = useSelector(
    (state) => state.constructorReducer.ingredients
  );
  const currentIngredient = useSelector(
    (state) => state.constructorReducer.currentIngredient
  );

  const tabBuns = useRef(null);
  const tabSauces = useRef(null);
  const tabMain = useRef(null);
  const [currentTabBuns, setCurrentTabBuns] = useState(false);
  const [currentTabSauces, setCurrentTabSauces] = useState(false);
  const [currentTabMain, setCurrentTabMain] = useState(false);

  const handleScrollTabs = () => {
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
          <Tab value="one" active={currentTabBuns}>
            Булки
          </Tab>
          <Tab value="two" active={currentTabSauces}>
            Соусы
          </Tab>
          <Tab value="three" active={currentTabMain}>
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
                  .filter((ingredient) => ingredient.type === "bun")
                  .map((ingredient) => (
                    <Link
                      className={ingredientsStyles.link}
                      to={{
                        pathname: `/ingredients/${ingredient._id}`,
                        state: { background: location },
                      }}
                      key={ingredient._id}
                    >
                      <Ingredient
                        ingrType={"burgerBun"}
                        key={ingredient._id}
                        idx={ingredients.indexOf(ingredient)}
                        onClickPopup={onClickPopup}
                        ingredient={ingredient}
                      />
                    </Link>
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
                    <Link
                      className={ingredientsStyles.link}
                      to={{
                        pathname: `/ingredients/${ingredient._id}`,
                        state: { background: location },
                      }}
                      key={ingredient._id}
                    >
                      <Ingredient
                        ingrType={"ingredient"}
                        key={ingredient._id}
                        idx={ingredients.indexOf(ingredient)}
                        onClickPopup={onClickPopup}
                        ingredient={ingredient}
                      />
                    </Link>
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
                    <Link
                      className={ingredientsStyles.link}
                      to={{
                        pathname: `/ingredients/${ingredient._id}`,
                        state: { background: location },
                      }}
                      key={ingredient._id}
                    >
                      <Ingredient
                        ingrType={"ingredient"}
                        key={ingredient._id}
                        idx={ingredients.indexOf(ingredient)}
                        onClickPopup={onClickPopup}
                        ingredient={ingredient}
                      />
                    </Link>
                  ))}
              </div>
            </div>
          </Scrollbar>
        </div>
      </section>
    </>
  );
};

BurgerIngredients.propTypes = {
  onClickPopup: PropTypes.func,
};

export default BurgerIngredients;

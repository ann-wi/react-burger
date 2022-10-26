import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ingredientsStyles from "./burger-ingredients-styles.module.css";
import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Scrollbar } from "smooth-scrollbar-react";
import PropTypes from "prop-types";

// Drag List
const BurgerIngredients = ({ onClickPopup, ingredients }) => {
  const tab1 = useRef(null);
  const tab2 = useRef(null);
  const tab3 = useRef(null);
  const [currentTab1, setCurrentTab1] = useState(false);
  const [currentTab2, setCurrentTab2] = useState(false);
  const [currentTab3, setCurrentTab3] = useState(false);

  return (
    <>
      <section className={`${ingredientsStyles.elements} pt-10 mr-10`}>
        <h1 className={`${ingredientsStyles.title} text text_type_main-medium`}>
          Соберите бургер
        </h1>
        <div className={`${ingredientsStyles.tabs} mt-5 mb-10`}>
          <Tab value="one" active={currentTab1}>
            Булки
          </Tab>
          <Tab value="two" active={currentTab2}>
            Соусы
          </Tab>
          <Tab value="three" active={currentTab3}>
            Начинки
          </Tab>
        </div>
        <div className={`${ingredientsStyles.products}`}>
          <Scrollbar
            damping={0.07}
            onScroll={() => {
              if (tab1.current.getBoundingClientRect().top == 284) {
                setCurrentTab1(true);
                setCurrentTab2(false);
                setCurrentTab3(false);
              } else if (tab2.current.getBoundingClientRect().top == 284) {
                setCurrentTab2(true);
                setCurrentTab1(false);
                setCurrentTab3(false);
              } else if (tab3.current.getBoundingClientRect().top == 284) {
                setCurrentTab3(true);
                setCurrentTab1(false);
                setCurrentTab2(false);
              }
              //console.log(tab1.current.getBoundingClientRect().top);
            }}
          >
            <div className={ingredientsStyles.list} ref={tab1}>
              <h3
                className={`${ingredientsStyles.sectionTitle} mb-6 text text_type_main-medium`}
              >
                Булки
              </h3>
              <div className={ingredientsStyles.cards}>
                {ingredients
                  .filter((ingredient) => ingredient.type === "bun")
                  .map((ingredient) => (
                    <div
                      key={ingredient._id}
                      className={ingredientsStyles.card}
                    >
                      <img
                        onClick={() => onClickPopup(ingredient)}
                        src={ingredient.image}
                        className={`${ingredientsStyles.image} mr-4 ml-4`}
                      />
                      <div
                        className={`${ingredientsStyles.price} pt-1 pb-1 text text_type_digits-default`}
                      >
                        <p className={ingredientsStyles.priceNum}>
                          {ingredient.price}
                        </p>
                        <CurrencyIcon type="primary" />
                      </div>
                      <p
                        className={`${ingredientsStyles.name} mt-1 text text_type_main-default`}
                      >
                        {ingredient.name}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
            <div className={ingredientsStyles.list} ref={tab2}>
              <h3
                className={`${ingredientsStyles.sectionTitle} mt-10 mb-6 text text_type_main-medium`}
              >
                Соусы
              </h3>
              <div className={ingredientsStyles.cards}>
                {ingredients
                  .filter((ingredient) => ingredient.type === "sauce")
                  .map((ingredient) => (
                    <div
                      key={ingredient._id}
                      className={ingredientsStyles.card}
                    >
                      <img
                        onClick={() => onClickPopup(ingredient)}
                        src={ingredient.image}
                        className={`${ingredientsStyles.image} mr-4 ml-4`}
                      />
                      <div
                        className={`${ingredientsStyles.price} pt-1 pb-1 text text_type_digits-default`}
                      >
                        <p className={ingredientsStyles.priceNum}>
                          {ingredient.price}
                        </p>
                        <CurrencyIcon type="primary" />
                      </div>
                      <p
                        className={`${ingredientsStyles.name} mt-1 text text_type_main-default`}
                      >
                        {ingredient.name}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
            <div className={ingredientsStyles.list} ref={tab3}>
              <h3
                className={`${ingredientsStyles.sectionTitle} mt-10 mb-6 text text_type_main-medium`}
              >
                Начинки
              </h3>
              <div className={ingredientsStyles.cards}>
                {ingredients
                  .filter((ingredient) => ingredient.type === "main")
                  .map((ingredient) => (
                    <div
                      key={ingredient._id}
                      className={ingredientsStyles.card}
                    >
                      <img
                        onClick={() => onClickPopup(ingredient)}
                        src={ingredient.image}
                        className={`${ingredientsStyles.image} mr-4 ml-4`}
                      />
                      <div
                        className={`${ingredientsStyles.price} pt-1 pb-1 text text_type_digits-default`}
                      >
                        <p className={ingredientsStyles.priceNum}>
                          {ingredient.price}
                        </p>
                        <CurrencyIcon type="primary" />
                      </div>
                      <p
                        className={`${ingredientsStyles.name} mt-1 text text_type_main-default`}
                      >
                        {ingredient.name}
                      </p>
                    </div>
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

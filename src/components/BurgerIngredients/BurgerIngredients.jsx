import React from "react";
import ingredientsStyles from "./burger-ingredients-styles.module.css";
import { Tab, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Scrollbar } from "smooth-scrollbar-react";
import PropTypes from "prop-types";

const BurgerIngredients = ({ ingredients, onClickPopup }) => {
  const [current, setCurrent] = React.useState("one");
  return (
    <>
      <section className={`${ingredientsStyles.elements} pt-10 mr-10`}>
        <h1 className={`${ingredientsStyles.title} text text_type_main-medium`}>Соберите бургер</h1>
        <div className={`${ingredientsStyles.tabs} mt-5 mb-10`}>
          <Tab value="one" active={current === "one"} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="two" active={current === "two"} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="three" active={current === "three"} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <div className={`${ingredientsStyles.products}`}>
          <Scrollbar damping={0.07}>
            <div className={ingredientsStyles.list}>
              <h3 className={`${ingredientsStyles.sectionTitle} mb-6 text text_type_main-medium`}>Булки</h3>
              <div className={ingredientsStyles.cards}>
                {ingredients
                  .filter((ingredient) => ingredient.type === "bun")
                  .map((ingredient) => (
                    <div key={ingredient._id} className={ingredientsStyles.card}>
                      <img onClick={() => onClickPopup(ingredient)} src={ingredient.image} className={`${ingredientsStyles.image} mr-4 ml-4`} />
                      <div className={`${ingredientsStyles.price} pt-1 pb-1 text text_type_digits-default`}>
                        <p className={ingredientsStyles.priceNum}>{ingredient.price}</p>
                        <CurrencyIcon type="primary" />
                      </div>
                      <p className={`${ingredientsStyles.name} mt-1 text text_type_main-default`}>{ingredient.name}</p>
                    </div>
                  ))}
              </div>
            </div>
            <div className={ingredientsStyles.list}>
              <h3 className={`${ingredientsStyles.sectionTitle} mt-10 mb-6 text text_type_main-medium`}>Соусы</h3>
              <div className={ingredientsStyles.cards}>
                {ingredients
                  .filter((ingredient) => ingredient.type === "sauce")
                  .map((ingredient) => (
                    <div key={ingredient._id} className={ingredientsStyles.card}>
                      <img onClick={() => onClickPopup(ingredient)} src={ingredient.image} className={`${ingredientsStyles.image} mr-4 ml-4`} />
                      <div className={`${ingredientsStyles.price} pt-1 pb-1 text text_type_digits-default`}>
                        <p className={ingredientsStyles.priceNum}>{ingredient.price}</p>
                        <CurrencyIcon type="primary" />
                      </div>
                      <p className={`${ingredientsStyles.name} mt-1 text text_type_main-default`}>{ingredient.name}</p>
                    </div>
                  ))}
              </div>
            </div>
            <div className={ingredientsStyles.list}>
              <h3 className={`${ingredientsStyles.sectionTitle} mt-10 mb-6 text text_type_main-medium`}>Начинки</h3>
              <div className={ingredientsStyles.cards}>
                {ingredients
                  .filter((ingredient) => ingredient.type === "main")
                  .map((ingredient) => (
                    <div key={ingredient._id} className={ingredientsStyles.card}>
                      <img onClick={() => onClickPopup(ingredient)} src={ingredient.image} className={`${ingredientsStyles.image} mr-4 ml-4`} />
                      <div className={`${ingredientsStyles.price} pt-1 pb-1 text text_type_digits-default`}>
                        <p className={ingredientsStyles.priceNum}>{ingredient.price}</p>
                        <CurrencyIcon type="primary" />
                      </div>
                      <p className={`${ingredientsStyles.name} mt-1 text text_type_main-default`}>{ingredient.name}</p>
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
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func,
};

export default BurgerIngredients;

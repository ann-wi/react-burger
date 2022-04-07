import React from "react";
import CardStyles from "./card-styles.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Card = ({ data, onClickPopup }) => {
  const image = <img src={data.image} alt={data.name} />;

  return (
    <div className={CardStyles.card}>
      <div onClick={() => onClickPopup(data)} className={`${CardStyles.image} mr-4 ml-4`}>
        {image}
      </div>
      <div className={`${CardStyles.price} pt-1 pb-1 text text_type_digits-default`}>
        <p className={CardStyles.priceNum}>{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${CardStyles.name} mt-1 text text_type_main-default`}>{data.name}</p>
    </div>
  );
};

export default Card;

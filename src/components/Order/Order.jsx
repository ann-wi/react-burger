import PropTypes from "prop-types";
import OrderStyles from "./order-styles.module.css";
import doneLogo from "../../images/done.png";

const Order = () => {
  return (
    <>
      <div className={OrderStyles.container}>
        <h2 className={`${OrderStyles.number} mt-30 text text_type_digits-large`}>034536</h2>
        <p className={`${OrderStyles.id} mt-8 text text_type_main-medium`}>идентификатор заказа</p>
        <img className={`${OrderStyles.logo} mt-15`} src={doneLogo} alt="иконка оплачено" />
        <p className={`${OrderStyles.textReady} mt-15 text text_type_main-default`}>Ваш заказ начали готовить</p>
        <p className={`${OrderStyles.textWait} mt-2 text text_type_main-default`}>Дождитесь готовности на орбитальной станции</p>
      </div>
    </>
  );
};

export default Order;

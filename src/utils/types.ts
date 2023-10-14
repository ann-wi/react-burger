export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  price: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  image: string;
  image_large: string;
  image_mobile: string;
  uuid: string;
  counter: number;
};

export type IBurgerComponent = {
  ingredients: IIngredient[];
};

export type TOrder = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export interface IOrder {
  order: TOrder;
}

export interface IIngredient {
  ingredient: TIngredient;
}

export type TOrders = {
  orders: TOrder[];
};

export interface IOrderNumber {
  number: string | undefined;
}

// IId
